# Milestone 2

## Api Planning:

### POST

- /createTrending
  - Create a trending topic to store in the local database with set limit of 10 total topics at a time
- /createInterest
  - Create a user interest topic to store in the local database with set limit of 3 total topics at a time for each user

### GET

- /dumpTrending
  - On page load, call api to get all trending topics and metadata listed in local database
- /dumpInterests
  - On page load, call api to get all user interest topics and metadata listed in local database

### PUT

- /updateTrending
  - Update the trending topics in local database when Twitter scraping is done each day based on current Twitter trends
- /updateInterest
  - Update the user interest topic data in local database when Twitter scraping is done each day

### DELETE

- /deleteTrending
  - Delete topic and associated data from local database if topic is no longer trending
- /deleteInterest
  - Delete user topic from local database if user no longer wants to track the topic

---

## Images

### Update

This area represent the analysis of a specific trending topic which will be updated throughout the day as Twitter data is processed. The analysis will be composed of graphs with sentiment analysis and keyword analysis. The images shown here are placeholders.
![Update](./Screen%20Shot%202022-04-19%20at%201.35.34%20PM.png)

### Create

Here a user can type in an interest query to and hit submit to add to their limited list of interests for analysis.
![Create](./Screen%20Shot%202022-04-19%20at%201.36.15%20PM.png)

### Read

Here we read from the database to gather the list of trending topics and when clicked, the corresponding analysis would be shown in the analysis area of the page.

![Read](./Screen%20Shot%202022-04-19%20at%201.36.34%20PM.png)

### Delete

Here a user can click on the 'x' to delete a topic from their 3 interests.

![Delete](./Screen%20Shot%202022-04-19%20at%201.38.54%20PM.png)

---

## Link to project
First link is to the app, second is for the landing page.

https://cs326-final-25-alright-alright.herokuapp.com

https://cs326-final-25-alright-alright.herokuapp.com/client/pages/landingPageLogOut/

## Division of Labor

Ezra Savitz: Sign up Page, and has looked into using the twitter api to gather data
Ibrahim Syed: Login Page, and has worked on the logged in page, it frontend with the backend
Sam Elghazzawi: Created the api endpoints and worked on deployemnt
Gregory Garber: Worked with api endpoints and created crud functionaility and integrated the loggedout page with the backend
