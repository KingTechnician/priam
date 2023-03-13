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


https://user-images.githubusercontent.com/104329626/223510564-9edf7d7e-4198-4b42-828e-be889891e97b.mp4







https://user-images.githubusercontent.com/104329626/223513689-89c3fa35-3ee7-4f16-815a-121a1c623c47.mp4







## Steps to a 1.0.0 Production (Complete!)

- [x] User has the ability to login using VSU email
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
