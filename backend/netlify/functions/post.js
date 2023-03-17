const {validateToken} = require('./testToken.js')
const {getCorsHeaders} = require('./corsHeaders.js')
const mongodb = require("mongodb")
const filter = require("leo-profanity")
const MongoClient = mongodb.MongoClient
const url = process.env.ATLASURI
const corsHeader = getCorsHeaders()
const currentTags = [ "College of Agriculture","Reginald F. Lewis College of Business","College of Education","College of Engineering and Technology","College of Humanities and Social Sciences","College of Natural and Health Sciences","Hunter McDaniel Building","Engineering and Technology Building","Lula Johnson Hall","Freshman Housing","Upperclass Housing","Branch Hall","Otelia Howard Hall","Lucretia Campbell Hall","Langston Hall","Seward Hall","Quad I","Williams Hall","Gateway Hall","Moore Hall","Quad II","Whiting Hall"]
function generateRandomID() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const firstChar = alphabet[Math.floor(Math.random() * alphabet.length)];
    const numbers = "0123456789";
    let randomNumbers = "";
    
    for (let i = 0; i < 16; i++) {
      randomNumbers += numbers[Math.floor(Math.random() * numbers.length)];
    }
    
    return `${firstChar}${randomNumbers}`;
  }
  

exports.handler = async function(event,context)
{
    context.callbackWaitsForEmptyEventLoop = false
    const subject= event.queryStringParameters.name || 'World'
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
        const title = JSON.parse(event.body).title
        const description = JSON.parse(event.body).description
        const filteredTitle = filter.clean(title)
        const filteredDescription = filter.clean(description)
        if(filteredTitle !== title || filteredDescription !== description)
        {
            return {
                statusCode:400,
                headers:corsHeader,
                body:JSON.stringify({acknowledged:"Profanity detected"})
            }
        }
        const tags = JSON.parse(event.body).tags
        for (var i = 0; i < tags.length; i++)
        {
            if(!currentTags.includes(tags[i]))
            {
                return {
                    statusCode:400,
                    headers:corsHeader,
                    body:JSON.stringify({acknowledged:"Invalid tag"})
                }
            }
        }
        //get the current date in month,day, year, hour, minute, and second and store as a formatted string
        const date = new Date()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const dateString = month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second
        const db = client.db('changeWorthy')
        const col = db.collection('onlinePosts')
        const myDoc = await col.insertOne({title:title,description:description,tags:tags,date:dateString,identification:generateRandomID()})
        return {
            statusCode:200,
            headers:{
                "content-type":"application/json",
                "Access-Control-Allow-Origin":process.env.CLIENT_URL,
                "Access-Control-Allow-Credentials":true,
                "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
            },
            body:JSON.stringify(myDoc)
        }
    }
    catch(e)
    {
        return {
            headers:{
                "content-type":"application/json",
                "Access-Control-Allow-Origin":process.env.CLIENT_URL,
                "Access-Control-Allow-Credentials":true,
                "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers":"content-type"
            },
            statusCode:500,
            body:JSON.stringify({msg:e.message})
        }
    }
    finally
    {
        await client.close()
    }
}