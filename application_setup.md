# Setting up the Application

Note: We will be setting this under the presmise that there will be two Netlify sites: one that hosts the client application and the other that serves custom-made REST API to make calls to the MongoDB server.

## Creating A Netlify Account and Netlify Sites

### 1. Creating a Netlify Account and First Site
- Head to the [Welcome to Netlify | Netlify](https://app.netlify.com/signup) page and go through the process of creating an account.
- I **heavily** recommend using GitHub to create your account. This will help with integrating repositories to deploy directly.
- Fortunately, Netlify has wonderful documentation on their sign up process, so just take a look at [A Step-by-Step Guide: Deploying on Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
- In Step 5, ensure that the Public directory directs to build (where the public build files are contained).
- The site you have just created will serve as the client application where the React interface will be hosted. Next, we're going to initialize the serverless functions REST API.

### 2. Creating the Second Site and Storing Serverless Functions
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
  6. Curious about how the ```netlify.toml``` works and how to add new endpoints? Check out the [Intro to Serverless Functions | Netlify](https://www.netlify.com/blog/intro-to-serverless-functions/) for a more in-depth understanding.
  7. However, the code won't work *quite* yet. There are still some environmental variables we need to set up.

### 3. Backend side - Setting up Environmental Variables
- In the directory ```backend/netlify/functions```, you'll note that there are two environmental variables called: ```ATLASURI``` and ```CLIENT_URL```.
- Normally, we would use a .env file, and we can technically do this if we are uploading manually, but **not** if uploading with Github.
- To make things simpler and more secure, we can set environmental variables directly to our Netlify site. 
- Head to the main dashboard of Netlify and navigate to your site.
- Just under where you see the URL, deploy location and last published date, click the ```Site Settings``` button.
- Navigate to ```Environmental variables``` from the left menu.
- From there, you can add the environmental variables.

### 4. Adding ATLAS_URI
- This assumes that you went through all of the steps at pre_setup.md. If you have not followed those steps, head there first before continuing.
- Sign in to MongoDB under the same acocunt you used before. Find your cluster, until you have a display as shown below:

![Screenshot 2023-03-15 150111](https://user-images.githubusercontent.com/104329626/225415617-49ee4e75-d399-4998-8d8a-7f97541c979b.png)
