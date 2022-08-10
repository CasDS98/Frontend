import { useEffect, memo, useCallback, useContext } from "react";


const User = memo(({ id, user_name,email})  => {

  return(
    <>
      <h5 class="truncate text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user_name}</h5>
      <p class="truncate text-left font-normal text-gray-700 dark:text-gray-400">{email}</p>
    </>
  );
});

export default User;