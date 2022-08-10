import GroupList from "../components/GroupList";
import MessageList from "../components/MessageList";
import MemberList from "../components/MemberList";
import MessageForm from "../components/MessageForm";
import CreateGroupForm from "../components/CreateGroupForm";
import AddMemberList from "../components/AddMemberList";
import GroupNameLabel from "../components/GroupNameLabel";

export default function messages() {

  return (
    <div class="dark:bg-gray-800">
      <div class=" gap-0 grid grid-cols-5 grid-rows-message h-screen-custom">
        <h1 class="text-left p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-r-2 border-t-2 dark:border-gray-700">Groups</h1>
        <h1 class="truncate text-left col-span-3 p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-r-2 border-t-2 dark:border-gray-700"><GroupNameLabel></GroupNameLabel></h1>
        <h1 class="text-left p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-t-2 dark:border-gray-700">Members</h1>

        <div id="group-list" class="text-left border-t-2 border-b-2 border-r-2 dark:border-gray-700 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-600 overflow-y-scroll">
          <GroupList></GroupList>
        </div>
        
       
      <div id="message-list" class="scrollbar border-t-2 border-b-2 border-r-2 dark:border-gray-700 scrollbar-thumb-gray-900 scrollbar-track-gray-600 overflow-y-scroll col-span-3">
          <MessageList></MessageList>
      </div>

        
        
       <div class="grid row-span-2 grid-rows-2 p-6 border-t-2 border-b-2 dark:text-white dark:border-gray-700">
          <div>
              <MemberList></MemberList>
          </div>
        <div>
          <h1 class="text-left p-6 mb-2 text-4xl border-t-2 border-b-2 font-bold tracking-tight text-gray-900 dark:text-white dark:border-gray-700">Add Members</h1>
            <AddMemberList></AddMemberList>
        </div>
        </div>
        <div class="dark:text-white border-r-2 dark:border-gray-700">
          <CreateGroupForm></CreateGroupForm>
        </div>
        <div class="col-span-3 border-r-2 dark:border-gray-700">
          <MessageForm></MessageForm>
        </div>
      </div>
    </div>
  );
} 