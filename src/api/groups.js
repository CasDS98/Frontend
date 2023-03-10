import { axios } from '.';

export const getAllGroups = async (user_id) => {

    const { data } = await axios.get(
      `groups/${user_id}`
    );

    return data;
};

export const saveGroup = async ({
	id,
	name,
}) => {
	const { data } = await axios({
		method: id ? 'put' : 'post',
    url : `groups/${id ?? ''}`,
		data: {
			name,
		},
	});
	return data;
};

export const deleteGroup = async (id) => {
	await axios.delete(`groups/${id}`);
};

export const deleteMember = async ({group_id, user_id}) => {
	await axios({
		method: 'delete',
    url : `groups/members/${group_id}`,
		data: {
			user_id
		},
	});
};

export const addMember = async ({
	group_id,
	user_id,
}) => {
	console.log(group_id);
	console.log(user_id);
	const { data } = await axios({
		method: 'post',
    url : `groups/members/${group_id}`,
		data: {
		  user_id,
		},
	});
	return data;
};

export const getMembers= async (group_id) => {

	const { data } = await axios.get(
		`groups/members/${group_id}`
	);

	return data;
};
