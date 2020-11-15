import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from '../../components/user/Profile';
import Users from '../../components/user/Users/Users';
import Home from '../../pages/Home';
import Signin from '../../pages/Signin';
import Signup from '../../pages/Signup';
import PrivateRoute from '../../components/auth/PrivateRoute';
import EditProfile from '../../components/user/EditProfile';
import Menu from '../../components/Menu';

const MainRouter = () => {
	return (
		<div>
			<Menu />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/users' component={Users} />
				<Route path='/signup' component={Signup} />
				<Route path='/signin' component={Signin} />
				<PrivateRoute path='/user/edit/:userId' component={EditProfile} />
				<Route path='/user/:userId' component={Profile} />
			</Switch>
		</div>
	);
};

export default MainRouter;
