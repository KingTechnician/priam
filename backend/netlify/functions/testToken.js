
function validateToken(token)
{
  var tokenArray = token.split('.');
  var header = tokenArray[0];
  var payload = tokenArray[1];

  var convertHeader = JSON.parse(Buffer.from(header, 'base64').toString('ascii'));
  var convertPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));

  const trueDomain = "https://kingtechnician.us.auth0.com/";
  const tokenDomain = convertPayload.iss;
  const domainOkay = trueDomain===tokenDomain;
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const tokenActive = currentTime < convertPayload.exp;
  return domainOkay && tokenActive
}

module.exports = {validateToken}