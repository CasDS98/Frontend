import React, { useMemo } from "react";
import { useGroups } from "../contexts/GroupsProvider";
import { useFriends } from "../contexts/FriendsProvider";
import User from "./User"

const AddMemberList = () => {
   const {loading, error, addMember, currentGroup, members} = useGroups();
   const {friends} = useFriends();

   const inviteMember = (( user_id) => {
     addMember(currentGroup.id, user_id);
  });

   const allMembers = useMemo(() => {
      if(!members || !members.length) return [];
      //filter for members that are not part of the group
      let nonGroupMembers = [];
      console.log(friends);

      friends.forEach(element => {
        const result = members.find(m => {return m.id === element.id});
        if(!result)
        {
          nonGroupMembers.push(element);
        }
      });

      return nonGroupMembers;
    }, [friends,members]);
  
    if (loading || useFriends.loading ) return <h1 data-cy="loading">Loading...</h1>;
    if (error || useFriends.error)
      return (
        <p data-cy="add_members_error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    if (!allMembers || !allMembers.length) {
      return (
        <p className="info flex flex-row items-center">
          <span className="flex-1">There are no available members to add </span>
        </p>
      );
    }

   return (
      <>
      {allMembers.map((member) => {return (
        <div  class="grid grid-cols-5  border rounded-lg dark:border-gray-700">
          <div  class="col-span-4 p-2">
            <User key={member.id} {...member}></User>
          </div>
          <button onClick={() => {inviteMember(member.id)}} class="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-900">
            <img src="/frontendweb-karine-2122-CasDS98/img/add-user-svgrepo-com.svg" alt="delete" ></img>
          </button>
       </div>
         
      )})}
      </>

   );
};

export default AddMemberList;