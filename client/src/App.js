import React, {useEffect, useState,useRef} from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Routes,useNavigate} from 'react-router-dom';
import {useAuth0,Auth0Provider} from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';
import NewPost from './pages/NewPost'
import ResponsiveAppBar from './helper_components/ResponsiveAppBar';
import SpinnerMenu from './helper_components/SpinnerMenu';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import { SnackbarProvider } from 'notistack';
import { withRouter } from './helper_components/withRouter';
import {withSnackbar} from './helper_components/withSnackbar'
import {withAuth0} from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material';







const page  ={
  home:'*',
  dashboard:'/dashboard',
  about:'/dashboard/about',
  search:'/dashboard/search',
  newpost:'/dashboard/newpost',
}


//Landing page for the Priam application. This landing page will simply throw them right into the Login/Register page.
class App extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      open:false,
      selected:0,
      currentRef: "/dashboard"
    }
  }
  handleCurrentRefChange=  (ref) =>
  {
    this.setState({currentRef:ref})
    window.location.href=window.location.origin+ref
  }
  componentDidMount()
  {
  }
  //The audience and scope headers ensure that the user information can be grabbed, along with the profile email.
  render()
  {
    return(
      <Auth0Provider
      domain="kingtechnician.us.auth0.com"
      clientId="xTbGmROcQrGne2nH7AAEDu1C3E8hKeBW"
      authorizationParams={{
        redirect_uri: window.location.origin+'/dashboard',
        audience:"https://kingtechnician.us.auth0.com/api/v2/",
        scope:"read:current_user update:current_user_metadata profile email"
      }}
    >
        <SnackbarProvider maxSnack={1}>
    <Router>
    <Routes>
      <Route path={page.home} element ={<AuthForm navigate={this.props.navigate} onCurrentRefChange={this.handleCurrentRefChange} currentRef={this.state.currentRef}/>} />
    </Routes>
  </Router>
  </SnackbarProvider>
      </Auth0Provider>
    )
  }
}



//Redirection object that will automatically redirect the user to the /dashboard route (which is where they will be prompted to login/signup)
const Redirection = ({isAuthenticated,loginWithRedirect,navigate}) =>
{
  if(!isAuthenticated)
  {
    loginWithRedirect()
  }
  else
  {
    navigate('/dashboard')
  }
}

//The AuthForm will set some important Auth0 variables, and permeate them throughought the rest of the application.
//All of these variables (with the exception of trivial things like upvotes) will be stored in-memory, and inaccessible via localStorage.
const AuthForm = ({ currentRef, onCurrentRefChange }) => {
  const { loginWithRedirect, isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [hasFetchedToken, setHasFetchedToken] = useState(false);
  const timeoutRef = useRef(null);
  //Setting a timeout to redirect the user to the /dashboard route after 5 seconds.
  useEffect(() => {

      timeoutRef.current = setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
      clearTimeout(timeoutRef.current);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentRef, isAuthenticated, navigate]);

  //This useEffect will grab the user's access token, and store it in memory.
  useEffect(() => {
    async function getToken() {
      const thisToken = await getAccessTokenSilently();
      setToken(thisToken);
    }

    if (isAuthenticated && !hasFetchedToken) {
      getToken();
      setHasFetchedToken(true);
    }
  }, [getAccessTokenSilently, isAuthenticated, hasFetchedToken]);
 // Until all necessary variables are grabbed, a short loading screen will appear for the user.
  if (isLoading) {
    return (
      <div className="App">
        <div className="App-header">
          <p>Getting you authenticated...</p>
          <CircularProgress sx={{color:'orange'}} />
        </div>
      </div>
    )
  }

  const dashboardUrl = page.dashboard;
  const aboutUrl = page.about;
  const searchUrl = page.search;
  const newPostUrl = page.newpost;

  return (
    <Routes>
      <Route path={page.home} element={<Redirection isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} navigate={navigate} />}/>
      <Route path={dashboardUrl} element={<Dashboard isLoading={isLoading} loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} navigate={navigate} onCurrentRefChange={onCurrentRefChange} currentRef={currentRef} userInformation={JSON.stringify({user:user})} user={user} token={token} />} />
      <Route path={aboutUrl} element={<About isLoading={isLoading} loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} navigate={navigate} onCurrentRefChange={onCurrentRefChange} currentRef={currentRef} userInformation={JSON.stringify({user:user})} user={user} token={token} />} />
      <Route path={searchUrl} element={<Search isLoading={isLoading} loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} navigate={navigate} onCurrentRefChange={onCurrentRefChange} currentRef={currentRef} userInformation={JSON.stringify({user:user})} currentUser={user} token={token}  />} />
      <Route path={newPostUrl} element={<NewPost isLoading={isLoading} loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} navigate={navigate} onCurrentRefChange={onCurrentRefChange} currentRef={currentRef} userInformation={JSON.stringify({user:user})} user={user} token={token}  />} />
    </Routes>
  );
};


//Simple About page about the purpose of the application (May be removing this page in the future)
class About extends React.Component
{
  render()
  {
    if(!this.props.isAuthenticated)
    {
      this.props.loginWithRedirect()
    }
    return (
      <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT}
      >
        <ResponsiveAppBar token={this.props.token} user={this.props.user} isLoading={this.props.isLoading} isAuthenticated={this.props.isAuthenticated}/>
    <div className = "App">
    <header className = "homePage App-header">
      <br></br>
      <Typography variant="h4" gutterBottom component="div">Priacy, Security, and Usability</Typography>
      <p>As a student at Virginia State University, have you wondered where you might be able to communicate your concerns, feedback, or desires for VSU's continued growth?</p>
      <p>VSU has numerous resources to ensure that greater happens here, but there remains to be a centralized platform for viewing a well-manaed tally of feedback from students.</p>
      <SpinnerMenu navigate={this.props.navigate} onCurrentRefChange={this.handleCurrentRefChange} currentRef={this.props.currentRef}/>
    </header>
  </div>
  </Auth0Provider>
    )
  }
}

export default withSnackbar(withRouter((withAuth0(App))));
