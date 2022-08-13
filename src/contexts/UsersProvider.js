import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

import * as userApi from '../api/users';
import { useSocket } from "../contexts/SocketProvider";

export const UsersContext = createContext();
export const useUsers = () => useContext(UsersContext);

export const UsersProvider = ({ children }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const {socket, isConnected,sendDeleteUser} = useSocket();

  
  useEffect(() => {
    if(isConnected)
    {
      socket.on("receive_delete_user", (data) => {
        console.log("receive_delete_user");
        setSearchedUsers(searchedUsers.filter(user => user.id !== data.user));
      })
    }
  })

  const getUsersBySearch = useCallback(
    async (value) => {
      setError();
      setLoading(true);
      try {
        const users = await userApi.getUsersBySearch(value);
        setSearchedUsers(users);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },[]
  );
    

  const getUser = useCallback(
    async (id) => {
      setError();
      setLoading(true);
      try {
        const user = await userApi.getUser(id);
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },[]
  );

  const deleteUser = useCallback(
    async (user_id) => {
      setError();
      setLoading(true);
      try {
        await userApi.deleteUser(user_id);
        setSearchedUsers(searchedUsers.filter(data => data.id !== user_id));
        sendDeleteUser(user_id);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [searchedUsers,sendDeleteUser]
  );
    

    const value = useMemo(
      () => ({
      error,
      loading,
      getUser,
      getUsersBySearch,
      searchedUsers,
      deleteUser
    }),
    [
      error,
      loading,
      getUser,
      getUsersBySearch,
      searchedUsers,
      deleteUser
    ]
  );

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};