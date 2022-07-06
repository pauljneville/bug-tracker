import { AppBar, Button, List, Toolbar, Typography, Grid, Paper } from '@mui/material';
import Link from '../src/Link';
import styles from '../styles/TopNav.module.css'
import { styled } from '@mui/material/styles';

import { FullscreenExitTwoTone, PhotoCamera } from '@mui/icons-material';
import { PhotoCameraTwoTone } from '@mui/icons-material';

export default function TopNav({ path }) {
    const breadcrumbs = path.split("/", 4).slice(1);
    let currentPath = "";

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
    };
    // const Item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));

    return (
        <AppBar position="relative">
            <Toolbar>
                {/* <List style={flexContainer}> */}
                <Grid container direction="row" spacing={3} pl={24}>
                    {(path.length > 1) ? breadcrumbs.map((crumb) => {
                        currentPath += "/" + crumb;
                        return (
                            <Grid item key={crumb} >
                                <Link href={{ pathname: currentPath }} > {/*underline="none" >*/}
                                    <Typography variant='h6' color="#fff">{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</Typography>
                                </Link>
                            </Grid>
                        );
                    }) : <></>}
                </Grid>
            </Toolbar>
            {/* <nav className={styles.topnav}>
                <ul>
                    {(path.length > 1) ? breadcrumbs.map((crumb) => {
                        currentPath += "/" + crumb;
                        return (
                            <li key={crumb}>
                                <Link href={currentPath}>
                                    <a>{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</a>
                                </Link>
                            </li>
                        );
                    }) : <li><p></p></li>}
                </ul>
            </nav> */}
        </AppBar>
    );
}