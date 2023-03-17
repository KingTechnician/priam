import React,{useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = WrappedComponent => props => 
{
    const effect = useEffect
    return <WrappedComponent {...props} useEffect = {effect}  />
}