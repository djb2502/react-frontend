import React, { useState } from 'react';
import PropTypes from 'prop-types';
import auth from '../../auth/auth-helper';
import { remove } from '../api-user';
import { Redirect } from 'react-router';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function DeleteUser(props) {
	const [open, setOpen] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
	};

	const deleteAccount = () => {
		const jwt = auth.isAuthenticated();
		remove(
			{
				userId: props.userId,
			},
			{
				t: jwt.token,
			}
		).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				auth.clearJWT(() => console.log('deleted'));
				setRedirect(true);
			}
		});
	};

	if (redirect) {
		return <Redirect to='/' />;
	}

	return (
		<>
			<IconButton
				aria-label='Delete'
				onClick={handleClickOpen}
				color='secondary'
			>
				<DeleteIcon />
			</IconButton>

			<Dialog open={open} onClose={handleClickClose}>
				<DialogTitle>{'Delete Account'}</DialogTitle>
				<DialogContent>
					<DialogContentText>Confirm to delete your account?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickClose} color='primary'>
						Cancel
					</Button>
					<Button
						onClick={deleteAccount}
						color='secondary'
						autoFocus='autoFocus'
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
DeleteUser.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default DeleteUser;
