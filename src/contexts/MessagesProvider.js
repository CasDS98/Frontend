
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import axios from "axios";
import config from "../config.json";

export const MessagesContext = createContext();
export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  const [groupId, setGroupId] = useState();

  const refreshMessages = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const { data } = await axios.get(
        `${config.base_url}messages/${groupId}`
      );
      setMessages(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    if (!initialLoad) {
      refreshMessages();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshMessages]);

  
  const setCurrentGroup = useCallback(async(groupId) => 
  {
    setGroupId(groupId);
    await refreshMessages();
  },[refreshMessages]);


  const value = useMemo(
    () => ({
    messages,
    error,
    loading,
    currentMessage,
    setCurrentGroup
   // createOrUpdateGroup,
   // deleteGroup,
    //setGroupToUpdate,
  }),
  [
    messages,
    error,
    loading,
    currentMessage,
    setCurrentGroup
   // createOrUpdateGroup,
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