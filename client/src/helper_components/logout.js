import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout'
import SpeedDialAction from '@mui/material/SpeedDialAction';
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <SpeedDialAction
          key="Logout"
          icon={<LogoutIcon />}
          tooltipTitle="Logout"
          tooltipOpen 
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}/>
  );
};

export default LogoutButton;