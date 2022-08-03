import { axios } from '.';

export const getAllMessages = async (group_id) => {
 
    const { data } = await axios.get(
      `messages/${group_id}`
    );

    return data;
};

export const saveMessage = async ({ 
  id,
  user_id, 
  group_id, 
  message}) => {
	const { data } = await axios({
		method: id ? 'put' : 'post',
    url : `messages/${id ?? ''}`,
		data: {
			user_id, 
      group_id, 
      message
		},
	});
	return data;
};
