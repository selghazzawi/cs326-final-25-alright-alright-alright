import 'dotenv/config';
import { MongoClient } from 'mongodb';

export class TheGistDatabase {
    constructor(dburl) {
      this.dburl = dburl;
    }
  
    async connect() {

      this.mongo = new MongoClient(this.dburl);  
  
      // Create the pool.
      this.client = await this.mongo.connect();
  
      // Init the database.
      this.db = client.db('theGistMainApp');
      this.interests = this.db.collection('Interests');
      this.trendingTopics = this.db.collection('TrendingTopics');
      //await this.init();
      //const queryText = 'TRUNCATE GameScore, WordScore';
      //await this.init(); 
    }
  
  
    // Close the pool.
    async close() {
        this.db.close()
        this.client.close();
      //await this.pool.end();
    }

    async InsertInterest(uid, interest, image1,image2,image3, metadata) {
        await this.interests.insertOne({'uid': uid, 'interest': interest, 'image1':image1, 'image2':image2, 'image3':image3, 'metadata':metadata});
        /*
        Interest:
        image1:
        image2:
        image3:
        uid:
        meta*/
    }
    async InsertTrendingTopic(id, topic, image1,image2,image3, metadata) {
        //TODO
        await this.trendingTopics.insertOne({'tid': id, 'topic': topic, 'image1':image1, 'image2':image2, 'image3':image3, 'metadata':metadata});

    }
    
    async readInterestsbyId(uid) {
        const res = await this.interests.find({'uid': uid}).toArray();
        return res;
    }

    async dumpInterests() {
        const res = await this.interests.find({}).toArray();
        return res;
    }

    async readTrendingTopicsById(id) {
        const res = await this.trendingTopics.find({'tid': id}).toArray();
        return res;
    }

    async dumpTrendingTopics() {
        const res = await this.trendingTopics.find({}).toArray();
        return res;
    }

    async deleteInterest(uid, interest) {
        this.interests.deleteOne({'uid': uid, 'interest': interest});
    }

    async deleteAllInterests(uid) {
        this.interests.deleteMany({'uid': uid});
    }

    async deleteTrendingTopic(id, topic) {
        this.interests.deleteMany({'tid': id, 'topic': topic});
    }

    async updateInterest(uid, interest, image1,image2,image3, metadata) {
        await this.interests.updateOne({'uid': uid, 'interest': interest}, {$set: {'image1':image1, 'image2':image2, 'image3':image3, 'metadata':metadata}}, {upsert: true});
    } 

    async updateTrendingTopic(id, topic, image1,image2,image3, metadata) {
        await this.interests.updateOne({'tid': id, 'topic': topic}, {$set: {'image1':image1, 'image2':image2, 'image3':image3, 'metadata':metadata}}, {upsert: true});

    }

  }