import React, { useMemo } from "react";
import { useUsers } from "../contexts/UsersProvider";
import { useFriends } from "../contexts/FriendsProvider";
import { useSession } from '../contexts/AuthProvider';
import User from "./User"

const UsersList = () => {
   const {  error, loading, searchedUsers, deleteUser} = useUsers();
   const {createFriends, friends} = useFriends();
   const { user, hasRole } = useSession();

   const addFriend = (( friend_id) => {
    createFriends(user.id, friend_id);
    });

   const deleteUserFromApp = (( user_id) => {
       deleteUser(user_id);
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
      },[searchedUsers]);

      return nonFriendUsers;
    }, [friends, searchedUsers, user]);


  
    if (loading) return <h1 class="text-white" data-cy="loading">Loading...</h1>;
    if (error)
      return (
        <p data-cy="groups_error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    if (!searchedUsers || !searchedUsers.length) {
      return (
        <p className="text-white info flex flex-row items-center">
          <span className="flex-1">Use the search bar to find users</span>
        </p>
      );
    }

   return (
      <div  class="grid grid-cols-4">
      {allSearchedUsers.map((user) => {return (
         
         <div  class="grid p-6 ">
           <div  class=" border rounded-lg dark:border-gray-700">
             <div class="grid grid-cols-5 ">
                {hasRole("admin") ? (
                    <div class="grid  p-2 col-span-3"><User key={user.id} {...user}></User> </div>
                  ) :   
                    <div class="grid  p-2 col-span-4"><User key={user.id} {...user}></User> </div>
                  }
                <button onClick={() => {addFriend(user.id)}} class="block p-5 w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-900">
                  <img src="/img/add-user-svgrepo-com.svg" alt="delete" ></img>
                </button>
                {hasRole("admin") ? (
                  <>
                    <button onClick={() => {deleteUserFromApp(user.id)}} class="block p-5 w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-900">
                        <img src="/img/delete-svgrepo-com.svg" alt="delete" ></img>
                    </button>
                  </>
                  ) :   
                  <></>}
             </div>
           </div>
        </div>
      )})}
      </div>

   );
};

export default UsersList;