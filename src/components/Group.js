import { useEffect, memo, useCallback, useContext } from "react";
import { useMessages } from "../contexts/MessagesProvider";
import { useGroups } from "../contexts/GroupsProvider";


const Group = memo(({ id, name})  => {
  const {setCurrentGroup} = useMessages();
  const {setGroupToUpdate, deleteGroup} = useGroups();
  //function to set groupId in messages
  const setGroupId = useCallback(() => {
    console.log(`Group selected : ${id}`);
    setCurrentGroup(id);
    setGroupToUpdate(id);
	}, [id, setCurrentGroup, setGroupToUpdate]);

  const remove = useCallback(() => {
    deleteGroup(id);
	}, [id,deleteGroup]);
 
  return(
    <div  class="grid grid-cols-5">
      <button onClick={() => {setGroupId()}} class="col-span-4 block p-6 w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700">
        <h5 class="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p class="text-left font-normal text-gray-700 dark:text-gray-400">last message</p>
      </button>
      <button onClick={() => {remove()}} class="block p-6 w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700">
        <img src="/img/trash.svg" alt="delete" ></img>
      </button>
    </div>
  );
});

export default Group;