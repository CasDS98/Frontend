import React, { useContext, useMemo } from "react";
import { MessagesContext } from "../contexts/MessagesProvider";
import {useGroups} from "../contexts/GroupsProvider";
import Message from "./Message";



const MessagesList =  () => {
   const { messages, error, loading } = useContext(MessagesContext);
   const { currentGroup } = useGroups();
  
   const allMessages = useMemo(() => {
      return messages
    }, [messages]);


  
    if (loading) return <h1 class="text-white" data-cy="loading">Loading...</h1>;
    if (error)
      return (
        <p data-cy="messages_error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    
    if(!currentGroup)    {
      return (
        <p className="info flex flex-row items-center text-white">
          <span className="flex-1">Select a group to view the messages</span>
        </p>
      );
    } 

    if (!messages || !messages.length) {
      return (
        <p className="info flex flex-row items-center text-white">
          <span className="flex-1">There are no messages</span>
        </p>
      );
    }

   return (
     
     
      <div class="p-4 space-y-4">
        {allMessages.map((message) => {
          return (
            <Message class="" key={message.id} {...message}></Message>
          )
          })}
      </div>

   );
};

export default MessagesList;