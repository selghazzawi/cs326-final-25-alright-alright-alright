import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { spawn } from 'child_process';
import { PythonShell } from 'python-shell';
import mongoose from 'mongoose';
import { TheGistDatabase } from './db.js';
import { createSecureServer } from 'http2';
import { response } from 'express';
import path from 'path';




async function main() {
    const app = express();
    const port = 8080;
    const uri = process.env.MONGODB_URI;
    const db = new TheGistDatabase(uri);
    await db.connect();

    app.use(logger('dev'));
    
    // NEW: Add json and urlencoded middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use('/client', express.static('client'));
    
    // sendFile will go here
    app.get('/', function(req, res) {
        res.redirect('../client/pages/landingPageLogOut/index.html')
    });
    //
    //USER ROUTES START\
    app.post('/createUser', async (request, response) => {
        const options = request.body;
        await db.InsertUser(options.email, options.password);
        response.status(200).send('success');
    });

    app.get('/checkUserLogin', async (request, response) => {
        const options = request.query;
        try {
            const res = await db.getUser(options.email);
            if (res[0].password === options.password) {
                response.status(200).send('successful login');
            }
            else {
                response.status(500).send('incorrect info');
            }
         } catch (err) {
            response.status(500).send('incorrect info');
         }
    });

    app.get('/checkUserExist', async (request, response) => {
        const options = request.query;
        try {
            const res = await db.getUser(options.email);
            if (res[0] === undefined) {
                response.status(501).send('user doesnt exist');
            }
            else response.status(200).send('user exists');
         } catch (err) {
            response.status(500).send('incorrect info');
         }
    });


    //USER ROUTES END
    
    //INTEREST ROUTES
    app.get('/readInterest', async (request, response) => {
        try {
            const options = request.query;
                const res = await db.getUser(options.email);
            const uid = res[0]._id;
            const rows = await db.readInterestsbyId(uid);
            response.send(rows);
        } catch (err) {
            console.log(err)
            response.status(500).send('incorrect info');
        }
    });
    let dataToSend;

    app.post('/createInterestAndTrending', async (req, res) => {
        //get options from req, check for length
        //run the script break it down into variables and then delete/update/post to db
        const options = req.body;
        const arr = options.args
        const email = options.email
        let userRes;
        try {
            userRes = await db.getUser(options.email);
        } catch (err) {
            response.status(500).send('incorrect info');
        }
        const id = userRes[0]._id;
        if (arr.length > 3) {
            res.status(500).send('incorrect info');
        }
        let options2 = {
            mode: 'text',
            //pythonPath: '/Library/Frameworks/Python.framework/Versions/3.10/bin/python3',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: 'server/',
            args: [arr]
          };
          PythonShell.run('bigScrape.py', options2, async function(err, results) {
              if (err) throw err;
              const res2 = JSON.parse(results)
              const generalAnalysis = res2.generalAnalysis;
              const trendingAnalysis = res2.trendingAnalysis;
              const userAnalysis = res2.userAnalysis;
              const TOD = res2.TOD;
              
              await db.deleteAllInterests(id);
              await userAnalysis.forEach(async (interest) => {
                  await db.InsertInterest(id, interest.topic, interest.sentiment, interest.topWords, interest.orgs);
                })
                
                await db.deleteAllTrendingTopics();
                trendingAnalysis.forEach(async (trending) => {
                    await db.InsertTrendingTopic(trending.topic, trending.sentiment, trending.topWords, trending.orgs);
                })
                
                await db.deleteTrendingAnalysis()
            await db.insertTrendingAnalysis(generalAnalysis)
            
            await db.deleteTOD()
            await db.insertTOD(TOD)
            
            res.status(200).send('success');
        })
    })
    //
    //TRENDING ROUTES
    app.get('/readTrending', async (request, response) => {
        const options = request.query;
        const rows = await db.dumpTrendingTopics();
        response.send(rows);
    });

    app.post('/createTrendingTopic', async (request, response) => {
        const options = request.body;
        //RUN PYTHON SCRIPT
        //Iterate through array of 10 trending from Ez's data and inster Topic per.
        //await db.InsertTrendingTopic
        response.status(200).send('success');
    });
    //
    //TODO: Tweet of the Day Routes
    //GEN TRENDING ROUTES
    app.get('/readTrendingAnalysis', async (request, response) => {
        const rows = await db.readTrendingAnalysis();
        response.send(rows);
    });
    app.post('/createTrendingAnalysis', async (request, response) => {
        const options = request.body;
        //RUN PYTHON SCRIPT
        //PUSH single analysis
        //await db.insertTrendingAnalysis(pythonData.analysis)
        response.status(200).send('success');
    });

    app.get('/getTOD', async (request, response) => {
        const rows = await db.readTOD();
        response.send(rows);
    });

    app.delete('/deleteInterest', async (request, response) => {
        const options = request.query;
        const userRes = await db.getUser(options.email);
        const id = userRes[0]._id;
        await db.deleteInterest(id, options.interest)
        response.status(200).send('success')
    })
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server started on port ${port}`);
      });

}
main().catch(console.error);