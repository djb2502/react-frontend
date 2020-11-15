import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import auth from '../../auth/auth-helper';
import { update, read } from '../api-user';
//meterial-ui
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Icon,
	TextField,
	Typography,
} from '@material-ui/core';
//style
import useStyles from './style';

const EditProfile = ({ match }) => {
	const classes = useStyles();
	const [values, setValues] = useState({
		name: '',
		password: '',
		email: '',
		open: false,
		error: '',
		redirectToProfile: false,
	});
	const jwt = auth.isAuthenticated();
	// const userId = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		read(
			{
				userId: match.params.userId,
			},
			{ t: auth.isAuthenticated().token },
			signal
		).then((data) => {
			if (data && data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, name: data.name, email: data.email });
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.userId]);

	const handleSubmit = () => {
		const user = {
			name: values.name || undefined,
			email: values.email || undefined,
			password: values.password || undefined,
		};
		update(
			{
				userId: match.params.userId,
			},
			{
				t: jwt.token,
			},
			user
		).then((data) => {
			if (data && data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, userId: data._id, redirectToProfile: true });
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	if (values.redirectToProfile) {
		return <Redirect to={'/user/' + values.userId} />;
	}

	return (
		<>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h6' className={classes.title}>
						Edit Profile
					</Typography>
					<TextField
						id='name'
						name='name'
						label='Name'
						className={classes.textField}
						value={values.name}
						onChange={handleChange('name')}
						margin='normal'
					/>
					<br />
					<TextField
						id='email'
						name='email'
						type='email'
						label='Email'
						className={classes.textField}
						value={values.email}
						onChange={handleChange('email')}
						margin='normal'
					/>
					<br />
					<TextField
						id='password'
						name='password'
						type='password'
						label='Password'
						className={classes.textField}
						value={values.password}
						onChange={handleChange('password')}
						margin='normal'
					/>
					<br />{' '}
					{values.error && (
						<Typography component='p' color='error'>
							<Icon color='error' className={classes.error}>
								error
							</Icon>
							{values.error}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={handleSubmit}
						className={classes.submit}
					>
						Submit
					</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default EditProfile;
