import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { spawn } from 'child_process';
import mongoose from 'mongoose';
import { TheGistDatabase } from './db.js';
import { createSecureServer } from 'http2';

//'https://jsonplaceholder.typicode.com/todos/1'
const fakeTrendingData = 'server/fakeTrendingData.json';
const fakeInterestData = 'server/fakeInterestData.json';

let theGist = {};
let interest = {};
 

async function reloadTrending(filename) {
    try {
        const data = await readFile(filename, { encoding: 'utf8' });
        theGist = JSON.parse(data);
    } catch (err) {
        theGist = {};
    }
}

async function reloadInterest(filename) {
    try {
        const data = await readFile(filename, { encoding: 'utf8' });
        interest = JSON.parse(data);
    } catch (err) {
        interest = {};
    }
}

async function saveTrendingTopic() {
    try {
        const data = JSON.stringify(theGist);
        await writeFile(fakeTrendingData, data, { encoding: 'utf8' });
    }
    catch (err) {
        console.log(err)
    }
}

async function saveInterestTopic() {
    try {
        const data = JSON.stringify(interest);
        await writeFile(fakeInterestData, data, { encoding: 'utf8' });
    }
    catch (err) {
        console.log(err)
    }
}

function trendingTopicExists(name) {
    return name in theGist;
}

function interestTopicExists(name) {
    return name in interest;
}

 function getTrendingID() {
     console.log(theGist)
    if (Object.keys(theGist).length === 0) {return 1}
    return theGist[Object.keys(theGist)[Object.keys(theGist).length - 1]]["id"] + 1;
}

function getInterestID() {
   if (Object.keys(interest).length === 0) {return 1}
   return interest[Object.keys(interest)[Object.keys(interest).length - 1]]["id"] + 1;
}

async function createTrendingTopic(response, name) {
    await reloadTrending(fakeTrendingData);
    if (name === undefined || name === '') {
        // 400 - Bad Request
        response.status(400).json({ error: 'Topic name is required' });
    } else if (trendingTopicExists(name)) {
        response.status(400).json({ error: 'Topic already exists' });
    } else {
        if (Object.keys(theGist).length < 10) {
            console.log(name);
            console.log(theGist);
            theGist[name] = {   
                "id": getTrendingID(),
                "topic": name,
                "Anal": "I love " + name,
                "image1": "https://picsum.photos/200/300",
                "image2": "https://picsum.photos/200/300",
                "image3": "https://picsum.photos/200/300",
                "Metadata": {}
            };
            console.log(theGist[name]);
            await saveTrendingTopic();
            response.json({ topic: name, value: theGist[name] });   
        } else {
            response.status(400).json({ error: 'Too many topics' });
        }
    }
}

async function createInterestTopic(response, name) {
    await reloadInterest(fakeInterestData);
    if (name === undefined || name === '') {
        // 400 - Bad Request
        response.status(400).json({ error: 'Topic name is required' });
    } else if (interestTopicExists(name)) {
        response.status(400).json({ error: 'Topic already exists' });
    } else {
        console.log(Object.keys(interest))
        if (Object.keys(interest).length < 3) {
            interest[name] = {   
                "id": getInterestID(),
                "topic": name,
                "Anal": "I love " + name,
                "image1": "https://picsum.photos/200/300",
                "image2": "https://picsum.photos/200/300",
                "image3": "https://picsum.photos/200/300",
                "Metadata": {}
            };
            await saveInterestTopic();
            response.json({ topic: name, value: interest[name] });
        } else {
            response.status(400).json({ error: 'Too many topics' });
        } 
    }
}

