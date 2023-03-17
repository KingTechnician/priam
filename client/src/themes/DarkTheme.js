//The primary styles for the application. The styles here are not necessarily dark, so please edit them for your use case.

export default function DarkTheme()
{
    return {
        components:
        {
            MuiCard:
            {
                defaultProps:
                {
                    sx:
                    {
                        width: "70vw",
                        bgcolor:'#1f2f49',
                        color:'#a4abb9',
                        fontWeight:'bold',
                        border:'1px solid #34476f',
                        borderRadius:'12px',
                        height: 'fit-content',
                    }
                }
            },
            MuiGrid:
            {
                defaultProps:
                {
                    sx:
                    {
                        color:'#a4abb9',
                        padding:'15px'
                    }
                }
            },
            MuiChip:
            {
                defaultProps:
                {
                    sx:
                    {
                        padding:'0px',
                        width:'fit-content',
                        height:'5vh',
                        color:'#e8eff1',
                        bgcolor:'#2f4054',
                        fontSize:'1.5vh',
                    }
                }
            },
            MuiTypography:
            {
                defaultProps:
                {
                    sx:
                    {
                        color:'#b5c2d6',
                        fontSize:'1.7vh',
                    }
                }
            },
            MuiCardHeader:
            {
                defaultProps:
                {
                    sx:
                    {
                        color:'#b5c2d6',
                        fontWeight:'bold'
                    }
                }
            },
            MuiFavoriteIcon:
            {
                defaultProps:
                {
                    sx:
                    {
                        fill:'white',
                        fontSize:'1.8vh',
                    }
                }
            },
            MuiBox:
            {
                defaultProps:
                {
                    sx:
                    {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'white',
                        border: '2px solid red',
                        boxShadow: 24,
                        p: 4,
                    }
                }
            },
            ListItemText:
            {
                defaultProps:
                {
                    sx:
                    {
                        color:'black',
                        fontSize:'1.7vh',
                    }
                }
            },
            MuiPaper:
            {
                defaultProps:
                {
                    sx:
                    {
                        color:'#a4abb9',
                        fontWeight:'bold',
                        border:'1px solid #34476f',
                        borderRadius:'2px',
                        height: 'fit-content',
                    }
                }
            }
        },
        iconColor:
        {
            color:'white'
        },
        PaginationStyle:
        {
            color:'white',
            bgcolor:'#1f2f49d4',
            border:'1px solid #34476f',
            borderRadius:'12px',
            button:{color:'white'},
            bottom:10,
            position:'fixed',
        },
    }
}
