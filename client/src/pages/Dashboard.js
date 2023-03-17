
import React from 'react';
import {Auth0Provider } from '@auth0/auth0-react';
import ResponsiveAppBar from '../helper_components/ResponsiveAppBar';
import SpinnerMenu from '../helper_components/SpinnerMenu';

//Simple Dashboard welcome page. This page might have some more functionality in the future, but for now it is just a welcome page.
class Dashboard extends React.Component
{
  handleCurrentRefChange=(newRef)=>
  {
    this.props.onCurrentRefChange(newRef);
  }
  componentDidMount()
  {
  }
  render()
  {
    console.log("Test")
    console.log(process.env.REACT_APP_AUTH0_DOMAIN)
    console.log(process.env.REACT_APP_AUTH0_CLIENT)
    console.log(process.env.NODE_ENV)
    if(!this.props.isAuthenticated)
    {
      this.props.loginWithRedirect()
    }
    return (
      <Auth0Provider
      domain="kingtechnician.us.auth0.com"
      clientId="xTbGmROcQrGne2nH7AAEDu1C3E8hKeBW"
      >
        <ResponsiveAppBar token={this.props.token} user={this.props.user} isLoading={this.props.isLoading} isAuthenticated={this.props.isAuthenticated}/>
      <div className = "App">
      <header className = "homePage App-header">
        <div className="posts">
        </div>
        <h3>Welcome!</h3>      
        <SpinnerMenu navigate={this.props.navigate} onCurrentRefChange={this.handleCurrentRefChange} currentRef={this.props.currentRef}/>
      </header>
    </div>
    </Auth0Provider>
    )
  }
}



export default Dashboard;