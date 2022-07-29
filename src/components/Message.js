import { memo, useCallback, useContext } from "react";


const Message = memo(({ id, date_time, name, user, group, value})  => {

  return(
    <div class="">
      <p class=" text-sm dark:text-gray-300 ">{user}</p>
      <div class="p-4 inline-block text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white" role="alert">
        <p class="break-all">{value}</p>
      </div>
      <p class=" text-sm dark:text-gray-300 ">{new Date(date_time).toLocaleString()}</p>
    </div>
  );
});

export default Message;