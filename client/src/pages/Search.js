import React, { useState} from 'react';
import { Auth0Provider, withAuth0} from '@auth0/auth0-react';
import ResponsiveAppBar from '../helper_components/ResponsiveAppBar';
import SpinnerMenu from '../helper_components/SpinnerMenu';
import { Box, Button, ListItem, TextField, Typography } from '@mui/material';
import {FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LightTheme from '../themes/LightTheme';
import DarkTheme from '../themes/DarkTheme';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import cohesiveSort from '../helper_functions/PostSorting';
import {Pagination} from '@mui/material'
import Results from '../helper_functions/SearchResults';
import Checkbox from '@mui/material/Checkbox';
import {List} from '@mui/material';
import {ListItemIcon,ListItemText} from '@mui/material';
import {Paper} from '@mui/material';
import {CircularProgress} from '@mui/material';
import {useSnackbar} from 'notistack';

function createChunks(posts,chunkSize,theme,staticTheme,onlineVotes,user,token)
{
  var chunks = []
  for(var i = 0; i<posts.length;i+=chunkSize)
  {
    const chunk = posts.slice(i,i+chunkSize);
    if(user!==undefined)
    {
      localStorage.setItem("user",JSON.stringify(user))
    }
    const renderChunk = Results(chunk,theme,staticTheme,onlineVotes,user,token)
    chunks.push(renderChunk)
  }
  return chunks
}



const Search = ({isLoading,loginWithRedirect,isAuthenticated,currentUser,token,navigate,onCurrentRefChange,currentRef}) =>
{
  if(!isAuthenticated)
  {
    loginWithRedirect()
  }
  const {enqueueSnackbar} = useSnackbar()
  const [user,setUser] = useState(currentUser)
  const [onlineVotes,setOnlineVotes] = useState([])
  const snackbarMessage = (message,variant) =>
  {
    enqueueSnackbar(message, { variant: variant })
  }
  const [tagCategories, setTagCategories] = useState([
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
])
  const setIndividualTags = () =>
  {
    var individualTags = []
    tagCategories.forEach((tag) =>
    {
      individualTags = individualTags.concat(tag.subCategories)
    })
    return individualTags
  }
  const [tags, setTags] = useState(setIndividualTags)

  
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'white',
    border: '2px solid #000',
    borderRadius: '14px',
    boxShadow: 24,
    p: 4,
    oveflow:'auto'
  };  
  const staticTheme = DarkTheme()
  const theme = createTheme(DarkTheme())
  const [posts,setPosts] = useState([
    {
      title: 'Ready to Search?',
      description: 'Use the top search bar to find posts!',
      tags: ['Suggestion'],
    }
  ]);
  const [query,setQuery] = useState(' ');
  const [category,setCategory] = useState('title');
  const documentInput = (q,c) => 
  {
    setQuery(q);
    setCategory(c);
  } 
  const [chunks,setChunks] = useState(createChunks(posts,5,theme,staticTheme,onlineVotes,user,token))
  const [pageNumber,setPageNumber] = useState(0)
  const [checked,setChecked] = useState([])
  var page = chunks[pageNumber]
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = checked;
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const [loadingProgress, setLoadingProgress] = useState('transparent')
  const searchPosts = (checked) =>
  {
    setLoadingProgress('orange')
    if(!query||!posts)
    {
      return;
    }
    fetch("https://priam-connections.netlify.app/.netlify/functions/search",
    {
      method:'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body:JSON.stringify({
        query:query,
        category:category,
        token:token
      })
    })
    .then (res => res.json())
    .then((data)=> 
    {
      var filterData = []
      if(checked.length>0)
      {
        for(var i = 0; i<data.length;i++)
        {
          var post = data[i]
          var tags = post.tags
          var tagCheck = false
          for(var j = 0; j<tags.length;j++)
          {
            if(checked.includes(tags[j]))
            {
              tagCheck = true
            }
          }
          if(tagCheck)
          {
            filterData.push(post)
          }
        }
        setPosts(filterData)
        setChunks(createChunks(filterData,5,theme,staticTheme,onlineVotes,user,token))
      }
      else
      {
        setPosts(data)
        setChunks(createChunks(data,5,theme,staticTheme,onlineVotes,user,token))
      }
      setPageNumber(0)
      setLoadingProgress('transparent')
      snackbarMessage("Search Complete!","success")
    })
  };
  const [open, setOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleTagOpen = () => setTagOpen(true);
  const handleTagClose = () => setTagOpen(false);
  const handleClose = () => setOpen(false);
  const handlePagination = (event,value) => 
  {
    setPageNumber(value-1)
  }
  const [sort,setSort] = useState('date-ascend')
  const handleSort = () =>
  {
    setPosts(cohesiveSort(sort,posts))
    setChunks(createChunks(posts,5,theme,staticTheme,onlineVotes,user,token))
    snackbarMessage("Sorted!","success")
    handleClose()
  }
  const handleChange = (event) => 
  {
    setCategory(event.target.value);
    event.target.label = event.target.value;
  }
  const handleSortChoice = (choice) =>
  {
    setSort(choice)
  }
  const applyFilter = () =>
  {
    if(checked.length===0)
    {
      return;
    }
    else
    {
      var filteredPosts = []
      posts.forEach((post)=>
      {
        var tags = post.tags
        tags.forEach((tag)=>
        {
          if(checked.includes(tag))
          {
            filteredPosts.push(post)
          }
        })
      })
      setPosts(filteredPosts)
      setChunks(createChunks(filteredPosts,5,theme,staticTheme,onlineVotes,user,token))
      setPageNumber(0)
      handleTagClose()
      snackbarMessage("Filter(s) applied!","info")
    }
  }
  const clearSelectionClose = () =>
  {
    setChecked([])
    handleTagClose()
    snackbarMessage("All filters cleared","info")
  }
  return (
    <Auth0Provider
    domain="kingtechnician.us.auth0.com"
    clientId="xTbGmROcQrGne2nH7AAEDu1C3E8hKeBW"
    >
      <ThemeProvider theme={theme}>
      <ResponsiveAppBar token={token} user={currentUser} isLoading={isLoading} isAuthenticated={isAuthenticated}/>
    <div className = "App">
      <header className = "homePage App-inside-header">
        <br></br>
        <div className ="searchBox">
          <TextField value={query} sx= {{align:'left',width:'65vw',input:{color:'black'}}} id="search" label="Search" variant="filled" onChange={(e) => documentInput(e.target.value,category)} />
          <Select sx={{width:'20vw',label:{color:'black'}}} labelId="searchSelect" id="searchSelect" value={category} label="Category" onChange={handleChange}>
            <MenuItem value={'title'}>Title</MenuItem>
            <MenuItem value={'description'}>Description</MenuItem>
          </Select>
        </div>
        <br></br>
        <Button variant="contained" onClick={()=>
        {
          searchPosts(checked)}
        }
        >Search</Button>
        <br></br>
        <Button variant="contained" onClick={handleOpen}>Sort</Button>
        <br></br>
        <Button variant="contained" onClick={handleTagOpen}>Filter by Tags</Button>

        <CircularProgress hidden={true} sx={{position:'fixed', left:"50%",top:"50%", color:loadingProgress}} />
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <br></br>
            <br></br>
            <Typography  sx={{color:'black'}} variant="h" component="h5">Sort By:</Typography>
            <br></br>
            <FormControl sx={{width:'100%'}}>
              <Select value={sort} variant="outlined" size="small" fullWidth>
                <MenuItem value={"date-ascend"} onClick={()=>{handleSortChoice("date-ascend")}}>Date (Ascending)</MenuItem>
                <MenuItem value={"date-descend"} onClick={()=>{handleSortChoice("date-descend")}}>Date (Descending)</MenuItem>
                <MenuItem value={"votes-ascend"} onClick={()=>{handleSortChoice("votes-ascend")}}>Upvotes (Ascending)</MenuItem>
                <MenuItem value={"votes-descend"} onClick={()=>{handleSortChoice("votes-descend")}}>Upvotes (Descending)</MenuItem>
              </Select>
            </FormControl>
            <br></br>
            <Button variant="contained" onClick={handleSort}>Apply</Button>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="tag-modal-title"
        aria-describedby="tag-modal-description"
        open={tagOpen}
        onClose={handleTagClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={tagOpen}>
          <Box sx={style}>
            <Typography sx={{color:'black'}} variant="h" component="h5">Filter by Tags:</Typography>
            <List>
              <Paper style={{maxHeight:200,overflow:'auto'}}>
              {tags.map((tag) => {
                const labelId = `checkbox-list-label-${tag}`;

                return (
                  <ListItem key={tag} role={undefined} dense button onClick={handleToggle(tag)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        defaultChecked={checked.includes(tag)}
                        />
                    </ListItemIcon>
                    <ListItemText style={{color:'black'}} id={labelId} disableTypography primary={<Typography sx={{color:'black'}}>{tag}</Typography>} />
                  </ListItem>
                );})}
              </Paper>
            </List>
            <Button variant="contained" onClick={applyFilter}>Apply</Button>
            <Button variant="contained" onClick={clearSelectionClose}>Clear Selections</Button>
            <br></br>
          </Box>
        </Fade>
      </Modal>

        <br></br>
        <br></br>
        {page}
        <Pagination color="primary" defaultPage={pageNumber} sx={staticTheme.PaginationStyle} onChange={handlePagination} count={Math.ceil(posts.length/5)}/>
        <SpinnerMenu navigate={navigate} onCurrentRefChange={onCurrentRefChange} currentRef={currentRef}/>
      </header>
    </div>
    </ThemeProvider>
    </Auth0Provider>
  )
}

export default withAuth0(Search);