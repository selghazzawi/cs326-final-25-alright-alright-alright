const trendingBox = document.getElementById('top-trending')
const interestBox = document.getElementById('interest-box')
const trendingArr = ['Bruce Willis', '#TrumpCoverUp', 'Tyga', '#discorddown', '#PMSHappyBirthdayTone',
                     'Patrick Peterson', 'Cawthorn', '5sos', 'Hunter Biden', '#AsItWas']
const interestArr = ['Celtics', 'Kung Fu Panda', 'Chuck Norris']

const tweet = {
    user_name: 'Dave Quinn',
    user_handle: '@NineDaves',
    text: 'Bruce Willis 💔 💔',
    img: 'https://pbs.twimg.com/media/FPHBEr7WQAMw07L?format=jpg&name=900x900'
}


function populateTrending() {
    // while (trendingBox.firstChild) {
    //     trendingBox.removeChild(trendingBox.lastChild);
    //   }

    trendingArr.forEach((tag) => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = tag;
        newDiv.classList.add('trending-tag');
        trendingBox.appendChild(newDiv);
    })
}

function populateInterests() {
    interestArr.forEach((tag) => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = tag;
        newDiv.classList.add('interest-tag');
        interestBox.appendChild(newDiv);
    })
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

populateTrending();
populateInterests();
populateTweet();