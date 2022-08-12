import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

import * as userApi from '../api/users';

export const UsersContext = createContext();
export const useUsers = () => useContext(UsersContext);

export const UsersProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  
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
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [searchedUsers]
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