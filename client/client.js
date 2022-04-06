//ONLY USED AS A TEMP FILE FOR NOW TO RUN SERVER.JS

import * as crud from './crud.js';

const nameText = document.getElementById('name');
const analysisText = document.getElementById('analysis');
const ageText = document.getElementById('age');
const createButton = document.getElementById('create');
const readButton = document.getElementById('read');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');
const output = document.getElementById('output');
const all = document.getElementById('all');

async function allTopics() {
  const json = await crud.readAllTopics();
  all.innerHTML = JSON.stringify(json);
}

createButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.createTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allTopics();
});

readButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.readTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allTopics();
});

updateButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const analysis = analysisText.value;
  const json = await crud.updateTopic(name, analysis);
  output.innerHTML = JSON.stringify(json);
  await allTopics();
});

deleteButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.deleteTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allTopics();
});

allTopics();
