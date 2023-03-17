import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import{Fade} from '@mui/material'
import{Favorite} from '@mui/icons-material'
import {FavoriteBorder} from '@mui/icons-material'
import {List,Typography,Modal,Backdrop, CircularProgress, Grid,Chip,Tooltip,Card,CardHeader,CardContent,CardActions,ListItem,ListItemIcon,Paper,ListItemText,Checkbox,Button,TextField,Input, createTheme, ThemeProvider} from '@mui/material'
import {useSnackbar} from 'notistack'
import {Box} from '@mui/system'
import TransferList from './TransferList'
import DarkTheme from '../themes/DarkTheme'
import {BrowserView,MobileView} from 'react-device-detect';
import TitleIcon from '@mui/icons-material/Title';
import ChatIcon from '@mui/icons-material/Chat';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

//For styling purposes, this is a custom stepper that will essentially guide the user through the steps for making a post. 
//Most of these concepts take a bit to explain, so please see the Stepper class in React's website for more information.

const WhiteOutlinedTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};
//Use the below objects for changing the linear gradient of the Stepper for your use case.
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 136deg, #0429fdba 0%, #193A6F 50%, blue 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 136deg, #0429fdba 0%, #193A6F 50%, blue 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, #0429fdba 0%, #193A6F 50%, blue 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
    'linear-gradient( 136deg, #0429fdba 0%, #193A6F 50%, blue 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <TitleIcon />,
    2: <ChatIcon />,
    3: <TurnedInNotIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};


