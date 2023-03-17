

const {validateToken} = require('./testToken.js')
const {getCorsHeaders} = require('./corsHeaders.js')
const corsHeader = getCorsHeaders()

exports.handler = async function(event,context)
{
    context.callbacksWaitForEmptyEventLoop = false
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
    return {
        statusCode:200,
        headers:corsHeader,
        body:JSON.stringify({"Response":"Doing a good job"})
    }
}