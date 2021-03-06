import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: theme.mixins.gutters({
		padding: theme.spacing(1),
		margin: theme.spacing(5),
	}),
	user: {
		textDecoration: 'none',
	},
	title: {
		margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
		color: theme.palette.openTitle,
		fontSize: '20px',
	},
}));
