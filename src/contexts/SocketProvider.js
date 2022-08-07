import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo
} from "react";

import io from 'socket.io-client'
import config from '../config.json'


export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [room, setRoom] = useState();

  useEffect(()=>{
      console.log("CONNECT WITH SOCKET")
      const s = io(config.connection_port);
      setSocket(s);
      setIsConnected(true);
    
  },[isConnected])

  const connectToRoom = useCallback(  async(group_id) => {
    console.log(`join room ${group_id}`)
    setRoom(group_id);
    socket.emit('join_room', group_id)
  },[socket])

  const sendMessage = useCallback(  async(message) => {
    let messageContent = {
      room : room,
      message : message
    }
    socket.emit('send_message', messageContent)
  },[socket,room])
 
  const value = useMemo(
    () => ({
      connectToRoom,
      sendMessage,
      socket,
      isConnected
    }),
    [
      connectToRoom,
      sendMessage,
      socket,
      isConnected
    ]
  );

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};