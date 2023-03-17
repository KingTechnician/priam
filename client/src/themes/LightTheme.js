//Light theme for the application. Styles are not inherently light, so please edit them for your use case.

export default function LightTheme()
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
                        maxWidth: "60vw",
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
                        fontSize:'1.8vh',
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
            }
        },
        iconColor:
        {
            color:'black'
        }
    }
}
