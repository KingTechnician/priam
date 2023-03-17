const {validateToken} = require('./testToken.js')
const {getCorsHeaders} = require('./corsHeaders.js')
const mongodb = require("mongodb")


const MongoClient = mongodb.MongoClient

const url = process.env.ATLASURI

const corsHeader = getCorsHeaders()


exports.handler = async function(event,context)
{
    context.callbackWaitsForEmptyEventLoop = false
    const subject = event.queryStringParameters.name || 'World'
    const token = JSON.parse(event.body).token
    var condition = undefined
    try
    {
        var condition = await validateToken(token)
    }
    catch(err)
    {
        condition = false
    }
    if(condition === false)
    {
        return {
            statusCode:400,
            headers:corsHeader,
            body:JSON.stringify({acknowledged:"Access Denied"})
        }
    }
    const email = JSON.parse(event.body).email
    const identification = JSON.parse(event.body).identification
    const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})
    try
    {
        var result = undefined
        await client.connect()
        const db = client.db('changeWorthy')
        const col = db.collection('onlinePosts')
        await col.find({identification:identification}).toArray().then((results) => result=results)
        var condition = !result===undefined || !result==null || !result.length==0
        if(condition)
        {
          var user = undefined
          const userCol = db.collection('users')
          await userCol.find({email:email}).toArray().then((results) => user=results[0])
          if(user.upvotedPosts.includes(identification))
          {
            user.upvotedPosts.splice(user.upvotedPosts.indexOf(identification),1)
          }
          else
          {
            user.upvotedPosts.push(identification)
          }
          await userCol.updateOne({email:email},{$set:{upvotedPosts:user.upvotedPosts}})
          return {
            statusCode:200,
            headers:corsHeader,
            body:JSON.stringify({"result":user})
          }
        }
        return {
            statusCode:200,
            headers:corsHeader,
            body:JSON.stringify({"result":result})    
            }
    }
    catch (e)
    {
        return {
            headers:corsHeader,
            statusCode:500,
            body:JSON.stringify({msg:e.message})
        }
    }
    finally
    {
        await client.close()
    }
}