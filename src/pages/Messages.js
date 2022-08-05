import GroupList from "../components/GroupList";
import MessageList from "../components/MessageList";
import MemberList from "../components/MemberList";
import MessageForm from "../components/MessageForm";
import CreateGroupForm from "../components/CreateGroupForm";


export default function messages() {
 

  return (
    <div class="dark:bg-gray-800">
      <div class=" gap-0 grid grid-cols-5 grid-rows-message h-screen-custom">
        <h1 class="text-left p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-r dark:border-gray-700">Groups</h1>
        <h1 class="text-left col-span-3 p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b dark:border-gray-700">Chat</h1>
        <h1 class="text-left p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-r dark:border-gray-700">Members</h1>

        <div id="group-list" class="text-left border-b border-r dark:border-gray-700 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-600 overflow-y-scroll">
          <GroupList></GroupList>
        </div>
        
       
      <div id="message-list" class="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-600 overflow-y-scroll col-span-3">
          <MessageList></MessageList>
      </div>

        
        
        <div class="p-6 dark:text-white dark:border-gray-700">
        <MemberList></MemberList>
        </div>
        <div class="dark:text-white dark:border-gray-700">
          <CreateGroupForm></CreateGroupForm>
        </div>
        <div class="col-span-3">
          <MessageForm></MessageForm>
        </div>
      </div>
    </div>
  );
} 