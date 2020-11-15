import React, { useState, useEffect } from 'react';
import { list } from '../api-user';
//material-ui
import {
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	Typography,
} from '@material-ui/core';
import { ArrowForward, Person } from '@material-ui/icons';
//style
import useStyles from './style';
//react-router
import { Link } from 'react-router-dom';

const Users = () => {
	const classes = useStyles();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		list(signal).then((data) => {
			console.log(data);
			if (data && data.error) {
				console.log(data.error);
			} else {
				setUsers(data);
			}
		});
		return function cleanup() {
			//cleanup func to abort fetch when the comp unmount.
			abortController.abort();
		};
	}, []);

	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant='h6' className={classes.title}>
				All Users
			</Typography>
			<List dense>
				{users.map((item, i) => {
					return (
						<Link to={'/user/' + item._id} key={i} className={classes.user}>
							<ListItem button>
								<ListItemAvatar>
									<Avatar>
										<Person />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={item.name} />
								<ListItemSecondaryAction>
									<IconButton>
										<ArrowForward />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						</Link>
					);
				})}
			</List>
		</Paper>
	);
};

export default Users;
