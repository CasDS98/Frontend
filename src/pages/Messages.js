//import { useState, useCallback } from "react";
//import { IoAdd } from "react-icons/io5";
//import { Link } from "react-router-dom";
//import TransactionList from "../components/TransactionList";
import GroupList from "../components/GroupList";
export default function messages() {
 

  return (
    <div class="dark:bg-gray-800 grid grid-cols-5">
      <div class="text-left border dark:border-gray-700">
        <h1 class="p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b dark:border-gray-700">Groups</h1>
        <GroupList></GroupList>
      </div>
      <div class="col-span-4">
        <h1 class="p-6 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white border-b dark:border-gray-700">Chat</h1>
        <p>Messages</p>
      </div>
    </div>
  );
}