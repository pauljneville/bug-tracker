// copyright symbol with logo as Link to site
// https://github.com/mui/material-ui/blob/master/examples/nextjs/src/Copyright.js

import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <MuiLink color="inherit" href="https://mui.com/">
                Your Website
            </MuiLink>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}