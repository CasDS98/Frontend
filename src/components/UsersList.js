import React, { useContext, useMemo, useCallback } from "react";
import { useUsers } from "../contexts/UsersProvider";
import { useFriends } from "../contexts/FriendsProvider";
import { useSession } from '../contexts/AuthProvider';
import User from "./User"

const UsersList = () => {
   const {  error, loading, searchedUsers} = useUsers();
   const {createFriends, friends} = useFriends();
   const { user } = useSession();
   
    
   
   
   const addFriend = (( friend_id) => {
    createFriends(user.id, friend_id);
    });

    const allSearchedUsers = useMemo(() => {
      if(useFriends.loading) return [];
      //filter for users that are not friends
      let nonFriendUsers = [];

        searchedUsers.forEach(element => {
        //check if it is not the logged in user
        if(element.id !== user.id){ 
        const result = friends.find(s => {return s.id === element.id});
          if(!result)
          {
            nonFriendUsers.push(element);
          }
       }
      });

      return nonFriendUsers;
    }, [friends, searchedUsers, user]);


  
    if (loading) return <h1 data-cy="loading">Loading...</h1>;
    if (error)
      return (
        <p data-cy="groups_error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    if (!searchedUsers || !searchedUsers.length) {
      return (
        <p className="info flex flex-row items-center">
          <span className="flex-1">There are no members</span>
        </p>
      );
    }

   return (
      <div  class="grid grid-cols-4">
      {allSearchedUsers.map((user) => {return (
         
         <div  class="grid p-6 ">
           <div  class=" p-2 border rounded-lg dark:border-gray-700">
             <div class="grid grid-cols-4">
               <div class="grid col-span-3"><User key={user.id} {...user}></User> </div>
                <button onClick={() => {addFriend(user.id)}} class="block  w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-900  dark:hover:bg-gray-700">
                  <img src="/img/trash.svg" alt="delete" ></img>
                </button>
             </div>
           </div>
        </div>
      )})}
      </div>

   );
};

export default UsersList;