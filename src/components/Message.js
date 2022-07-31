import {useEffect, memo, useCallback, useContext } from "react";


const Message = memo(({ id, date_time, name, user, group, value})  => {

  useEffect(() => {
     const el = document.getElementById('message-list');
     el.scrollTop = el.scrollHeight;
    },[])


  return(
    <div class="">
      <p class=" text-xs dark:text-gray-300 ">{user}</p>
      <div class="p-2.5 inline-block text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white" role="alert">
        <p class="break-all">{value}</p>
      </div>
      <p class=" text-xs dark:text-gray-300 ">{new Date(date_time).toLocaleString()}</p>
    </div>
  );
});

export default Message;