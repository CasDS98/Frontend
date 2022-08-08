import FriendsList from "../components/FriendsList";

export default function friends() {
 

  return (
    <div class="dark:bg-gray-800">
      <div class=" gap-0 grid grid-cols-5 grid-rows-message h-screen-custom">
        <h1 class="text-left p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-r dark:border-gray-700">Friends</h1>
        <h1 class="text-left col-span-4 p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b dark:border-gray-700">Add Friends</h1>

        <div class="text-left p-6 border-b border-r dark:border-gray-700 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-600 overflow-y-scroll">
          <FriendsList></FriendsList>
        </div>
        
     
      </div>
    </div>
  );
} 