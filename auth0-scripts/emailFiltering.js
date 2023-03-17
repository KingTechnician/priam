exports.onExecutePreUserRegistration = async (event, api) => {
  if(event.user.email && event?.client?.name && event.user.email.endsWith("domain.edu") && event.client.name==="Application Name")
  {
    api.access.deny("404 - Not Allowed","Access is not allowed.");
  }
};