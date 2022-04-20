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
 
 Run the following:
 ```bash
 npm install
 npm start
 ```
 Now you can open your browser to the link:

 http://localhost:3000/pages/landingPageLogOut/

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




