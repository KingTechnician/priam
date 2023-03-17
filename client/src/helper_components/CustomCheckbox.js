import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import {Favorite,FavoriteBorder} from '@mui/icons-material'

//The normal checkbox has to be overidden in order for the upvoting of posts to truly work smoothly. This below function overrides the default functionality.
class CustomCheckbox extends React.Component{
    constructor(props){
        const condition = false
        super(props)
        this.state = {
            checked: condition,
            id: undefined,
        }
        this.toggleCheckbox = this.toggleCheckbox.bind(this)
        this.handleUpVote = this.handleUpVote.bind(this)
    }
    //Remove default code, and replace the onClick with a function that will trigger the checkvote function.
    onClick = (event) =>{
        event.stopPropagation()
        const postID = this.props.id
        const user = this.props.user ||{email:""}
        fetch('https://priam-connections.netlify.app/.netlify/functions/checkvote',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify({email:user.email||"",identification:postID,token:this.props.token})})
        this.toggleCheckbox(user)
    }

    //You can alternatively use this function, which does more of the same as the override above.
    handleUpVote()
    {
        const postID = this.state.id
        const user = this.props.user
        fetch('https://priam-connections.netlify.app/.netlify/functions/checkvote',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify({email:user.email,identification:postID,token:this.props.token})
        
  })
  const url = "https://priam-connections.netlify.app/.netlify/functions/upvotes"
    fetch(url,{headers:{'Content-Type': 'text/plain'},method:'POST',body:JSON.stringify({email:user.email,token:this.props.token})}).then(res=>res.json()).then(data=>localStorage.setItem("upvotedPosts",JSON.stringify(data[0].upvotedPosts)))
}
 
    //When overriding the original checkbox, we also remove the ability for the checkbox to change by default. This function allows the checkbox to change.
    toggleCheckbox() {
        const user = this.props.user
        this.setState((prevState) => ({
            checked: !prevState.checked,
            id: this.props.id,
            user:user
        }))
    }

    componentDidMount()
    {
        //When the component mounts, we want to check if the user has upvoted the post. If they have, we want to set the checkbox to checked.
        const user = this.props.user
        const url = "https://priam-connections.netlify.app/.netlify/functions/upvotes"
        const upvotedPosts= JSON.parse(localStorage.getItem("upvotedPosts"))
        const condition = upvotedPosts.includes(this.props.id)
        this.setState({
            checked: condition,
            id: this.props.id
        }, () => {
        });
    }

    render(){
        return (
            <div onChange={this.toggleCheckbox} onClick = {this.onClick}>
            <Checkbox
            user={this.props.user}
            checked={this.state.checked}
            icon={<FavoriteBorder/>}
            checkedIcon={<Favorite/>}
            onClick={this.onClick}
            onChange={(event) => event.stopPropagation()}/>
            </div>
        )
    }
}

export default CustomCheckbox;