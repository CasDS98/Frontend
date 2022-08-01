
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

export const GroupsContext = createContext();
export const useGroups = () => useContext(GroupsContext);

export const GroupsProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({});



    const refreshGroups = useCallback(async () => {
      try {
        setError();
        setLoading(true);
        const { data } = await axios.get(
          `${config.base_url}groups/23c1d4bb-2452-408c-b380-b61beed3d046`
        );
        setGroups(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      if (!initialLoad) {
        refreshGroups();
        setInitialLoad(true);
      }
    }, [initialLoad, refreshGroups]);
  
    const setGroupToUpdate = useCallback(
      (id) => {
        setCurrentGroup(
          id === null ? {} : groups.find((t) => t.id === id)
        );
      },
      [groups]
    );

    const createGroup = useCallback(
      async ({name}) => {
        setError();
        setLoading(true);
        let data = {
          name
        };
        let method = "post";
        let url = `${config.base_url}groups`;
        try {
          const { changedMessage } = await axios({
            method,
            url,
            data,
          });
          await refreshGroups();
          return changedMessage;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      [refreshGroups]
    );


    const value = useMemo(
      () => ({
      groups,
      error,
      loading,
      currentGroup,
      createGroup,
     // deleteGroup,
      setGroupToUpdate,
    }),
    [
      groups,
      error,
      loading,
      currentGroup,
      createGroup,
     // deleteGroup,
      setGroupToUpdate,
    ]
  );

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  );
};