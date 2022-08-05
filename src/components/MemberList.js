import React, { useContext, useMemo, useCallback } from "react";
import { useGroups } from "../contexts/GroupsProvider";
import User from "./User"

const MemberList = () => {
   const { members, loading, error, deleteMember, currentGroup} = useGroups();

   const removeMember = (( user_id) => {
     deleteMember(currentGroup.id, user_id);
  });

   const allMembers = useMemo(() => {
      return members
    }, [members]);
  
    if (loading) return <h1 data-cy="loading">Loading...</h1>;
    if (error)
      return (
        <p data-cy="groups_error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    if (!members || !members.length) {
      return (
        <p className="info flex flex-row items-center">
          <span className="flex-1">There are no members</span>
        </p>
      );
    }

   return (
      <>
      {allMembers.map((member) => {return (
         
         <div  class="grid grid-cols-5">
           <div  class="col-span-4">
             <User key={member.id} {...member}></User>
           </div>
           <button onClick={() => {removeMember(member.id)}} class="block p-6 w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700">
              <img src="/img/trash.svg" alt="delete" ></img>
           </button>
        </div>
      )})}
      </>

   );
};

export default MemberList;