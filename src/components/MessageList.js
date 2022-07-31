import React, { useContext, useMemo } from "react";
import { MessagesContext } from "../contexts/MessagesProvider";
import Message from "./Message";

const MessagesList =  () => {
   const { messages, error, loading } = useContext(MessagesContext);
   
   const allMessages = useMemo(() => {
      return messages
    }, [messages]);


  
    if (loading) return <h1 data-cy="loading">Loading...</h1>;
    if (error)
      return (
        <p data-cy="messages_error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    if (!messages || !messages.length) {
      return (
        <p className="info flex flex-row items-center">
          <span className="flex-1">There are no messages</span>
        </p>
      );
    }

   return (
      <div class="p-4 space-y-4 text-left border-b dark:border-gray-700">
        {allMessages.map((message) => {return <Message key={message.id} {...message}></Message>})}
      </div>

   );
};

export default MessagesList;