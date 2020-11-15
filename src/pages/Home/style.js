import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		maxHeight: 800,
		margin: 'auto',
		backgroundColor: 'lightGreen',
		marginTop: theme.spacing(5),
	},
	title: {
		padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
			2
		)}px`,
	},
	media: {
		objectFit: 'cover',
		minHeight: 400,
	},
}));
