import { withAuth0} from "@auth0/auth0-react";
import React from "react";
import {CircularProgress} from '@mui/material'
import {withRouter} from './withRouter'
import { ConnectingAirportsOutlined } from "@mui/icons-material";



class Profile extends React.Component
{
  //Constructor for Profile below. Use this if you would like to customize the properties of the component.
  /*constructor(props)
  {
    super(props)
  }*/

  componentDidMount()
  {
    const user = this.props.user
    const isAuthenticated=  this.props.isAuthenticated
    const isLoading = this.props.isLoading
    //const { user, isAuthenticated, isLoading,getAccessTokenSilently } = this.props.auth0;
    
    if (isLoading) {
      return <CircularProgress style={{'color':'#193A6F'}}/>
    }
    return (
      isAuthenticated && (
          <img style={{borderRadius:40}} width="30%" height="30%" src={user.picture} alt={user.name} />
      )
    );
  }

  render()
  {
    const user = this.props.user
    console.log(this.props.token)
    const isAuthenticated  = this.props.isAuthenticated
    const isLoading = this.props.isLoading
    console.log(this.props.token)
    if(isLoading)
    {
      return <CircularProgress style={{'color':'orange'}}/>
    }
    const url = "https://priam-connections.netlify.app/.netlify/functions/upvotes"
    try
    {
      fetch(url,{headers:{'Content-Type': 'application/json'},method:'POST',body:JSON.stringify({email:user.email,token:this.props.token})}).then(res=>res.json()).then(data=>localStorage.setItem("upvotedPosts",JSON.stringify(data[0].upvotedPosts)))    
    }
    catch(err)
    {
      console.log(err)
    }

    return (
      isAuthenticated && (
          <img style={{borderRadius:40}} width="30%" height="30%" src={user.picture} alt={user.name} />
      )
    );
  }
}


/*const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  localStorage.setItem('user', JSON.stringify(user))
  const navigate = useNavigate()
  if (isLoading) {
    return <CircularProgress style={{'color':'#193A6F'}}/>
  }
  if(!isAuthenticated)
  {
    setTimeout(() => navigate('/'))
  }
  return (
    isAuthenticated && (
        <img style={{borderRadius:40}} width="30%" height="30%" src={user.picture} alt={user.name} />
    )
  );
};

Profile.componentDidMount = handleOnLoad;

*/
export default withAuth0(withRouter(Profile));