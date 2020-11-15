import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import auth from '../../components/auth/auth-helper';
import { signin } from '../../components/auth/api-auth';
//material-ui
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

export default function Signin(props) {
	const classes = useStyles();
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		redirectToReferrer: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {
			email: values.email || undefined,
			password: values.password || undefined,
		};

		signin(user).then((data) => {
			if (data && data.error) {
				setValues({ ...values, error: data.errorMessage });
			} else {
				auth.authenticate(data, () => {
					setValues({ ...values, error: '', redirectToReferrer: true });
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const { from } = (props.location && props.location.state) || {
		from: {
			pathname: '/',
		},
	};
	const { redirectToReferrer } = values;
	if (redirectToReferrer) {
		return <Redirect to={from} />;
	}

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant='h6' className={classes.title}>
					Sign In
				</Typography>
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
				<br />{' '}
				{values.error && (
					<Typography component='p' color='error'>
						<Icon color='error' className={classes.error}>
							{values.errorMessage}
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
	);
}
