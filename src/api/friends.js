import { axios } from '.';

export const getAllFriends = async (user_id) => {
    console.log(`friends/${user_id}`)
    const { data } = await axios.get(
      `friends/${user_id}`
    );
      console.log(data);
    return data;
};

export const saveFriends = async ({
	user_a,
	user_b,
}) => {
	const { data } = await axios({
		method: 'post',
    url : `friends`,
		data: {
			user_a,
      user_b
		},
	});
	return data;
};

export const deleteFriends = async ({
	user_a,
	user_b,
}) => {
	await axios({
		method: 'delete',
    url : `friends`,
		data: {
			user_a,
      user_b
		},
	});
};


