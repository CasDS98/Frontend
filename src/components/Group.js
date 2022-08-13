import { memo, useCallback } from "react";
import { useGroups } from "../contexts/GroupsProvider";
import { useSocket } from "../contexts/SocketProvider";

const Group = memo(({ id, name})  => {
  const {setGroupToUpdate, deleteGroup} = useGroups();
  const {connectToRoom} = useSocket();

  //function to set groupId in messages
  const selectGroup = useCallback(() => {
    console.log(`Group selected : ${id}`);
    setGroupToUpdate(id);
    connectToRoom(id);
	}, [id, setGroupToUpdate,connectToRoom]);

  const remove = useCallback(() => {
    deleteGroup(id);
	}, [id,deleteGroup]);
 
  return(

    <div  class="grid grid-cols-5  border rounded-lg dark:border-gray-700">
      <button onClick={() => {selectGroup()}} class="col-span-4 p-2 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700">
        <h5 class="truncate text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p class="truncate text-left font-normal text-gray-700 dark:text-gray-400">last message</p>
      </button>
      <button onClick={() => {remove()}} class="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-900">
        <img src="/frontendweb-karine-2122-CasDS98/img/chat-delete-svgrepo-com.svg" alt="delete" ></img>
      </button>
 </div>

  );
});

export default Group;