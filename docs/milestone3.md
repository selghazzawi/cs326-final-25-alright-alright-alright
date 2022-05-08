# Milestone 3

## Database Structure
 - We decided to use MongoDB for our database for milestone 3.
 - Within our database, we made 5 collections (tables) which are listed below with the structure of the documents on the inside.

### Interests
 - uid: user id
 - interest: the user's interest
 - image1: Bar graph image of specific interest 
 - image2: Bar graph image of specific interest 
 - image3: Pie chart image of specific interest 

### TrendingTopics:
 - topic: Trending topic
 - image1: Bar graph image of specific trending twitter topic
 - image2: Bar graph image of specific trending twitter topic
 - image3: Pie chart image of specific trending twitter topic

### TrendingAnalysis:
 - image: Pie chart image of general analysis done on the trending topics of twitter.

### Users:
 - email: user email for login 
 - password: user password for login

### TOD:
 - link: html for the Tweet of the Day imbedding. 


## Breakdown Of Labor:
#### For a lot of the work in this one, we coded and debugged together on one machine in call so our commits don't match the actual division of labor.
 - Ezra Savitz: Big Python script for scraping twitter API which included getting trending twitter topics and applying analysis to them and creating graphs from them. Scraping script is key to getting all the data that is used to populate our databases.
 - Greg Garber: Worked on API routes, crud functionality, connecting frontend to backend
 - Ibrahim Syed: Worked on API routes, crud functionality, connecting frontend to backend.
 - Sam Elghazzawi: Created database class, worked on creating API routes and connecting frontend to backend. 
