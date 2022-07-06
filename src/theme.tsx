// creates a theme for colouring used throughout app
// https://github.com/mui/material-ui/blob/master/examples/nextjs/src/theme.js

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#556cd6',
            contrastText: '#ffcc00',
        },
        secondary: {
            main: '#19857b',
            contrastText: '#ffcc00',
        },
        error: {
            main: red.A400,
        },
        action: {
            active: '#000000',
            hover: '#c5c5c5',
            focus: '00d2d2',
            selected: 'd200d2',
        },
        contrastThreshold: 3,

    },
    // Variants
    // h1
    // h2
    // h3
    // h4
    // h5
    // h6
    // subtitle1
    // subtitle2
    // body1
    // body2
    // button
    // caption
    // overline
    typography: {
        // fontSize: 12,
        // body1: {
        //     fontSize: 12,
        // },
        // body2: {
        //     fontWeight: 500,
        // },
        // button: {
        //     color: '#fff',
        // },


    },
});

export default theme;