import React, {useEffect} from 'react'

import {useSnackbar} from 'notistack'

export const withSnackbar = WrappedComponent => props => 
{
    return <WrappedComponent {...props} snackbar={useSnackbar} />
}