import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';
import '../css/App.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="contained" className="App-button" onClick={loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;