const  CustomizedSteppers = ({allTags,tagCategories,token}) => {
    const staticTheme = DarkTheme()
    const theme = createTheme(DarkTheme())
    const [displayOpen, setDisplayOpen] = React.useState(false);
    const [loadingProgress, setLoadingProgress] = React.useState('transparent');
    const [currentPage, setCurrentPage] = React.useState(0);
    const [title, setTitle] = React.useState("");
    const [checked,setChecked] = React.useState([])
    const [description, setDescription] = React.useState("");
    const [tags, setTags] = React.useState(allTags);
    const [categories, setCategories] = React.useState(tagCategories);
    const style = {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'fit-content',
      bgcolor: 'white',
      border: '2px solid #000',
      borderRadius: '14px',
      boxShadow: 24,
      p: 4,
      oveflow:'auto'
    };
    const handleClose = () => setDisplayOpen(false);
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = checked;
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      localStorage.setItem("chosen-tags",JSON.stringify(newChecked))
      setChecked(newChecked);
    };
    const {enqueueSnackbar} = useSnackbar();
    const titleInput = (event) =>
    {
        setTitle(event.target.value)
    }
    const descriptionInput = (event) =>
    {
        setDescription(event.target.value)
    }
    const checkTitle = () =>
    {
        if(title.replace(" ","").length < 5)
        {
            snackbarMessage("Title must be at least 5 characters long","error")
            return
        }
        setCurrentPage(1)
    }
    const checkDescription = () =>
    {
        if(description.replace(" ","").length < 20)
        {
            snackbarMessage("Description must be at least 20 characters long","error")
            return
        }
        setCurrentPage(2)
    }
    const checkTags = () =>
    {
        const tags = JSON.parse(localStorage.getItem("chosen-tags"))
        if(tags===null || tags.length===0 || tags.length===undefined)
        {
            snackbarMessage("You must have at least one tag","error")
            return
        }
        snackbarMessage("This will be where a modal will show with what the post will look like.","info")
        setDisplayOpen(true)
    }
    const submitPost = () =>
    {
      setLoadingProgress("orange")
      setDisplayOpen(false)
      const tags = JSON.parse(localStorage.getItem("chosen-tags"))
      const postObject = {title:title,description:description,tags:tags,token:token}
      fetch("https://priam-connections.netlify.app/.netlify/functions/post",
      {
        method:"POST",
        headers:{
          "Content-Type":"text/plain"
        },
        body:JSON.stringify(postObject)
      }).then(res=>res.json()).then(data=>
        {
          setLoadingProgress("transparent")
          if(data.acknowledged===false)
          {
            snackbarMessage("Post Submission Failed","error")
            return
          }
          else if(data.acknowledged==="Profanity detected")
          {
            snackbarMessage("Profanity detected in post. Revise and try again.","error")
            return
          }
          else if(data.acknowledged==="Invalid tag")
          {
            snackbarMessage("Invalid tag detected. Revise and try again.","error")
            return
          }
          snackbarMessage("Post Submitted Successfully","success")
          /*setTimeout(() => {
            window.location.reload()
          }, 2000);*/
        })
    }
    const snackbarMessage = (message,variant) =>
    {
      enqueueSnackbar(message, { variant: variant })
    }
    const steps = ["Choose a Fitting Title", "Make Your Post Content!", "Tags!"];

    const renderListItems = () => {
      switch (currentPage) {
        //First Step
        case 0:
          return (
            <div>
              <WhiteOutlinedTextField value ={title} InputLabelProps={{sx: {color: 'white'}}} sx={{input:{color:'white'},borderColor:'white'}} id="title" onChange={(event)=>{titleInput(event)}} label="Title" variant="outlined" />
              <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button className="align-right" variant="contained" onClick={checkTitle}>Next</Button>
              </Box>
            </div>
          );
        case 1:
          //Second Step
          return (
            <div>
                <Input
                    value={description}
                    id="description"
                    placeholder="Description"
                    multiline
                    rows={8}
                    fullWidth
                    margin="dense"
                    onChange={descriptionInput}
                    variant="outlined"
                    sx={{
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                        },
                        '& .MuiInputLabel-outlined': {
                        color: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                        },
                        '&.Mui-focused .MuiInputLabel-outlined': {
                        color: 'white',
                        },
                    }}
                />
              <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button className="align-right" variant="contained" onClick={checkDescription}>Next</Button>
              </Box>
              <Box m={1} display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button className="align-left" variant="contained" onClick={() => setCurrentPage(0)}>Back</Button>
              </Box>
            </div>
          );
        case 2:
          //Third Step
          //snackbarMessage("Tags are required for making any post. We have more than enough for you to categorize your post!","info")
          const postTags = JSON.parse(localStorage.getItem("chosen-tags"))
          var displayTags = undefined
          if(postTags!==undefined||postTags!==null)
          {
            displayTags = postTags?.map((tag) =>{
              return(
                <Grid key = {tag} item xs ={12/postTags.length}>
                  <Tooltip enterTouchDelay={0} title={<h2 style={{ color: "lightblue" }}>{tag}</h2>} placement="top">
                    <Chip label={tag}>{tag}</Chip>
                  </Tooltip>
                </Grid>
              )
            })
          }
          else
          {
            displayTags = <Grid item xs={6}>
            <Tooltip enterTouchDelay={0} title={<h2 style={{ color: "lightblue" }}>No Tags</h2>} placement="top">
              <Chip label="No Tags"></Chip>
            </Tooltip>
          </Grid>
          }
          return (
            <div>
            <CircularProgress sx={{position:'fixed', left:"50%",top:"50%",color:loadingProgress}} />
            <Modal sx={{width:"100%",height:"100%"}} aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={displayOpen} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
                <Fade in={displayOpen}>
                  <Box sx={style}>
                    <br></br>
                    <Typography  sx={{color:'black'}} variant="h" component="h5">Everything look good?</Typography>
                    <br></br>
                    <div>
                      <ThemeProvider theme={theme}>
                        <Card className = "searchCard">
                          <Grid container spacing={2}>
                            {displayTags}
                          </Grid>
                          <CardHeader sx={{color:'white'}} title={<h4 style={{fontWeight:"bold",bgColor:"#81adee",textAlign:'center'}}>{title}</h4>}/>
                          <CardContent>
                            <Typography style={{fontSize:'1.75vh'}}>{description}</Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <Checkbox name="checkedH" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                            <Typography>0</Typography>
                          </CardActions>
                        </Card>
                      </ThemeProvider>
                    </div>
                    <br></br>
                    <Button onClick={submitPost} variant="contained">Submit!</Button>
                  </Box>
                </Fade>
            </Modal>
            <BrowserView>
                <TransferList/>
            </BrowserView>
            <MobileView>
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
            </MobileView>
            <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button className="align-right" variant="contained" onClick = {checkTags}>Submit</Button>
            </Box>
            <Box m={1} display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button className="align-left" variant="contained" onClick={() => setCurrentPage(1)}>Back</Button>
            </Box>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ width: "100%" }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={currentPage}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
                <StepLabel
                StepIconComponent={ColorlibStepIcon}
                disabletypography={"true"}
                >
                <div style={{ color: "#fff" }}>{label}</div>
                </StepLabel>
            </Step>
          ))}
        </Stepper>
        <List sx={{ width: "100%" }}>{renderListItems()}</List>
      </Stack>
    </ThemeProvider>
    );
  }

  export default CustomizedSteppers;
