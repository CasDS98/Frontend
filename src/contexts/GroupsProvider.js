
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
  const { ready: authReady, user } = useSession();
  const [members, setMembers] = useState({});


    const refreshGroups = useCallback(async () => {
      try {
        setError();
        setLoading(true);
        console.log("Refresh groups");
        const groups = await groupsApi.getAllGroups(user.id);
        setGroups(groups);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, [user]);
    
    useEffect(() => {
      setInitialLoad(false);
    }, [user]);
  
    useEffect(() => {
      if (authReady && !initialLoad) {
        refreshGroups();
        setInitialLoad(true);
      }
    }, [initialLoad, refreshGroups, authReady]);

    const refreshMembers = useCallback(async () => {
      try {
        setError();
        setLoading(true);
        const members = await groupsApi.getMembers(currentGroup.id);
        setMembers(members);
        console.log(members);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, [currentGroup.id]);

    useEffect(() => {
      refreshMembers();
 }, [currentGroup,refreshMembers]);
  
    const setGroupToUpdate = useCallback(
      (id) => {
        setCurrentGroup(
          id === null ? {} : groups.find((t) => t.id === id)
        );
        refreshMembers();
      },
      [groups,refreshMembers]
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

    const deleteMember = useCallback(
      async (group_id, user_id) => {
        setError();
        setLoading(true);
        try {
          await groupsApi.deleteMember({group_id, user_id});
          await refreshGroups();
          await refreshMembers();
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      [refreshGroups,refreshMembers]
    );

    const deleteGroup = useCallback(
      async (group_id) => {
        setError();
        setLoading(true);
        try {
          await groupsApi.deleteGroup(group_id);
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
      deleteGroup,
      setGroupToUpdate,
      addMember,
      deleteMember,
      members
    }),
    [
      groups,
      error,
      loading,
      currentGroup,
      createGroup,
      deleteGroup,
      setGroupToUpdate,
      addMember,
      deleteMember,
      members
    ]
  );

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  );
};