import { memo, useCallback, useContext } from "react";
import { MessagesContext } from "../contexts/MessagesProvider";
import { Link } from "react-router-dom";

const Group = memo(({ id, name})  => {
  const {setCurrentGroup} = useContext(MessagesContext);
  //function to set groupId in messages
  const setGroupId = useCallback(() => {
    console.log(id);
    setCurrentGroup(id);
	}, [id, setCurrentGroup]);

  return(
    <button onClick={setGroupId} class="block p-6 w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">last message</p>
    </button>
  );
});

export default Group;