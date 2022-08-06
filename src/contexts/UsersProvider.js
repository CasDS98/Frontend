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


  const getUser = useCallback(
    async (id) => {
      setError();
      setLoading(true);
      try {
        const user = await userApi.getUser(id);
        console.log(user);
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },[]
  );
    

    const value = useMemo(
      () => ({
      error,
      loading,
      getUser
    }),
    [
      error,
      loading,
      getUser
    ]
  );

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};