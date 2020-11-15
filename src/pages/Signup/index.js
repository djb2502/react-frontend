import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { create } from '../../components/user/api-user';
//material-ui
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Icon,
	TextField,
	Typography,
} from '@material-ui/core';
//style
import useStyles from './style';

const Signup = () => {
	const classes = useStyles();
	const [values, setvalues] = useState({
		name: '',
		password: '',
		email: '',
		open: false,
		error: '',
	});

	const handleChange = (name) => (event) => {
		setvalues({ ...values, [name]: event.target.value });
	};

	const handleSubmit = () => {
		const user = {
			name: values.name || undefined,
			email: values.email || undefined,
			password: values.password || undefined,
		};
		create(user).then((data) => {
			if (data.error) {
				setvalues({ ...values, error: data.error });
			} else {
				setvalues({ ...values, error: '', open: true });
			}
		});
	};

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h6' className={classes.title}>
						Sign Up
					</Typography>
					<TextField
						id='name'
						label='Name'
						className={classes.textField}
						value={values.name}
						onChange={handleChange('name')}
						margin='normal'
					/>
					<br />
					<TextField
						id='email'
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
						type='password'
						label='Password'
						className={classes.textField}
						value={values.password}
						onChange={handleChange('password')}
						margin='normal'
					/>
					<br />
					{values.error && (
						<Typography component='p' color='error'>
							<Icon color='error' className={classes.error} />
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

			{/* Dialog component for success response */}
			<Dialog open={values.open} disableBackdropClick={true}>
				<DialogTitle>New Account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						New account has been created successfully
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to='/signin'>
						<Button color='primary' autoFocus='autoFocus' variant='contained'>
							Sign In
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Signup;
