
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
  const [selectedGroupId, setSelectedGroupId] = useState();

  const refreshMessages = useCallback(async () => {
    try {
      console.log(`Refresh messages ${selectedGroupId}`);
      setError();
      setLoading(true);
      const { data } = await axios.get(
        `${config.base_url}messages/${selectedGroupId}`
      );
      setMessages(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [selectedGroupId]);

  useEffect(() => {
    if (!initialLoad) {
      refreshMessages();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshMessages]);

  
  const setCurrentGroup = useCallback(async(groupId) => 
  {
    setSelectedGroupId(groupId);
  },[]);

  useEffect(() => {
     refreshMessages();
}, [selectedGroupId,refreshMessages]);

  const createMessage = useCallback(
    async ({ user_id, group_id, message}) => {
      setError();
      setLoading(true);
      let data = {
        user_id,
        group_id,
        message,
      };
      let method = "post";
      let url = `${config.base_url}messages`;
      try {
        const { changedMessage } = await axios({
          method,
          url,
          data,
        });
        await refreshMessages();
        return changedMessage;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshMessages]
  );


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