//create method to create a new user return promise
const create = async (user) => {
	try {
		let response = await fetch('http://localhost:4000/api/users/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

//list method to retrieve all the users in the database, return promise
const list = async (signal) => {
	try {
		let response = await fetch('http://localhost:4000/api/users/', {
			method: 'GET',
			signal: signal,
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

//PROTECTED ROUTE

//read method to call specific user by their ID
const read = async (params, credentials, signal) => {
	try {
		let response = await fetch(
			'http://localhost:4000/api/users/' + params.userId,
			{
				method: 'GET',
				signal: signal,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + credentials.t,
				},
			}
		);
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

//update method
const update = async (params, credentials, user) => {
	try {
		let response = await fetch(
			'http://localhost:4000/api/users/' + params.userId,
			{
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + credentials.t,
				},
				body: JSON.stringify(user),
			}
		);
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

//remove method
const remove = async (params, credentials) => {
	try {
		let response = await fetch(
			'http://localhost:4000/api/users/' + params.userId,
			{
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + credentials.t,
				},
			}
		);
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

export { create, list, read, update, remove };
