import {Auth0Provider} from '@auth0/auth0-react';
import {useState} from 'react';
import ResponsiveAppBar from '../helper_components/ResponsiveAppBar';
import SpinnerMenu from '../helper_components/SpinnerMenu';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkTheme from '../themes/DarkTheme'
import LightTheme from '../themes/LightTheme'
import '../css/App.css';
import {isMobile} from 'react-device-detect';
import {withSnackbar} from 'notistack'
import CustomizedSteppers from '../helper_components/PostStepper'


//When this page loads, we grab a JSON that represents all of the possible tags at a university. These tags are then used to populate the tag selection menu in the child classes called below.
//You will have to edit the tagCategories for your use case. The JSON is structured as follows:
//tagCategories is an array of objects. Each object represents a category of tags. Each category has a name, a color, and an array of subcategories.
//The subcategories are the actual tags that will be displayed in the menu. The color is used to color the category name in the menu.
//The JSON below is an example of how the tags are structured at my university. You will have to edit this to fit your use case.
class NewPost extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      open:false,
      selected:0,
      tagCategories:[
        {
            "category":"Departments",
            "color":"#0d3394",
            "subCategories":
            [
                "College of Agriculture",
                "Reginald F. Lewis College of Business",
                "College of Education",
                "College of Engineering and Technology",
                "College of Humanities and Social Sciences",
                "College of Natural and Health Sciences"
            ]
        },
        {
            "category":"Buildings",
            "color":"#94260d",
            "subCategories":["Hunter McDaniel Building","Engineering and Technology Building","Lula Johnson Hall"]
        },
        {
            "category":"Residency",
            "color":"#945e0d",
            "subCategories":
            [
                "Freshman Housing",
                "Upperclass Housing",
                "Branch Hall",
                "Otelia Howard Hall",
                "Lucretia Campbell Hall",
                "Langston Hall",
                "Seward Hall",
                "Quad I",
                "Williams Hall",
                "Gateway Hall",
                "Moore Hall",
                "Quad II",
                "Whiting Hall"
            ]
        }
    ]
    }
  }
  getIndividualTags()
  {
    var individualTags = []
    this.state.tagCategories.forEach((tag) =>
    {
      individualTags = individualTags.concat(tag.subCategories)
    })
    return individualTags
  }
  render()
  {
    if(!this.props.isAuthenticated)
    {
      this.props.loginWithRedirect()
    }
    const staticTheme = DarkTheme()
    const theme = createTheme(DarkTheme())
    return (
      <Auth0Provider
      domain="kingtechnician.us.auth0.com"
      clientId="xTbGmROcQrGne2nH7AAEDu1C3E8hKeBW"
      >
      <ThemeProvider theme={theme}>
      <ResponsiveAppBar token={this.props.token} user={this.props.user} isLoading={this.props.isLoading} isAuthenticated={this.props.isAuthenticated}/>
      <div className="App">
        <div className="App-header">
          <br></br>
          <CustomizedSteppers token={this.props.token} tagCategories={this.state.tagCategories} allTags={this.getIndividualTags()}/>
          <SpinnerMenu navigate={this.props.navigate} token={this.props.token} onCurrentRefChange={this.handleCurrentRefChange} currentRef={this.props.currentRef}/>
        </div>
      </div>
      </ThemeProvider>
      </Auth0Provider>
    )
  }
}
export default withSnackbar(NewPost);