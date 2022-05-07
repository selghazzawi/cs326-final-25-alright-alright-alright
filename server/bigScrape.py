import base64
from collections import UserDict
import io
from operator import itemgetter
import os
from time import process_time_ns
from unicodedata import name
# from operator import itemgetter, neg
import numpy as np
import json
import tweepy
import regex as re
import nltk
from nltk.stem.snowball import SnowballStemmer
from nltk.sentiment import SentimentIntensityAnalyzer
import matplotlib.pyplot as plt
import nlp
# from nltk.probability import FreqDist
# import seaborn as sns
import spacy
# import en_core_web_sm

from textblob import TextBlob
import sys
import tweepy
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import nltk
import re
# from wordcloud import WordCloud, STOPWORDS
from PIL import Image
from nltk.sentiment.vader import SentimentIntensityAnalyzer
# from langdetect import detect
from nltk.stem import SnowballStemmer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
# from sklearn.feature_extraction.text import CountVectorizer
from dotenv import load_dotenv


BOSTON_WOEID = 2367105
USA_WOEID = 23424977
MASS_WOEID = 2347580

def getTPC(BEAR):
    auth = tweepy.OAuth2BearerHandler(BEAR)
    api = tweepy.API(auth)
    return api

# def tweetCleaner(tweetText):

def plotToB64(plot):
    my_stringIObytes = io.BytesIO()
    plt.savefig(my_stringIObytes, format='jpg')
    my_stringIObytes.seek(0)
    my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return my_base64_jpgData

def getTop10TrendingDicts(api, woeid):
    trending = api.get_place_trends(woeid)

    trendingDicts = []

    for i in range(0,10):
        # print(trending[0]['trends'][i])
        trendingDicts.append(
            {
            'name': trending[0]['trends'][i]['name'],
            'q': trending[0]['trends'][i]['query'],
            'volume': trending[0]['trends'][i]['tweet_volume'],
            'tweets': [],
            'sources': []
            }
        )
    return trendingDicts

def getTrendingPie(trendingDicts):
    pieNames = [item['name'] for item in trendingDicts]
    pie = {"labels": [], "nums": []}
    pie["nums"] = [item['volume'] for item in trendingDicts]

    p2 = []
    for i in range(len(pieNames)):
        if pie['nums'][i] != None:
            pie['labels'].append(pieNames[i])
            p2.append( pie['nums'][i])
    plt.style.use('fivethirtyeight')
    plt.figure(figsize=(8,8))
    plt.pie(p2, labels= pie['labels'])#, fontsize = 12)
    plt.title("USA Trending Topics Density")
    
    # plt.show()
    return plt

'''
get a trend dictionary and populate the tweets by
'''
def populateTweets(tweetDict,api, count):
    tweets = api.search_tweets(q = tweetDict['q'], lang='en', count = count)
    # print(tweets)

    for t in tweets:
        tweetDict['tweets'].append(t.text)
        tweetDict['sources'].append(t._json['source'])
    return tweetDict

