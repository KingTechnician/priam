# Priam

## Purpose

 - Are you a student who has a new idea or concern they would like to make known to the university administration?
 - Are you unsure of the resources or means necessary?
 
 A solution presented by me, Isaiah Freeman, is Priam, web application that has the goal of making the desires of students more visible to faculty and administration at your university.
 
 ## How?
 - The Priam system is simple: you might consider it a voting system. Students have the ability to create an account, and propose changes they would like to make to the university in a short post.
 - Categories can be added to the posts to better organize the nature of their requests.
 Other users have the ability to view these public posts and have the optoon to upvote them.
 - Other users have the ability to iew these public posts and have the option to upvote them.
 - These posts are anonymous. No one will know the author of the post.
 - There are no comments. No judgement necesary.
 - The only metric is upvotes.
 
 There are also basic searching methods to allow you to search posts by name, title or date. You can also sort by category.

## User Stories (Subject to change as more features are added)


https://user-images.githubusercontent.com/104329626/225977254-146f3833-8bcd-426e-bdff-6124a60b0f86.mp4



https://user-images.githubusercontent.com/104329626/225977328-a4fab17d-e965-44b0-82e4-45fd87be1600.mp4




## Run Locally
 - Before anything, check out the pre_setup.md to follow how I set up authentication and the server.
 - Want to start small? Not sure if you want to dedicate to a full application?
    - Check out the [Lite version](https://www.github.com/kingtechnician/priam_lite) of this application (non-downloadable, basic design)
 - Otherwise, follow the instructions at application_setup.md to set up the application locally.




## Steps to a 1.0.0 Production (Complete!)

- [x] User has the ability to login using university email
- [x] Only VSU emails are allowed to validate and pass login
- [x] Profile username is recognized by the application
- [x] User can query server posts
  - [x] By Title
  - [x] By Description
  - [x] By Tags
- [x] User can filter server posts
  - [x] By Date
  - [x] By Upvotes
  - [x] By Tags
- [x] User can create a post with a Title and Description
- [x] User can add tags to created posts
- [x] Users are able to upvote desired posts, which are also stored in a server

## Ensuring Security (Complete!)
- [x] Keeping important values in-memory and inaccessible via browser
- [x] Validating people accessing the AWS Lambda Functions through Auth0 tokens
- [x] MFA
- [x] Ensuring CORS policy for AWS Lambda Functions
