import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './config/theme';
import MainRouter from './config/MainRoute';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<MainRouter />
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
