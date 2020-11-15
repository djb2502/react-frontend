import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import auth from '../../auth/auth-helper';
import { Link } from 'react-router-dom';
import { read } from '../api-user';
import DeleteUser from '../DeleteUser';
//material-ui
import {
	Typography,
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	ListItemSecondaryAction,
	IconButton,
} from '@material-ui/core';
import { Edit, Person } from '@material-ui/icons';
//style
import useStyles from './style';

const Profile = ({ match }) => {
	const classes = useStyles();
	const [user, setUser] = useState({});
	const [redirectToSignin, setRedirectToSignin] = useState(false);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const jwt = auth.isAuthenticated();

		read(
			{
				userId: match.params.userId,
			},
			{ t: jwt.token },
			signal
		).then((data) => {
			console.log(data);
			if (data && data.error) {
				setRedirectToSignin(true);
			} else {
				setUser(data);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.userId]);

	if (redirectToSignin) {
		return <Redirect to='/signin' />;
	}

	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant='h6' className={classes.title}>
				Profile
			</Typography>
			<List dense>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<Person />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={user.name} secondary={user.email} />
					{auth.isAuthenticated().user &&
						auth.isAuthenticated().user._id === user._id && (
							<ListItemSecondaryAction>
								<Link to={'/user/edit/' + user._id}>
									<IconButton aria-label='Edit' color='primary'>
										<Edit />
									</IconButton>
								</Link>
								<DeleteUser userId={user._id} />
							</ListItemSecondaryAction>
						)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText
						primary={'Joined: ' + new Date(user.created).toDateString()}
					/>
				</ListItem>
			</List>
		</Paper>
	);
};

export default Profile;
