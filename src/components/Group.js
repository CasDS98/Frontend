import { memo, useCallback, useContext } from "react";
import { GroupsContext } from "../contexts/GroupsProvider";
import { Link } from "react-router-dom";

const Group = memo(({ id, name})  => {
   
  return(
    <div class="block p-6 max-w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">last message</p>
    </div>
  );
});

export default Group;