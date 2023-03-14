# Pre Setup 

### Note

- These instructions assume that you want to use Auth0 for authentication, and MongoDB for managing the server. If these tools are **not** what you want to use, you will have to create something for your use case. Bear in mind that using anything other than Auth0 and MongoDB may require you to change the frontend or backend code.
## Creating Accounts and Getting Set Up

Authentication is done using Auth0, a reliable and secure platform for authentication and managing users across numerous platforms.

### Create Auth0 Account and Set Up Authentication
 1. To get started with an account, open the [Sign Up - Auth0](https://auth0.com/signup) page in a new tab and go through the process of creating an account. I recommend using your GitHub account to do this.
 2. Auth0 may guide you through creating an application for authentication. If it does not, you should be directed to the Dashboard and see this left menu:
 ![image](https://user-images.githubusercontent.com/104329626/225099882-734b7ec8-0527-49be-996e-b4cc9782cc66.png)
 3. Navigate to Applications and click the ```Create Applications``` button at the top right of the screen.
![image](https://user-images.githubusercontent.com/104329626/225100927-8360eac6-df8f-4c2c-903e-f72b8f07f740.png)
 4. Choose **Single Page Web Applications**.
 5. Your authentication should be created!
 
 #### Some Additional Information
  - Every authentication will have a Client Domain and Client ID. These credentials are secret - they are and should be publicly available (as it composes the URL through which your users sign in). You can comfortably use these credentials in your frontend.
  - Client **Secret**, however, should **never** be used that loosely. If you're following how I implemented the application, though, you won't need to use it anyway.
 
 ### Create MongoDB Account and Set Up Server
 
  #### 1. Create an Account 
   - To get started, create an account with MongoDB using the [Create Account | MongoDB](https://account.mongodb.com/account/register) page.
   - After creating your account and signing in successfully, you should see a Dashboard with an option to build a database, similar to the below screen: 
  ![image](https://user-images.githubusercontent.com/104329626/225132928-67ebb0fc-bdc1-49dc-bf9e-8855499bcc79.png)

  #### 2. Creating the Cluster
   - Select the "Build a Database" button and go through the options to create your database.
   - If you're just testing things out, I recommend using a M0 shared cluster. This will ensure no charges, but still give you a powerful enough environment to store what Priam needs to store. All other settings might be more tailored to your use case. If you don't know what the settings mean, simply use the default.
   
  #### 3. Creating the First Database and First Collection
   - You should be greeted with a screen that will show some user credentials to set up for the server. Follow those instructions, then click the ```Finish & Close ``` button at the bottom of the page. Your database should be created! It will be viewable under **Deployment > Databases**, and will look similar to this:
  
  ![image](https://user-images.githubusercontent.com/104329626/225139397-1c82ccd0-1095-4be8-9c6f-b7ab19590436.png)
   - We're also going to set a collection within the database (this will be necessary later for giving the right permissions of users of your application)
   - 
  

  
  
  #### 4. Create the credentials for a user 
   - Head to **Security > Databases** and you should see the user you just created.
   - However, this user is for you, the admin, and not an average user. A user should not be able to create and delete any databases. We're going to add this user.
   - Right now, you should be on a Database Users tab. Head over to the "Custom Roles" tab.
   - Your screen should look like this:
   ![image](https://user-images.githubusercontent.com/104329626/225137229-fd9b62a3-0d7f-485b-8af5-1e0213f4ebdd.png)
   - Click ``Add New Custom Role```
   - Set the name of the role to something you prefer, or perhaps "priam-user"

   

 



 
