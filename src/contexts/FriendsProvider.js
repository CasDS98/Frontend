import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

import * as friendsApi from '../api/friends';
import { useSession } from './AuthProvider';
import { useSocket } from "../contexts/SocketProvider";

export const FriendsContext = createContext();
export const useFriends = () => useContext(FriendsContext);

export const FriendsProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { ready: authReady, user } = useSession();
  const {socket, isConnected} = useSocket();

  useEffect(() => {
    if(isConnected)
    {
      socket.on("receive_delete_user", (data) => {
        console.log("receive_delete_user_FriendsProvider");
        setFriends(friends.filter(user => user.id !== data.user));
      })
    }
  })

    const refreshFriends = useCallback(async () => {
      try {
        setError();
        setLoading(true);
        console.log("Refresh friends");
        console.log(user.id);
   
        const friends = await friendsApi.getAllFriends(user.id);
        setFriends(friends.data);
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
        refreshFriends();
        setInitialLoad(true);
      }
    }, [initialLoad, refreshFriends, authReady]);

    const createFriends = useCallback(
      async (user_a, user_b) => {
        setError();
        setLoading(true);
        try {
          const friend = await friendsApi.saveFriends({user_a,user_b})
          refreshFriends();
          return friend;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      [refreshFriends]
    );

    const deleteFriends = useCallback(
      async (user_a, user_b) => {
        setError();
        setLoading(true);
        try {
          await friendsApi.deleteFriends({user_a, user_b});
          await refreshFriends();
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      [refreshFriends]
    );

    

    const value = useMemo(
      () => ({
      error,
      loading,
      friends,
      createFriends,
      deleteFriends,
    }),
    [
      error,
      loading,
      friends,
      createFriends,
      deleteFriends,
    ]
  );

  return (
    <FriendsContext.Provider value={value}>
      {children}
    </FriendsContext.Provider>
  );
};