import * as React from "react";

import Head from 'next/head'
import Image from 'next/image'
import Metatags from '../../common/components/Metatags'
import styles from './Home.module.css'
import Link from 'next/link'
import { Box, Typography, AppBar, Card, CardActions, CardContent, CardMedia, Grid, Toolbar, Container, Button, ButtonGroup, List, ListItem } from '@mui/material'
import { PhotoCameraTwoTone } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { ClassNames } from '@emotion/react';
import theme from '@styles/theme';

export const Home = ({ users }) => {

    const containerStyle = {
        backgroundColor: theme.palette.background.paper,
        padding: "10px 0 0 10px",
    };
    const Title = styled('div')`
    font-size: 1.5em;
    text-align: start;
    color: palevioletred;
  `;
    const Wrapper = styled('section')`
    padding: 2em 4em 4em 4em;
    background: papayawhip;
  `;

    return (
        <div className={styles.container}>
            <Metatags />

            <main className={styles.main}>
                <Typography variant="h1">
                    Welcome to Bug Tracker
                </Typography>

                <Box style={containerStyle}>
                    <Container maxWidth="sm">
                        <Typography variant="body1" align="center" color="textPrimary" gutterBottom>
                            This is a web app to track tasks and issues in a software development project and to assign users who are governed by user roles that determine their access to functions.
                        </Typography>
                        <Typography variant="h5" align="center" color="textPrimary" paragraph>
                            Additional screenshots to follow
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* <p className={styles.description}>
            
          </p> */}
                <img src="https://bug-tracker-one.vercel.app/v0/page-project-with-tickets.png" alt="possible future version of said tracking app" />

                {users && <Typography>We have the following users registered:</Typography>}
                <Wrapper>
                    <List sx={{ listStyleType: 'disc' }}>
                        {users?.map((user) => {
                            return (<ListItem key={user?.username} divider sx={{ display: 'list-item' }}><Title>{user?.displayName} - {user?.roles != null ? user?.roles[0] : ""}</Title></ListItem>);
                        })}
                    </List>
                </Wrapper>
            </main >

            <footer className={styles.footer}>
                <div>
                    <Typography>👨‍🎨</Typography>
                    <Typography>Copyright</Typography>
                </div>
            </footer>
        </div >
    )
}