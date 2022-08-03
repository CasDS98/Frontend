
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

import * as groupsApi from '../api/groups';
import { useSession } from './AuthProvider';

export const GroupsContext = createContext();
export const useGroups = () => useContext(GroupsContext);

export const GroupsProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({});
  const { ready: authReady } = useSession();



    const refreshGroups = useCallback(async () => {
      try {
        setError();
        setLoading(true);
        const groups = await groupsApi.getAllGroups("23c1d4bb-2452-408c-b380-b61beed3d046");
        setGroups(groups);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      if (authReady && !initialLoad) {
        refreshGroups();
        setInitialLoad(true);
      }
    }, [initialLoad, refreshGroups, authReady]);
  
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
        try {
          const group = groupsApi.saveGroup({name})

          return group;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      []
    );

    const addMember = useCallback(
      async ({group_id, user_id}) => {
        setError();
        setLoading(true);
        try {
          await groupsApi.addMember({group_id, user_id});
          await refreshGroups();
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
      addMember
    }),
    [
      groups,
      error,
      loading,
      currentGroup,
      createGroup,
     // deleteGroup,
      setGroupToUpdate,
      addMember
    ]
  );

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  );
};