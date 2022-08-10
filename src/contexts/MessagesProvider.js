
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
  const [selectedGroupId, setSelectedGroupId] = useState();
  const { ready: authReady } = useSession();
  const {sendMessage, socket, isConnected} = useSocket();
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

  
  const setCurrentGroup = useCallback(async(groupId) => 
  {
    console.log("current groupid")
    console.log(groupId)
    setSelectedGroupId(groupId);
   
  },[]);

  useEffect(() => {
    if(authReady)
    {
     refreshMessages();
    }
   }, [currentGroup,refreshMessages,authReady]);

  const createMessage = useCallback(
    async ({ user_id, group_id, message}) => {
      setError();
      setLoading(true);
      try {
        const changedMessage  = await messagesApi.saveMessage({ user_id,
          group_id,
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
    [sendMessage,messages]
  );

  useEffect(() => {
    if(isConnected)
    {
      socket.on("receive_message", (data) => {
        console.log("receiving message");
        setMessages([...messages,data])
      })
    }
  })


  const value = useMemo(
    () => ({
    messages,
    error,
    loading,
    currentMessage,
    setCurrentGroup,
    createMessage,
    selectedGroupId
   // deleteGroup,
    //setGroupToUpdate,
  }),
  [
    messages,
    error,
    loading,
    currentMessage,
    setCurrentGroup,
    createMessage,
    selectedGroupId
   // deleteGroup,
    //setGroupToUpdate,
  ]
);

return (
  <MessagesContext.Provider value={value}>
    {children}
  </MessagesContext.Provider>
);
};