import React, { useMemo} from "react";
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

    if (!members) {
      return (
        <p className="info flex flex-row items-center">
          <span className="flex-1">Please select a group</span>
        </p>
      );
    }

   return (
      <>
      {allMembers.map((member) => {return (
         <div  class="grid grid-cols-5  border rounded-lg dark:border-gray-700 ">
            <div data-cy="member" class="col-span-4 p-2">
              <User key={member.id} {...member}></User>
            </div>
            <button data-cy="btn_remove_member" onClick={() => {removeMember(member.id)}} class="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-900">
              <img src="/frontendweb-karine-2122-CasDS98/img/remove-user-svgrepo-com.svg" alt="delete" ></img>
            </button>
         </div>
      )})}
      </>

   );
};

export default MemberList;