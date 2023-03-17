
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import LogoutIcon from '@mui/icons-material/Logout';
import {withAuth0} from '@auth0/auth0-react';

class SpinnerMenu extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      isOpen:false,
      selected:0,
    }
  }
  handleCurrentRefChange = (newRef) => 
  {
    this.props.onCurrentRefChange(newRef);
  }
  navigateToPage=  (pageName) => 
    {
      const navigate = this.props.navigate;
      navigate(pageName)
    }
  render()
  {
    const { logout } = this.props.auth0;
    const handleOpen = () => {this.setState({isOpen:true})};
    const handleClose = () => {this.setState({isOpen:false})};
    return (
      <SpeedDial
        ariaLabel="SpeedDial example"
        sx={{ position: 'fixed', width: 'fit-content', height: 'fit-content', bottom: 0, right: 0 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={this.props.isOpen}
        FabProps={{
          sx: {
            bgcolor: '#193A6F',
            transition: 'all 0.6s'
          }
        }}
      >
        <SpeedDialAction
          key="Home"
          icon={<HomeIcon />}
          tooltipTitle="Home"
          tooltipOpen
          onClick={() => this.navigateToPage('/dashboard')}
        />
        <SpeedDialAction
          key="About"
          icon={<InfoIcon />}
          tooltipTitle="About"
          tooltipOpen
          onClick={() => this.navigateToPage('/dashboard/about')}
        />
        <SpeedDialAction
          key="Search"
          icon={<SearchIcon />}
          tooltipTitle="Search"
          tooltipOpen
          onClick={() => {this.navigateToPage('/dashboard/search')}}
        />
        <SpeedDialAction
          key="New"
          icon={<FiberNewIcon />}
          tooltipTitle="New"
          tooltipOpen
          onClick={() => {this.navigateToPage('/dashboard/newpost')}}
        />
        <SpeedDialAction
          key="Logout"
          icon={<LogoutIcon />}
          tooltipTitle="Logout"
          tooltipOpen
          onClick={() => { logout({ returnTo: window.location.origin }) }}
        />
      </SpeedDial>
    )
  }
}

export default withAuth0(SpinnerMenu);