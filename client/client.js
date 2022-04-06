//ONLY USED AS A TEMP FILE FOR NOW TO RUN SERVER.JS

import * as crud from './crud.js';

const nameText = document.getElementById('name');
const analysisText = document.getElementById('analysis');
const ageText = document.getElementById('age');
const createTrendingButton = document.getElementById('create-trending');
const readTrendingButton = document.getElementById('read-trending');
const updateTrendingButton = document.getElementById('update-trending');
const deleteTrendingButton = document.getElementById('delete-trending');
const createInterestButton = document.getElementById('create-interest');
const readInterestButton = document.getElementById('read-interest');
const updateInterestButton = document.getElementById('update-interest');
const deleteInterestButton = document.getElementById('delete-interest');
const output = document.getElementById('output');
const all = document.getElementById('all');

async function allTrendingTopics() {
  const json = await crud.readAllTrendingTopics();
  all.innerHTML = JSON.stringify(json);
}

async function allInterestTopics() {
  const json = await crud.readAllInterestTopics();
  all.innerHTML = JSON.stringify(json);
}

createTrendingButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.createTrendingTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allTrendingTopics();
});

createInterestButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.createInterestTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allInterestTopics();
});

readTrendingButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.readTrendingTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allTrendingTopics();
});

readInterestButton.addEventListener('click', async (e) => {
  console.log('butt')
  const name = nameText.value;
  const json = await crud.readInterestTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allInterestTopics();
});

updateTrendingButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const analysis = analysisText.value;
  const json = await crud.updateTrendingTopic(name, analysis);
  output.innerHTML = JSON.stringify(json);
  await allTrendingTopics();
});

updateInterestButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const analysis = analysisText.value;
  const json = await crud.updateInterestTopic(name, analysis);
  output.innerHTML = JSON.stringify(json);
  await allInterestTopics();
});

deleteTrendingButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.deleteTrendingTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allTrendingTopics();
});

deleteInterestButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.deleteInterestTopic(name);
  output.innerHTML = JSON.stringify(json);
  await allTrendingTopics();
});

//allTopics();
