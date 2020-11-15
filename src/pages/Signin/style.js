import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	card: {
		maxWidth: 500,
		margin: 'auto',
		textAlign: 'center',
		marginTop: theme.spacing(13),
		paddingBottom: theme.spacing(2),
		backgroundColor: 'whitesmoke',
	},
	error: {
		verticalAlign: 'middle',
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	submit: {
		margin: 'auto',
		marginBottom: theme.spacing(2),
	},
}));
