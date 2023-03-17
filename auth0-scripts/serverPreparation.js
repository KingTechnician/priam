
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient


exports.onExecutePostLogin = async (event, api) => 
{
  const url = event.secrets.ATLASURI
  console.log(event.user.email)
  const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})
  try
  {
    await client.connect()

    const db = client.db('database-name')
    const col = db.collection('users')
    const myDocument = await col.find({email:event.user.email}).toArray()
    const notEntered = myDocument===undefined || myDocument.length==0
    if(notEntered)
    {
      const newUser = {email:event.user.email,upvotedPosts:[]}
      col.insertOne(newUser)
    }
    console.log(myDocument)
  }
  catch(e)
  {
    console.log("Oh great.")
  }
};