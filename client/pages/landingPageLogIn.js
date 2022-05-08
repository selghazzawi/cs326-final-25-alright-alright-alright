import * as crud from '../crud.js';
const trendingBox = document.getElementById('top-trending')
const interestBox = document.getElementById('interest-box')
const analysisBox1 = document.getElementById('analysis-1')
const analysisBox2 = document.getElementById('analysis-2')
const analysisBox3 = document.getElementById('analysis-3')
const generalAnalysis = document.getElementById('analysis-4')
const searchBar = document.getElementById('search-bar')
const submitButton = document.getElementById('submit-button')
const tweet = document.getElementById('tweet-box')

let email = JSON.parse(window.localStorage.getItem('email'))//updates once user logs in

// async function populateTrending() {
//     while (trendingBox.firstChild) {
//         trendingBox.removeChild(trendingBox.lastChild);
//       }
//     const json = await crud.readAllTrendingTopics();
//     let check = 0;
//     for (const key in json) {
//         if (check < 10) {
//             const newDiv = document.createElement('div');
//             newDiv.innerHTML = json[key].topic;
//             newDiv.classList.add('trending-tag');
//             newDiv.onclick = function() {displayNewAnalysis(json[key])};
//             trendingBox.appendChild(newDiv);
//             check += 1
//             if (json[key].id === 1) {
//                 initialAnalysis(json[key]);
//             }
//         }
//         else break;
//     } 
// }

document.getElementById('logOut').addEventListener('click', () => {
    location.href = 'http://localhost:8080/client/pages/login/'
})

async function populateTrending() {
    while (trendingBox.firstChild) {
        trendingBox.removeChild(trendingBox.lastChild);
      }
      const json = await crud.getTrendingTopics();
      let check = 0
      json.forEach(key => {
        if (check < 10) {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = key.topic;
            newDiv.classList.add('trending-tag');
            newDiv.onclick = function() {displayNewAnalysis(key)};
            trendingBox.appendChild(newDiv);
            if (check === 0) {
                initialAnalysis(key);
            }
            check += 1
        }
      })
}

async function populateInterests() {
    while (interestBox.firstChild) {
        interestBox.removeChild(interestBox.lastChild);
      }
    const json = await crud.getInterests(email);
    let check = 0
      json.forEach(key => {
        if (check < 3) {
            const newDiv = document.createElement('div');
            const text = document.createElement('div');
            const x = document.createElement('div');
            x.innerHTML = 'x'
            x.onclick = function() {deleteInterest(text.innerHTML)}
            text.innerHTML = key.interest;
            text.onclick = function() {displayNewAnalysis(key)};
            newDiv.appendChild(text)
            newDiv.appendChild(x)
            newDiv.style.display = 'flex'
            newDiv.style.justifyContent = 'space-between'
            newDiv.classList.add('interest-tag');
            interestBox.appendChild(newDiv);
            check += 1
        }
      })
}

async function populateGenAnalysis() {
    while (generalAnalysis.firstChild) {
        generalAnalysis.removeChild(generalAnalysis.lastChild);
    }
    const json = await crud.getTrendingAnalysis()
    const image1 = new Image();
    image1.src = `data:image/png;base64,${json[0].image.substring(2, json[0].image.length - 1)}`;
    generalAnalysis.appendChild(image1);
    image1.style.height = '100%'
    image1.style.width = '100%'

}

async function populateTweet() {
    const json = await crud.getTOD()
    const resTweet = json[0].link
    tweet.innerHTML = resTweet
}

function initialAnalysis(obj) {
    const image1 = new Image();
    image1.src = `data:image/png;base64,${obj.image1.substring(2, obj.image1.length - 1)}`;
    analysisBox3.appendChild(image1);
    image1.style.height = '100%'
    image1.style.width = '100%'

    const image2 = new Image();
    image2.src = `data:image/png;base64,${obj.image2.substring(2, obj.image2.length - 1)}`;
    analysisBox2.appendChild(image2);
    image2.style.height = '100%'
    image2.style.width = '100%'

    const image3 = new Image();
    image3.src = `data:image/png;base64,${obj.image3.substring(2, obj.image3.length - 1)}`;
    analysisBox1.appendChild(image3);
    image3.style.height = '100%'
    image3.style.width = '100%'
}

function displayNewAnalysis(obj) {
    analysisBox1.removeChild(analysisBox1.lastChild)
    analysisBox2.removeChild(analysisBox2.lastChild)
    analysisBox3.removeChild(analysisBox3.lastChild)

    const image1 = new Image();
    image1.src = `data:image/png;base64,${obj.image1.substring(2, obj.image1.length - 1)}`;
    analysisBox3.appendChild(image1);
    image1.style.height = '100%'
    image1.style.width = '100%'

    const image2 = new Image();
    image2.src = `data:image/png;base64,${obj.image2.substring(2, obj.image2.length - 1)}`;
    analysisBox2.appendChild(image2);
    image2.style.height = '100%'
    image2.style.width = '100%'

    const image3 = new Image();
    image3.src = `data:image/png;base64,${obj.image3.substring(2, obj.image3.length - 1)}`;
    analysisBox1.appendChild(image3);
    image3.style.height = '100%'
    image3.style.width = '100%'
}


async function deleteInterest(interest) {
    await crud.deleteInterestTopic(email, interest)
    await populateInterests();
}

submitButton.addEventListener('click', async function() {
    let arr = []
    if (interestBox.firstChild) {
        for (let i = 0; i < interestBox.children.length; i++) {
            arr.push(interestBox.children[i].children[0].innerHTML)
        }
    }
    if (searchBar.value === '') {return}
    arr.push(searchBar.value)
    try {
    const data = await crud.createInterestTopic(email, arr)
    populateTrending();
    populateInterests();
    populateGenAnalysis();
    populateTweet();
    } catch (err) {
        alert(err)
    }
})
populateTrending();
populateInterests();
populateGenAnalysis();
populateTweet();