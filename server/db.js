import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class TheGistDatabase {
    constructor(dburl) {
      this.dburl = dburl;
    }
  
    async connect() {

      this.client = await MongoClient.connect(this.dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,          
      });
  
      await this.init();
      // Init the database.
      //await this.init();
      //const queryText = 'TRUNCATE GameScore, WordScore';
      //await this.init(); 
    }
    async init() {
        this.db = this.client.db('theGistMainApp');
        //console.log(this.db);
        this.interests = this.db.collection('Interests');
        //console.log(this.interests);
        this.trendingTopics = this.db.collection('TrendingTopics');
        this.users = this.db.collection('Users');
        this.trendingAnalysis = this.db.collection('TrendingAnalysis');
        
    }
  
  
    // Close the pool.
    async close() {
        this.db.close()
        this.client.close();
      //await this.pool.end();
    }

    async InsertInterest(uid, interest, image1,image2,image3, metadata) {
        await this.interests.insertOne({'uid': uid, 'interest': interest, 'image1':image1, 'image2':image2, 'image3':image3, 'metadata':metadata});

    }
    async InsertTrendingTopic(topic, image1,image2,image3) {
        //TODO
        await this.trendingTopics.insertOne({'topic': topic, 'image1':image1, 'image2':image2, 'image3':image3});

    }
    
    async readInterestsbyId(uid) {
        const res = await this.interests.find({'uid': uid}).toArray();
        return res;
    }

    async dumpInterests() {
        const res = await this.interests.find({}).toArray();
        return res;
    }

    async readTrendingTopics(topic) {
        const res = await this.trendingTopics.find({'topic':topic}).toArray();
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

    async deleteTrendingTopic(topic) {
        this.trendingTopics.deleteMany({'topic': topic});
    }

    async updateInterest(uid, interest, image1,image2,image3, metadata) {
        await this.interests.updateOne({'uid': uid, 'interest': interest}, {$set: {'image1':image1, 'image2':image2, 'image3':image3, 'metadata':metadata}}, {upsert: true});
    } 

    async updateTrendingTopic(topic, image1,image2,image3) {
        await this.interests.updateOne({'topic': topic}, {$set: {'image1':image1, 'image2':image2, 'image3':image3}}, {upsert: true});
    }

    async deleteAllTrendingTopics() {
        this.trendingTopics.deleteMany({});
    }

    async deleteAllTrendingTopics() {
        this.trendingTopics.deleteMany({});
    }

    async deleteAllInterestsNoId() {
        await this.interests.deleteMany({});
    }

    async getUser(email) {
        return await this.users.find({'email':email}).toArray();
    }

    //Insert user
    async InsertUser(email, pw) {
        await this.users.insertOne({'email': email, 'password': pw});
    }
    //delete user
    async deleteUser(email) {
        await this.users.deleteMany({'email': email});        
    }

    //wipe users
    async wipeUsers() {
        await this.users.deleteMany({});        
    }

    async deleteTrendingAnalysis() {
        await this.trendingAnalysis.deleteMany({});  
    }

    async insertTrendingAnalysis(image) {
        await this.users.insertOne({'image': image});
    }

    async readTrendingAnalysis() {
        return await this.users.find({}).toArray();
    }
    //TODO: Tweet of the Day Routes

  }