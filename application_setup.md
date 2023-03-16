# Setting up the Application

Note: We will be setting this under the presmise that there will be two Netlify sites: one that hosts the client application and the other that serves custom-made REST API to make calls to the MongoDB server.

If you have not completed the pre_setup.md instructions, please complete that before continuing with these instructions.

## Creating A Netlify Account and Netlify Sites

### 1. Creating a Netlify Account and First Site (Client)
- Head to the [Welcome to Netlify | Netlify](https://app.netlify.com/signup) page and go through the process of creating an account.
- I **heavily** recommend using GitHub to create your account. This will help with integrating repositories to deploy directly.
- Fortunately, Netlify has wonderful documentation on their sign up process, so just take a look at [A Step-by-Step Guide: Deploying on Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
- In Step 5, ensure that the Public directory directs to build (where the public build files are contained).
- The site you have just created will serve as the client application where the React interface will be hosted.
- However, when you go to this URL, you will receive an error. This is because we need to set the environmental variables.
- The Priam project comes with a module called ```cross-env```, which allows the running and building of a React application with environmental variables.
  - Head to the ```client/package.json``` file, and look for the code below:
  ```
  "scripts":{
    "start" : "cross-env REACT_APP_AUTH0_DOMAIN=<auth0-domain-here> REACT_APP_AUTH0_CLIENT=<auth0-client-here> REACT_APP_BACKEND_URL=<backend-url-here> react-scripts start",
    "build" : "cross-env REACT_APP_AUTH0_DOMAIN=<auth0-domain-here> REACT_APP_AUTH0_CLIENT=<auth0-client-here> REACT_APP_BACKEND_URL=<backend-url-here> react-scripts build",
    "test":"react-scripts test",
    "eject":"react-scripts eject"
  },
  ```
  - Replace the values of the domain and client in start and build with the Auth0 Domain and Client respectively (don't worry about BACKEND_URL - we'll set that up in the next step).
- Next, we're going to initialize the serverless functions REST API.

### 2. Creating the Second Site and Storing Serverless Functions (Backend)
- Go through the same process mentioned in [Welcome to Netlify | Netlify](https://app.netlify.com/signup) to create a second site.
- Give this site a name that lets you know it is for the backend.
- The following steps assume that you have already pulled this repository locally.
  1. Netlify provides command-line interface not only for publishing sites, but also for handling Netlify Functions You will need to install Netlify CLI globally.
  - If you're using npm: run ```npm install -g netlify-cli```  
  - If you're using yarn: run ```yarn global add netlify-cli```
  2. To get you signed in, first run: ```netlify login```. This will run you through the process of logging in.
  3. Run ```netlify deploy```. The interface will ask you if you would like to link to an existing site. Follow the instructions to add the site you created earlier.
  4. This should create a new folder that stores the site ID of the one you made, as well as a ```netlify.toml```. This will tell Netlify where to deploy your code.
  5. You should be ready to use the REST API for server connections now! Note that using ```netlify deploy``` will create a **test** build for your site. In order to deploy in production for your site URL, add the ```--prod``` tag to the command:
  - ```netlify deploy --prod```
  6. Head back to ```client/package.json``` and replace the BACKEND_URL's value to the URL of the site you just created.
  7. Curious about how the ```netlify.toml``` works and how to add new endpoints? Check out the [Intro to Serverless Functions | Netlify](https://www.netlify.com/blog/intro-to-serverless-functions/) for a more in-depth understanding.
  8. However, the code won't work *quite* yet. There are still some environmental variables we need to set up.

### 3. Backend side - Setting up Environmental Variables
- In the directory ```backend/netlify/functions```, you'll note that there are two environmental variables called: ```ATLASURI``` and ```CLIENT_URL```.
- Normally, we would use a .env file, and we can technically do this if we are uploading manually, but **not** if uploading with Github.
- To make things simpler and more secure, we can set environmental variables directly to our Netlify site. 
- Head to the main dashboard of Netlify and navigate to your site.
- Just under where you see the URL, deploy location and last published date, click the ```Site Settings``` button.
- Navigate to ```Environmental variables``` from the left menu.
- From there, you can add the environmental variables (Keep this page open).

### 4. Setting ATLASURI Variable
- **Note:** These instructions onward assume that you have completed all of the steps at pre_setup.md. If you have not done so, please go to that file before continuing with these instructions.
- In another tab, sign into MongoDB and head to the cluster that you created. Click on the ```Connect```, then the ```MongoDB Drivers``` button. MongoDB will provide you with the connection string template, but you should replace them with the username and password that you created for **users** (NOT the admin credentials).
  - Forgot your old password? No worries. Head to **Security > Database Access** and edit the user. You can set a new pass there.
- After grabbing that information, paste the full connection string with the username and password replaced with your actual credentials, as a value for the ATLASURI key.

### 5. Setting CLIENT_URL Variable

- This process is far simpler. Simply head to the first site you created for the React application, and grab the URL you chose for your site.


Success! Your backend service is now almost completely setup. The next steps will be some integrations between Auth0 and MongoDB, along with configuring Auth0 so that only your university's emails can sign in.

## Setting up Auth0 For Your University

One of the login goals of our application is that only emails from a specific university will be able to have access. Below are two options for implementing this.

### Option 1: Using Microsoft SSO from your university's email domain (Preferred)

- If you are a professor or staff member who wants to integrate this application for your university, you can add Auth0 Integrations into your account and get set up! [Office 365](https://marketplace.auth0.com/integrations/office-365-sso)


### Option 2: Programmatically checking for university email addresses for incoming sign-on

- More than likely, most of you will fall into this category (as you are likely students/engineers).
- But don't worry! Using Auth0 Rules, we can programmatically check the email domains of incoming users in a secure, isolated sandbox.
  1. Sign in to Auth0 again and head to the Dashboard.
  2. From there, navigate to **Actions > Flows**.
  3. Under the available options, choose **Pre User Registration**
  4. Here is where we can set an Action to be done every time a user tries to register for an account. Click the **+** button beside ```Add Action```.
  5. We're going to be creating our own Action, so choose ```Build Custom```.
  6. Under Name, choose something similar to ```University Email Whitelisting```, then continue to ```Create```.
  7. Replace the ```exports.onExecutePreUserRegistration``` code with the code given at ```auth0-scripts/emailFiltering```.
  8. Set the parameter of the ```endsWith``` method to domain of your university email **without** the @ symbol.
  9. Set the comparison operator of ```event.client.name``` to the name of the authenication you set for your application as it appears on your dashboard.
  10. Click ```Save Draft```, then ```Deploy```.
  11. Head back to the **Pre User Registration** page, and click the ```Custom``` tab. You should be able to see the Action you just created.
  12. Simply click and drag the Action between ```Start``` and ```Complete```, and the Flow will be created! (Make sure to click ```Apply``` at the top so changes are saved).
- While not an ideal solution, this will prevent non-university emails from registering by kicking them out.
Your Flow shuld look like this:

![image](https://user-images.githubusercontent.com/104329626/225748854-91935608-b74d-4768-9440-2ecbb19a0dbe.png)



## Connecting Auth0 with MongoDB

- When a new account is created, we need to be able to add the user into the MongoB server collection.
- Fortunately, we can use Flows to add this as well.
  1. To start, head to **Actions > Flows**.
  2. Choose **Pre User Registration** from the list of options.
  3. Click the **+** button, and choose **Build Custom**.
  4. Under Name, choose a name similar to **MongoDB User Integrations**.
  5. You will see a small in-browser IDE where your code will be housed.
  6. In order to implement our function, we first need to set a secret that will house our MongoDB url.
  7. On the left side of the IDE, click the key icon, and click ```Add Secret```.
  8. Set the key to your choice, and the value to your MongoDB URI.
  9. Your secret has now been set, and will be accessed via ```event.secrets```.
  10. Next, we will add the ```mongodb``` JS module to the Action.
  11. Click the third icon on the left of the IDE, then ```Add Dependency```.
  12. Under name, choose ```mongodb```.
  13. This project uses 4.13.0 at the moment. You can use more recent versions or the latest versions, though be aware that syntax for the code may be different. Set the Version, then click ```Create```.
  14. We're ready to include the code now! Replace the ```onExecutePreUserRegistration``` function with the code in ```auth0-scripts/serverPreparation.js```.
  15. Set the ```url``` to the name of the secret for your MongoDB url, if it is not ```ATLASURI```.
  16. Change the parameter of ```client.db``` to the name of the database you created on MongoDB.
  17. Click ```Save Draft```, then ```Deploy``` at the top right.
  18. Your new Action should be saved! Head back to **Actions > Flows > Pre User Registration**.
  19. Go to the **Custom** tab, and click and drag your Action between ```Start``` and ```Complete```.
    - If you set email whitelisting via Actions, ensure that your Action is placed **after** the whitelisting Action, but **before** ```Complete```. This will ensure a user is only added to the server after it's confirmed that the user is whitelisted.
    - Example:
    ![image](https://user-images.githubusercontent.com/104329626/225756236-b2201530-c962-4312-a9e6-e25f2713d17f.png)
    
## MongoDB Aggregations [Temporary Fix]
- While implementing this application, aggregating via Netlify Serverless Functions seemed to not reflect the aggreagations to the server. A temporary fix is using a mix of PyMongo and Heroku to securely watch for server changes and update the serer.
- A future version of Priam would be using Netlify Functions instead.
  1. If you have the project downloaded already, navigate to the ```aggregations``` folder.
  2. Install ```heroku``` globally either using
    - NPM: ```npm install -g heroku```
    - Yarn: ```yarn global add heroku```
  3. Additionally, ensure that you have git installed:
    - You can do this using similar NPM and Yarn commands, though you can also head over to [Git's home page](https://git-scm.com/downloads) and install it directly.
  5. Run ```heroku login``` to sign in. If you do not have an account, follow the steps to create one.
  6. After logging in, to deploy the code, first initialize a local repository with ```git init```.
  7. Add the files to the repository by running ```git add .``` (Note the period).
  8. Commit the files to the primary branch of the repository by running ```git commit -m "Initial code"```.
  9. Finally, send the files to the Heroku using ```git push heroku main```.
    - If you get an error whle running this code, it's possible you have the main branch set to the default "master". Try ```git push heroku master``` instead.
  10. Follow the prompts to setting a new site.
  11. Once everything pushes correctly, follow the instructions at [this page](https://devcenter.heroku.com/articles/config-vars) for setting the ```ATLAS_URI``` variable to your MongoDB url.
  12. Run ```heroku ps:scale worker=1``` to set a single worker that will check for changes to the MongoDB server and aggregate.
  13. Success! Your aggregations should now be automatic, and running.






