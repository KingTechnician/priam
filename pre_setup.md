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
  - Every authentication will have a Client Domain and Client ID. These credentials are **public** - they are and should be publicly available (as it composes the URL through which your users sign in). You can comfortably use these credentials in your frontend.
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
   - Click ```Browse Collections``` to be greeted with a screen that prompt for either test data or entering your own data. We're entering our own data, so select that option.
   - Choose your collection and database names. (Note: You can set these names to anything you would like)
   - After creating them, you should see the database and collection initialized in your server:

   
  ![image](https://user-images.githubusercontent.com/104329626/225146941-eae6c02e-9173-4941-8cc0-2d8941478e1c.png)


  
  
  #### 4. Create the credentials for a user 
   - Head to **Security > Databases** and you should see the admin user you created when you finished creating this account.
   - However, this user is for you, the admin, and not an average user/customer. A user should not be able to create and delete any databases, or change collections. We're going to add a new set of credentials for a user that can only read, write, and watch changes to a specific database.
   - Right now, you should be on a Database Users tab. Head over to the "Custom Roles" tab.
   - Your screen should look like this:
   ![image](https://user-images.githubusercontent.com/104329626/225137229-fd9b62a3-0d7f-485b-8af5-1e0213f4ebdd.png)
   - Click ``Add New Custom Role```
   - Set the name of the role to something you prefer, or perhaps "priam-user"
   - Click the **Action or Role** dropdown and specify the following:
    - Under Collection Actions
      - Select **all** of **Query and Write Actions**.
      - Ignore **Database Management Actions**.
      - Select *all** of Change Stream Actions**.
      - **Leave everything else unchecked.**
   - Under the **Database** field, set it to the exact name of the name of the database you created earlier. (The name of the database, not "Cluster0")
   - Leave Collections blank and save those options.
   Success! You should see a user created with the following display:
   ![image](https://user-images.githubusercontent.com/104329626/225149050-6b1cb2e6-2e58-4c33-bb15-34299d503bca.png)
   
   - Ensure you have above permissions set. Not having these will make certain parts of the code (particularly the backend) not work correctly.


   

 



 
