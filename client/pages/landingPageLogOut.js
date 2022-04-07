import * as crud from '../crud.js';
const trendingBox = document.getElementById('top-trending')
const interestBox = document.getElementById('interest-box')
const analysisBox1 = document.getElementById('analysis-1')
const analysisBox2 = document.getElementById('analysis-2')
const analysisBox3 = document.getElementById('analysis-3')

const tweet = {
    user_name: 'Dave Quinn',
    user_handle: '@NineDaves',
    text: 'Bruce Willis 💔 💔',
    img: 'https://pbs.twimg.com/media/FPHBEr7WQAMw07L?format=jpg&name=900x900'
}

async function populateTrending() {
    while (trendingBox.firstChild) {
        trendingBox.removeChild(trendingBox.lastChild);
      }
    const json = await crud.readAllTrendingTopics();
    let check = 0;
    for (const key in json) {
        if (check < 10) {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = json[key].topic;
            newDiv.classList.add('trending-tag');
            newDiv.onclick = function() {displayNewAnalysis(json[key])};
            trendingBox.appendChild(newDiv);
            check += 1
            if (json[key].id === 1) {
                initialAnalysis(json[key]);
            }
        }
        else break;
    }
    
}

async function populateInterests() {
    while (interestBox.firstChild) {
        interestBox.removeChild(trendingBox.lastChild);
      }
    const json = await crud.readAllInterestTopics();
    console.log(json)
    let check = 0;
    for (const key in json) {
        if (check < 10) {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = json[key].topic;
            newDiv.classList.add('interest-tag');
            interestBox.appendChild(newDiv);
            check += 1
        }
        else break;
    }
}

function populateTweet() {
    const name = document.getElementById('name');
    const handle = document.getElementById('handle')
    const text = document.getElementById('tweet-text');
    const img = document.getElementById('tweet-img');

    name.innerHTML = tweet.user_name;
    handle.innerHTML = tweet.user_handle;
    text.innerHTML = tweet.text;
    img.innerHTML = "<img id='img' src='" + tweet.img + "' alt='Bruce-Willis picture'></img>"
}

function initialAnalysis(obj) {
    analysisBox1.innerHTML = "<img src='" + obj.image1 + "' alt='image1'>"
    analysisBox2.innerHTML = "<img src='" + obj.image2 + "' alt='image2'>"
    analysisBox3.innerHTML = "<img src='" + obj.image3 + "' alt='image3'>"
}

function displayNewAnalysis(obj) {
    console.log('butt')
    analysisBox1.innerHTML = "<img src='" + obj.image1 + "' alt='image1'>"
    analysisBox2.innerHTML = "<img src='" + obj.image2 + "' alt='image2'>"
    analysisBox3.innerHTML = "<img src='" + obj.image3 + "' alt='image3'>"
}
// getAllTrendingTweets()
populateTrending();
populateInterests();
populateTweet();