async function readTrendingTopic(response, name) {
    await reloadTrending(fakeTrendingData);
    if (trendingTopicExists(name)) {
        response.json({ topic: name, value: theGist[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    }
}

async function readInterestTopic(response, name) {
    await reloadInterest(fakeInterestData);
    if (interestTopicExists(name)) {
        response.json({ topic: name, value: interest[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    }
}

async function updateTrendingTopic(response, name, analysis) {
    if (trendingTopicExists(name)) {
        theGist[name]["Anal"] = analysis;
        await saveTrendingTopic();
        response.json({ topic: name, value: theGist[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    } 
}

async function updateInterestTopic(response, name, analysis) {
    if (interestTopicExists(name)) {
        interest[name]["Anal"] = analysis;
        await saveInterestTopic();
        response.json({ topic: name, value: interest[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    } 
}

async function deleteTrendingTopic(response, name) {
    await reloadTrending(fakeTrendingData);
    if (trendingTopicExists(name)) {
        delete theGist[name];
        await saveTrendingTopic();
        response.json({ topic: name, value: theGist[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    }
}

async function deleteInterestTopic(response, name) {
    await reloadInterest(fakeInterestData);
    console.log(name)
    if (interestTopicExists(name)) {
        console.log('hi')
        delete interest[name];
        await saveInterestTopic();
        response.json({ topic: name, value: interest[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    }
}

async function dumpTrendingTopics(response) {
    await reloadTrending(fakeTrendingData);
    response.json(theGist);
}

async function dumpInterestTopics(response) {
    await reloadInterest(fakeInterestData);
    response.json(interest);
}


/*app.get('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});*/
//const uri = process.env.MONGODB_URI;
//const client = new MongoClient(uri);

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`)); 
}

/*async function createCollection(client) {
    client.createCollection("testRun", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // close the connection to db when you are done with it

    });
}*/



async function main() {
    const app = express();
    const port = 3000;
    
    const db = new TheGistDatabase(uri);
    await db.connect();

    app.use(logger('dev'));
    
    // NEW: Add json and urlencoded middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use('/client', express.static('client'));
    
    //
    //USER ROUTES START\
    app.post('/createUser', async (request, response) => {
        const options = request.body;
        await db.InsertUser(options.email, options.password);
        response.status(200).send('success');
    });

    app.get('/checkUserLogin', async (request, response) => {
        const options = request.query;
        const res = await db.getUser(options.email);
        if (res[0].password === options.password) {
            res.status(200).send('successful login');
        }
        else {
            res.status(500).send('incorrect info');
        }
    });


    //USER ROUTES END
    
    //INTEREST ROUTES
    app.get('/readInterest', async (request, response) => {
        const options = request.query;
        const res = await db.getUser(options.email);
        const uid = res[0]._id;
        const rows = await db.readInterestsbyId(uid);
        response.send(rows);
    });

    app.post('/createInterest', async (request, response) => {
        const options = request.body;
        //uid interest i1/2/3
        const res = await db.getUser(options.email);
        const uid = res[0]._id;
        const rows = await db.readInterestsbyId(uid);
        if (rows.length >= 3) {
            response.status(500).send(`Max interests: ${rows.length} `);
        }
        //RUN PYTHON SCRIPT
        //await db.InsertInterest(uid, pythonData.interest, pythonData.image1, pythonData.image2, pythonData.image3)
        response.status(200).send('success');
    });
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
        const options = request.query;
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

    // ----------------------------------------------------------------routes below are gonna get deleted eventually
    
    app.post('/createTrending', async (request, response) => {
        const options = request.body;
        createTrendingTopic(response, options.name);
    });
    
    
    
    app.put('/updateTrending', async (request, response) => {
        const options = request.query;
        updateTrendingTopic(response, options.name, options.analysis);
    });
    
    app.put('/updateInterest', async (request, response) => {
        const options = request.query;
        updateInterestTopic(response, options.name, options.analysis);
    });
    
    app.delete('/deleteTrending', async (request, response) => {
        const options = request.query;
        deleteTrendingTopic(response, options.name);
    });
    
    app.delete('/deleteInterest', async (request, response) => {
        const options = request.query;
        deleteInterestTopic(response, options.name);
    });
    
    
    app.get('/dumpTrending', async (request, response) => {
        const options = request.body;
        dumpTrendingTopics(response);
    });
    
    app.get('/dumpInterest', async (request, response) => {
        const options = request.body;
        dumpInterestTopics(response);
    });

    const uri = process.env.MONGODB_URI;
    //console.log(uri)
    //const client = new MongoClient(uri);
    try {
        /*const client = new TheGistDatabase(uri);
        await client.connect();
        await client.InsertInterest(1,'celtics', 'i1', 'i2', 'i3', 'meta');
        console.log(await client.readInterestsbyId(1));
        */


    }
    catch (e) {
        console.error(e);
    }
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });

}
main().catch(console.error);