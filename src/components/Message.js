import { memo, useCallback, useContext } from "react";


const Message = memo(({ id, date_time, name, user, group, value})  => {
  return(
      <p class="font-normal text-gray-700 dark:text-gray-400">{value}</p>
  );
});

export default Message;