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

