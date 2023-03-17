import { createTheme } from "@mui/material";

//Some spare default app styles. Use them how you'd like!


export const themeOptions= createTheme({
    components: {
      MuiAppBar:{
        styleOverrides:{
          colorPrimary: {
            backgroundColor: '#0429fb',
          }
      }
    }},
    palette: {
      mode: 'light',
      primary: {
        main: '#0429fb',
      },
      secondary: {
        main: '#f50057',
      },
    },
    props: {
      MuiTooltip: {
        arrow: true,
      },
    },
    typography: {
      fontFamily: 'Open Sans',
      fontWeightRegular: 400,
      fontWeightLight: 300,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h4: {
        fontSize: '2.1rem',
        fontWeight: 400,
        lineHeight: 1.27,
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: 1.33,
      },
      h6: {
        fontSize: '1.3rem',
        fontWeight: 500,
        lineHeight: 1.59,
      },
    },
  });
  