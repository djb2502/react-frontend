import React from 'react';
import { homeImg } from '../../assets';
//material-ui
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
//import style
import useStyles from './style';
import { Link } from 'react-router-dom';

const Home = () => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<Typography variant='h6' className={classes.title}>
				Home Page
			</Typography>
			<CardMedia className={classes.media} image={homeImg} title='home image' />
			<CardContent>
				<Typography variant='body2' component='p'>
					Welcome to my website
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Home;
