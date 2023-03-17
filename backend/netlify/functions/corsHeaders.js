function getCorsHeaders()
{
    //process.env.CLIENT_URL
    const corsHeader = {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true,
        "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":"content-type"
    }
    return corsHeader
}

module.exports = {getCorsHeaders}