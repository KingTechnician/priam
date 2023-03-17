const mongodb = require("mongodb")

const {validateToken} = require('./testToken.js')
const {getCorsHeaders} = require('./corsHeaders.js')


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
    const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})
    try
    {
        var result = undefined
        await client.connect()
        const db = client.db('changeWorthy')
        const col = db.collection('users')
        const myDoc = await col.find({email:email
        }).toArray().then((results) => result=results)
        return {
            statusCode:200,
            headers:corsHeader,
            body:JSON.stringify(myDoc)
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