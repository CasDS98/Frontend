import {useEffect, memo, useCallback, useContext } from "react";
import { useSession } from '../contexts/AuthProvider';


const Message = memo(({ id, date_time, name, user, group, value})  => {
  const { user : userAuth,loading,error } = useSession();
   

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
            <div class="text-right">
            <p class=" text-xs dark:text-gray-300 ">{user}</p>
            <div class="p-2.5 inline-block text-sm text-gray-700 bg-gray-100 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 dark:text-white" role="alert">
              <p class="break-all">{value}</p>
            </div>
            <p class=" text-xs dark:text-gray-300 ">{new Date(date_time).toLocaleString()}</p>
          </div>
          ) : (
            <div class="text-left">
            <p class=" text-xs dark:text-gray-300 ">{user}</p>
            <div class="p-2.5 inline-block text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white" role="alert">
              <p class="break-all">{value}</p>
            </div>
            <p class=" text-xs dark:text-gray-300 ">{new Date(date_time).toLocaleString()}</p>
          </div>
          )
        }
      </>
    );
});

export default Message;