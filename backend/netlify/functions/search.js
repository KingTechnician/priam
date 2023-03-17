const {validateToken} = require('./testToken.js')
const{getCorsHeaders} = require('./corsHeaders.js')
const mongodb = require('mongodb')

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
    const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})
    try
    {
        await client.connect()
        var stringToRegex = (s, m) => (m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/)) ? new RegExp(m[2], m[3].split('').filter((i, p, s) => s.indexOf(i) === p).join('')) : new RegExp(s);
        const query = JSON.parse(event.body).query
        const category = JSON.parse(event.body).category
        const db = client.db('changeWorthy')
        var regex = stringToRegex(`/${query}/i`)
        const col = db.collection('onlinePosts')
        const myDoc = await col.find({
            title:{$regex:regex}
        }).toArray()
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