import { axios } from '.';

export const login = async (email, password) => {
	const {
		data
	} = await axios.post(`users/login`, {
		email,
		password
	});
	return data;
};

export const register = async ({
	user_name,
	email,
	password,
}) => {
	const {
		data
	} = await axios.post(`users/register`, {
		user_name,
		email,
		password
	});
	return data;
};

export const getUser = async (
id
) => {
	const {
		data
	} = await axios.get(`users/${id}`);
	return data;
};

export const getUsersBySearch = async (
  value) => {
		if(value === "" || value === null) return [];
		const { data } =  await axios.get(`users/search/${value}`);
		console.log(data);
		return data;
	};

