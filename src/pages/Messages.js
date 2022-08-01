//import { useState, useCallback } from "react";
//import { IoAdd } from "react-icons/io5";
//import { Link } from "react-router-dom";
//import TransactionList from "../components/TransactionList";
import GroupList from "../components/GroupList";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import CreateGroupForm from "../components/CreateGroupForm";


export default function messages() {
 

  return (
    <div class="dark:bg-gray-800">
      <div class=" gap-0 grid grid-cols-5 grid-rows-message min-h-screen h-screen">
        <h1 class="text-left p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-r dark:border-gray-700">Groups</h1>
        <h1 class="text-left col-span-3 p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b dark:border-gray-700">Chat</h1>
        <div class="dark:text-white dark:border-gray-700"></div>

        <div class="text-left border-b border-r dark:border-gray-700">
          <GroupList></GroupList>
        </div>
        
       
      <div id="message-list" class="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-600 overflow-y-scroll col-span-3">
          <MessageList></MessageList>
      </div>

        
        
        <div class="dark:text-white dark:border-gray-700"></div>
        <div class="dark:text-white dark:border-gray-700">
          <CreateGroupForm></CreateGroupForm>
        </div>
        <div class="col-span-4">
          <MessageForm></MessageForm>
        </div>
      </div>
    </div>
  );
} 