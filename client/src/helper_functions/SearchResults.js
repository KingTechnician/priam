import React, { useState } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '..//helper_components/ResponsiveAppBar';
import SpinnerMenu from '../helper_components/SpinnerMenu';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import {FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import {Tooltip,Chip} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LightTheme from '../themes/LightTheme';
import DarkTheme from '../themes/DarkTheme';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import cohesiveSort from '../helper_functions/PostSorting';
import {Pagination} from '@mui/lab'
import SearchResults from './SearchResults';
import {FavoriteBorder,Favorite} from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton'
import CustomCheckbox from '../helper_components/CustomCheckbox';


function handleUpVote(postID,user,token)
{
  fetch('https://priam-connections.netlify.app/.netlify/functions/checkvote',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify({email:user.email,identification:postID,token:token})
  })
}

export default function Results(posts,theme,staticTheme,onlineVotes,user,token)
{
    if(user===undefined)
    {
      user = JSON.parse(localStorage.getItem("user"))
    }
    const postBoxes = posts.map((post) => {
      
    const handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
    }
        var postTags = post.tags
        postTags = [...new Set(postTags)]
        post.tags = postTags
        if(post.tags!==undefined || post.tags!==null)
        {
          postTags = post.tags?.map((tag) => {
            return (
              <Grid key={tag} item xs={12/post.tags.length}>
                <Tooltip enterTouchDelay={0} title={<h2 style={{ color: "lightblue" }}>{tag}</h2>} placement="top">
                  <Chip label={tag}></Chip>
                </Tooltip>
              </Grid>
            )
          })
        }
        else
        {
          postTags = <Grid item xs={6}>
                <Tooltip enterTouchDelay={0} title={<h2 style={{ color: "lightblue" }}>No Tags</h2>} placement="top">
                  <Chip label="No Tags"></Chip>
                </Tooltip>
              </Grid>
        }
        return (
          <div>
          <ThemeProvider theme={theme}>
            <Card className="searchCard" >
              <Grid container spacing={2}>
                {postTags}
              </Grid>
              <CardHeader
                  sx={{color:'white'}}
                title={<h4 style={{fontWeight:"bold", bgColor:'#81adee',textAlign:'center'}}>{post.title}</h4>}
                subheader={post.date}
              />
              <CardContent>
                <Typography style={{fontSize:'1.75vh'}}>
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <CustomCheckbox user={user} id={post.identification} name="checkedH" icon={<FavoriteBorder/>} token={token} checkedIcon={<Favorite/>} />
                <Typography>{post.votes||0}</Typography>
                <Typography style={{fontSize:'1.75vh'}} sx={{width:'100%'}}>ID: {post.identification}</Typography>
              </CardActions>
            </Card>
          </ThemeProvider>
          <br></br>
          </div>
          );
        });
    return postBoxes;
}