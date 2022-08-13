
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

import * as messagesApi from '../api/messages';
import { useSession } from './AuthProvider';
import { useSocket } from "../contexts/SocketProvider";
import { useGroups } from "../contexts/GroupsProvider";

export const MessagesContext = createContext();
export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  const { ready: authReady } = useSession();
  const {sendDeleteMessage, sendMessage, socket, isConnected} = useSocket();
  const {currentGroup} = useGroups();

  const refreshMessages = useCallback(async () => {
   
    if(currentGroup === null) return [];
    
    try {
      console.log(`Refresh messages ${currentGroup.id}`);
      setError();
      setLoading(true);
      const { data } = await messagesApi.getAllMessages(currentGroup.id);
      setMessages(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [currentGroup]);

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshMessages();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshMessages, authReady]);

  useEffect(() => {
    if(authReady)
    {
     refreshMessages();
    }
   }, [currentGroup,refreshMessages,authReady]);

  const createMessage = useCallback(
    async ({ user_id, message}) => {
      setError();
      setLoading(true);
      try {
        const changedMessage  = await messagesApi.saveMessage({ user_id,
          group_id : currentGroup.id,
          message,});
        //await refreshMessages();
        setMessages([...messages,changedMessage])
        //send message to socket
        sendMessage(changedMessage);
        return changedMessage;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [sendMessage,messages,currentGroup]
  );

  
  const deleteMessage = useCallback(
    async (message_id) => {
      setError();
      setLoading(true);
      try {
        await messagesApi.deleteMessage(message_id);
        setMessages(messages.filter(message => message.id !== message_id))
        sendDeleteMessage(message_id);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [messages,sendDeleteMessage]
  );

  useEffect(() => {
    if(isConnected)
    {
      socket.on("receive_message", (data) => {
        console.log("receive_message_MessageProvider");
        setMessages([...messages,data])
      })

      socket.on("receive_delete_message", (data) => {
        console.log("receive_delete_message_MessageProvider");
        setMessages(messages.filter(message => message.id !== data))
      })
    }
  })


  const value = useMemo(
    () => ({
    messages,
    error,
    loading,
    currentMessage,
    createMessage,
    deleteMessage
  }),
  [
    messages,
    error,
    loading,
    currentMessage,
    createMessage,
    deleteMessage
  ]
);

return (
  <MessagesContext.Provider value={value}>
    {children}
  </MessagesContext.Provider>
);
};