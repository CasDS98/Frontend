import {useEffect, memo,useState } from "react";
import { useSession } from '../contexts/AuthProvider';
import {useUsers} from '../contexts/UsersProvider';
import { useMessages } from "../contexts/MessagesProvider";

const Message = memo(({ id, date_time, name, user, group, value})  => {
  const { user : userAuth,loading,error } = useSession();
  const { getUser } = useUsers();
  const [userInfo, setUserInfo] = useState("")
  const {deleteMessage} = useMessages();


  const deleteMessageFromGroup = (( message_id) => {
    deleteMessage(message_id);
  });

  useEffect( () => {
    const fetchUser = async () => {
      const u = await getUser(user);
      setUserInfo(u);
    }
    fetchUser();
   },[setUserInfo, getUser, user])

   

  useEffect(() => {
     const el = document.getElementById('message-list');
     el.scrollTop = el.scrollHeight;
    },[])

    if (loading) return <h1 data-cy="loading">Loading...</h1>;
    if (error)
      return (
        <p data-cy="messages_error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    if (!userAuth) {
      return (
        <p className="info flex flex-row items-center">
          <span className="flex-1">You need to be signed in</span>
        </p>
      );
    }

    return (
      <>
        { 
          userAuth.id === user ? (
            <div data-cy="message" class="text-right">
            <div class="flex flex-row-reverse">
                <button data-cy="btn_msg_remove" onClick={() => {deleteMessageFromGroup(id)}} class="text-white p-2 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-900">
                  X
                </button>
              <div class="p-2.5 inline-block text-sm text-gray-700 bg-gray-100 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 dark:text-white" role="alert">
                <p data-cy="message_content" class="break-all">{value}</p>
              </div>
            </div>
            <p data-cy="message_date" class=" text-xs dark:text-gray-300 ">{new Date(date_time).toLocaleString()}</p>
           
          </div>
          ) : (
            <div data-cy="message" class="text-left">
              <p data-cy="message_user" class=" text-xs dark:text-gray-300 ">{userInfo.user_name}</p>
            <div class="p-2.5 inline-block text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white" role="alert">
              <p data-cy="message_content" class="break-all">{value}</p>
            </div>
            <p data-cy="message_date" class=" text-xs dark:text-gray-300 ">{new Date(date_time).toLocaleString()}</p>
          </div>
          )
        }
      </>
    );
});

export default Message;