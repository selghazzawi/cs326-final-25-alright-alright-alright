# Steps for setting up The Gist:

## Prerequisites
 - Node.js
 - Heroku CLI
 - git 
 - A Heroku Account

 To start, first clone the repository from our github (link is https://github.com/selghazzawi/cs326-final-25-alright-alright-alright.git).

 Then, open a terminal and go to cs326-final-25-alright-alright-alright/
 
## Running it Locally:
 To run this app locally, it's simple.

 You need to create a mongodb database and also get a twitter api auth token to hit the twitter apis. Then do the below.
 
 You will need to create a .env file within the root directory, and the server folder. The root directory .env is what will have your mongodb database link which should look like
 ```bash
MONGODB_URI="mongodb connection string"
 ```
 and your server/.env should look like:
 ```bash
 BEAR2 = "Twitter API connection string/auth token"
 ```

 Run the following:
 ```bash
 npm install
 npm start
 ```
 Now you can open your browser to the link:

 http://localhost:8080/

 This link is our landing page.

## Running it on Heroku


 Once at this location in the directory, run:
 
```bash
npm install
npm run deploy
cd deploy
npm install
heroku login
```
 This creates a deploy folder where you can push your code to your heroku app and logs you into heroku. If you have a heroku app already, you can skip the next step.

 Run:
 ```bash
heroku create

 ```

 Now, run:
 ```bash
 git init
 heroku git:remote -a "your-app-name"
 git add .
 git commit -am "Deploying to Heroku"
 git push heroku master
 ```
 These steps should push your app to heroku.
 ```bash
 heroku open
 ```
 This should open your app.




