import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

//'https://jsonplaceholder.typicode.com/todos/1'
const fakeData = 'fakeData.json';

let theGist = {};

async function reload(filename) {
    try {
        const data = await readFile(filename, { encoding: 'utf8' });
        theGist = JSON.parse(data);
    } catch (err) {
        theGist = {};
    }
}

async function saveTopic() {
    try {
        const data = JSON.stringify(theGist);
        await writeFile(fakeData, data, { encoding: 'utf8' });
    }
    catch (err) {
        console.log(err)
    }
}

function topicExists(name) {
    return name in theGist;
}

 function getID() {
    return theGist[Object.keys(theGist)[Object.keys(theGist).length - 1]]["id"] + 1;
}

async function createTopic(response, name) {
    if (name === undefined) {
        // 400 - Bad Request
        response.status(400).json({ error: 'Topic name is required' });
    } else {
        await reload(fakeData);
        console.log(name);
        console.log(theGist);
        theGist[name] = {   
            "id": getID(),
            "topic": name,
            "Anal": "I love " + name,
            "image": "https://picsum.photos/200/300",
            "Metadata": {}
        };
        console.log(theGist[name]);
        await saveTopic();
        response.json({ topic: name, value: theGist[name] });
    
    }
}

async function readTopic(response, name) {
    await reload(fakeData);
    if (topicExists(name)) {
        response.json({ topic: name, value: theGist[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    }
}

async function updateTopic(response, name, analysis) {
    if (topicExists(name)) {
        theGist[name]["Anal"] = analysis;
        await saveTopic();
        response.json({ topic: name, value: theGist[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    }
    
}

async function deleteTopic(response, name) {
    if (topicExists(name)) {
        delete theGist[name];
        await saveTopic();
        response.json({ topic: name, value: theGist[name] });
    } else {
        // 404 - Not Found
        response.json({ error: `Topic '${name}' Not Found` });
    }
}

async function dumpTopics(response) {
    await reload(fakeData);
    response.json(theGist);
}

const app = express();
const port = 3000;

app.use(logger('dev'));

// NEW: Add json and urlencoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('../client'));

//

app.post('/create', async (request, response) => {
    const options = request.body;
    createTopic(response, options.name);
});

app.get('/read', async (request, response) => {
    const options = request.query;
    readTopic(response, options.name);
});

app.put('/update', async (request, response) => {
    const options = request.query;
    updateTopic(response, options.name, options.analysis);
});

app.delete('/delete', async (request, response) => {
    const options = request.query;
    deleteTopic(response, options.name);
});


app.get('/dump', async (request, response) => {
    const options = request.body;
    dumpTopics(response);
});

/*app.get('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});*/

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  