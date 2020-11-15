const { signout } = require('./api-auth');

const auth = {
	isAuthenticated() {
		if (typeof window == 'undefined') return false;
		if (localStorage.getItem('jwt'))
			return JSON.parse(localStorage.getItem('jwt'));
		else return false;
	},

	authenticate(jwt, cb) {
		if (typeof window !== 'undefined')
			localStorage.setItem('jwt', JSON.stringify(jwt));
		cb();
	},

	clearJWT(cb) {
		if (typeof window !== 'undefined') localStorage.removeItem('jwt');
		cb();
		//optional
		signout().then((data) => {
			document.cookie = 't=; expires=Fri, 13 Nov 2020 00:00:00 UTC; path=/;';
		});
	},
};

export default auth;
