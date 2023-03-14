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
 



 
