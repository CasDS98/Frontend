import FriendsList from "../components/FriendsList";
import SearchUserForm from "../components/SearchUserForm";
import UsersList from "../components/UsersList";

export default function friends() {
 

  return (
    <div class="dark:bg-gray-800">
      <div class=" gap-0 grid grid-cols-5 grid-rows-message h-screen-custom">
        <h1 class="text-left p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-r dark:border-gray-700">Friends</h1>
        <h1 class="text-left col-span-4 p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b dark:border-gray-700">Add Friends</h1>

        <div class="text-left row-start-2 p-6 border-b border-r dark:border-gray-700 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-600 overflow-y-scroll">
          <FriendsList></FriendsList>
        </div>

        <div class="text-left col-span-4 p-6 border-b border-r dark:border-gray-700">
          <UsersList></UsersList>
        </div>

        <div class="text-left row-start-3 col-start-2 col-span-4 p-6 border-b border-r dark:border-gray-700">
          <SearchUserForm></SearchUserForm>
        </div>
        
     
      </div>
    </div>
  );
} 