'''this a big one meat and bones'''
def getTopicAnalysis(plt, trendDict):
    # plt.rcParams['font.size'] = 10
    # plt.rcParams["font.monospace"] = ["DejaVu Sans Mono"]
    # plt.rcParams["font.family"] = "monospace"
    analysis = {'topic': trendDict['name']}#qury: str, sentiment: b64img, anal2: b64img, anal2: b64img,

    # sentiment analysis 
    sAnalyzer = SentimentIntensityAnalyzer()
    scores = {'neg': 0, 'pos': 0, 'neu':0}

    # print(trendDict['tweets'])
    for tweet in trendDict['tweets']: #consider using tweetblob
        sentiment = sAnalyzer.polarity_scores(tweet)
        if sentiment['neg'] > sentiment['pos']:
            scores["neg"] += 1
        elif sentiment['neg'] < sentiment['pos']:
            scores['pos'] += 1
        elif sentiment['neg'] == sentiment['pos']:
            scores['neu'] += 1

    # create pie with results
    title = 'Sentiment Analysis for ' + analysis['topic']
    percentages = [format(scores['neg']/len(trendDict['tweets']), '.1f'),
                   format(scores['pos']/len(trendDict['tweets']), '.1f'),
                   format(scores['neu']/len(trendDict['tweets']), '.1f')]
    labels = ['Positive ['+str(percentages[0])+'%]' , 'Neutral ['+str(percentages[1])+'%]','Negative ['+str(percentages[2])+'%]']
    colors = ['yellowgreen', 'blue','red']
    patches, texts = plt.pie(percentages,colors=colors)
    plt.style.use('fivethirtyeight')
    plt.legend(labels)
    plt.title(title)
    
    # plt.show()
    b64plt = plotToB64(plt)
    analysis['sentiment'] = str(b64plt)
    # nltk.download('stopwords')
    # done sentiment
    stemmer = SnowballStemmer(language='english')
    allWords = []
    # lines = [re.sub(r'[^A-Za-z0-9]+', ' ', x).lower() for x in trendDict['tweets']]
    # lines = [re.sub(r'@[A-Za-z0-9_]+',"", x)]
    lines = []
    for tweet in trendDict['tweets']:
        temp = re.sub(r"@[A-Za-z0-9_]+","", tweet)
        temp = re.sub(r"#[A-Za-z0-9_]+","", temp)
        temp = re.sub(r"http\S+", "", temp)
        temp = re.sub(r"www.\S+", "", temp)
        temp = re.sub(r'[()!?:]', '', temp)
        temp = re.sub(r'\[.*?\]+','', temp)
        temp = temp.replace('"', '')
        lines.append(temp)

    # print(lines)
    for tweet in lines:
        words = tweet.split()
        for word in words:
            # stem = stemmer.stem(word)
            stem = word.lower()
            if stem not in nltk.corpus.stopwords.words() and stem != 'rt' and not stem.startswith('https') and stem != 'co' and stem != '…' and stem != '-':
                allWords.append(stem)

    # print(allWords)

    # print(allWords)
    # df = pd.DataFrame(allWords)
    # frqHelp = FreqDist()
    # for word in df:
    #     frqHelp[word] += 1
    # df.columns = ['Word', 'Frequency']
    wordFreqs = {}
    for word in allWords:
        if word in wordFreqs:
            wordFreqs[word] += 1
        else:
            wordFreqs[word] = 1

    sortedFreqs = dict(sorted(wordFreqs.items(), key= itemgetter(1), reverse=True)[:20])
    # print(sortedFreqs)
    # print(sortedFreqs.items())
    
    # print(df)
    # print(frqHelp)
        
    # df = df[:20]
    # print(df)
    # df = df.loc[:,~df.columns.duplicated()]
    plt.figure(figsize=(10,6))
    # sns.barplot(x = df.values, y = df.index, alpha=0.8)
    # sns.barplot(df)
    # sns.barplot(x = df.values, y = df.index,data = df)
    plt.style.use('fivethirtyeight')
    plt.bar(range(len(sortedFreqs)), list(sortedFreqs.values()))
    plt.xticks(range(len(sortedFreqs)), list(sortedFreqs.keys()), rotation = 30, fontsize = 8)
    plt.title('Top Words ' + trendDict['name'])
    plt.ylabel('Word from Tweet', fontsize=12)
    plt.xlabel('Count of Words', fontsize=12)
    # plt.show()
    b64plt = plotToB64(plt)
    analysis['topWords'] = str(b64plt)

    # end top wrods
    # spacy download en_core_web_sm
    nlp = spacy.load("en_core_web_sm")

    # print(' '.join(allWords))

    allWordsLabel = nlp(' '.join(allWords))

    label = [(X.text, X.label_) for X in allWordsLabel.ents]
    # print(label)

    topOrgsPeople = {}
    for thing in label:
        if(thing[1] == 'ORG' or thing[1] == 'PERSON'):
            if thing[0] in topOrgsPeople:
                topOrgsPeople[thing[0]] += 1
            else:
                topOrgsPeople[thing[0]] = 1
    
    # plt.figure(figsize=(10,5))
    # sns.barplot(x = df.values, y = df.index, alpha=0.8)
    # sns.barplot(df)
    # sns.barplot(x = df.values, y = df.index,data = df)
    topOrgsPeople = dict(sorted(topOrgsPeople.items(), key= itemgetter(1), reverse=True)[:20])
    plt.style.use('fivethirtyeight')
    plt.bar(range(len(topOrgsPeople)), list(topOrgsPeople.values()))
    plt.xticks(range(len(topOrgsPeople)), list(topOrgsPeople.keys()), rotation = 30, fontsize = 8)
    plt.title('Top People and Organizations ' + trendDict['name'])
    plt.ylabel('Item from Tweet', fontsize=12)
    plt.xlabel('Count of Words', fontsize=12)
    # plt.show()

    b64plt = plotToB64(plt)
    analysis['orgs'] = str(b64plt)
    
    return analysis

# def getTweetOfTheDay(topTrendQuery):
#     return

def doBigScrape(userInterests):
    load_dotenv()

    returnData = {}
    api = getTPC(os.environ['BEAR'])
    trendingDicts = getTop10TrendingDicts(api, USA_WOEID)
    #still need to populate with tweets
    for trend in trendingDicts:
        populateTweets(trend, api, 2500)

    # print(trendingDicts)
    pie64 = plotToB64(getTrendingPie(trendingDicts))
    # pie = getTrendingPie(trendingDicts)
    returnData['generalAnalysis'] = str(pie64) #store bytes as string
    returnData['trendingAnalysis'] = []
    returnData['userAnalysis'] = []
    for i in range(len(trendingDicts)):
        returnData['trendingAnalysis'].append(getTopicAnalysis(plt,trendingDicts[i]))

    UserDicts = []
    for i in range(len(userInterests)):
        # print(trending[0]['trends'][i])
        UserDicts.append(
            {
            'name': userInterests[i],
            'q': userInterests[i],
            'tweets': [],
            'sources': []
            }
        )
        populateTweets(UserDicts[i], api, 2500)
        returnData['userAnalysis'].append(getTopicAnalysis(plt,UserDicts[i]))

    returnData['TOD'] = trendingDicts[0]['sources'][0]

    with open('sampleV2.txt', 'w') as f:
        f.write(json.dumps(returnData))
    return(json.dumps(returnData))

if __name__ == "__main__":
    doBigScrape(['Celtics','Marcus Smart', 'Jayson Tatum'])
