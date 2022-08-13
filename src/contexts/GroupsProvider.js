
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
import { useSocket } from "../contexts/SocketProvider";

export const GroupsContext = createContext();
export const useGroups = () => useContext(GroupsContext);

export const GroupsProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const { ready: authReady, user } = useSession();
  const [members, setMembers] = useState([]);  
  const {socket, isConnected, removeMember, sendAddMember,sendDeleteGroup} = useSocket();

  useEffect(() => {
    if(isConnected)
    {
      socket.on("receive_delete_user", (data) => {
        console.log("receive_delete_user_groupsProvider");
        if(members)setMembers(members.filter(user => user.id !== data.user));
      })

      socket.on("receive_remove_member", (data) => {
        console.log("receive_remove_member_groupsProvider");
        if(members)setMembers(members.filter(user => user.id !== data));
      })

      socket.on("receive_add_member", () => {
        console.log("receive_add_member_groupsProvider");
        refreshMembers();
      })

      socket.on("receive_delete_group", () => {
        console.log("receive_delete_group_groupsProvider");
        setCurrentGroup(null);
        setMembers(null);
        refreshGroups();
      })
    }
  })

    const refreshGroups = useCallback(async () => {
      console.log("Refresh groups");
      try {
        setError();
        setLoading(true);
        const groups = await groupsApi.getAllGroups(user.id); 
        console.log(groups);    
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

    const refreshMembers = useCallback(async () => {
      try {
        setError();
        setLoading(true);
        const members = await groupsApi.getMembers(currentGroup.id);
        setMembers(members);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, [currentGroup]);
  
    useEffect(() => {
      if (authReady && !initialLoad) {
        refreshGroups();
        setInitialLoad(true);
      }
    }, [initialLoad, refreshGroups, authReady,refreshMembers]);

    useEffect(() => {
      if (authReady ) {
        refreshMembers();
      }
     }, [currentGroup,refreshMembers,authReady]);
  
    const setGroupToUpdate = useCallback( async(id) => {
        await refreshGroups();
        setCurrentGroup(
          id === null ? {} : groups.find((t) => t.id === id)
        );
      },
      [groups,refreshGroups]
    );

    const createGroup = useCallback(
      async ({name}) => {
        setError();
        setLoading(true);
        try {
          const group = await groupsApi.saveGroup({name})
          setGroups([...groups,group])
          return group;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      [groups]
    );

    const addMember = useCallback(
      async (group_id, user_id) => {
        setError();
        setLoading(true);
        try {
          await groupsApi.addMember({group_id, user_id});
          sendAddMember();
          if(user_id !== user.id) await refreshMembers();
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      [refreshMembers,sendAddMember,user]
    );

    const deleteMember = useCallback(
      async (group_id, user_id) => {
        setError();
        setLoading(true);
        try {
          await groupsApi.deleteMember({group_id, user_id});
          removeMember(user_id);
          if(user_id === user.id)
          {
            setCurrentGroup(null);
            setMembers(null);
            await refreshGroups();
          }
          else{
            await refreshMembers();
          }
         
          
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      [refreshMembers,removeMember,refreshGroups,user]
    );

    const deleteGroup = useCallback(
      async (group_id) => {
        setError();
        setLoading(true);
        try {
          await groupsApi.deleteGroup(group_id);
          setCurrentGroup(null);
          setMembers(null);
          sendDeleteGroup();
          await refreshGroups();
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      [refreshGroups,sendDeleteGroup]
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