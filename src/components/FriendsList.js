import React, { useContext, useMemo, useCallback } from "react";
import { useFriends } from "../contexts/FriendsProvider";
import { useSession } from '../contexts/AuthProvider';
import User from "./User"

const FriendsList = () => {
   const {loading, error, friends, deleteFriends} = useFriends();
   const { user } = useSession();

   const removeFriend = (( friend_id) => {
    deleteFriends(user.id, friend_id);
  });

   const allFriends = useMemo(() => {
      return friends;
    }, [friends]);
  
    if (loading) return <h1 data-cy="loading">Loading...</h1>;
    if (error)
      return (
        <p data-cy="friends_list__error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    if (!friends || !friends.length) {
      return (
        <p className="info flex flex-row items-center">
          <span className="flex-1">You have no friends </span>
        </p>
      );
    }

   return (
      <>
      {allFriends.map((friend) => {return (
         
         <div  class="grid grid-cols-5">
           <div  class="col-span-4">
             <User key={friend.id} {...friend}></User>
           </div>
           <button onClick={() => {removeFriend(friend.id)}} class="block p-6 w-full bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700">
              <img src="/img/trash.svg" alt="delete" ></img>
           </button>
        </div>
      )})}
      </>

   );
};

export default FriendsList;