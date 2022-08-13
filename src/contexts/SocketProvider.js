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
      const s = io(process.env.REACT_APP_BACKEND_CONNECTION_PORT || config.connection_port);
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

  const sendDeleteUser = useCallback(  async(user) => {
    let messageContent = {
      room : room,
      user : user
    }
    socket.emit('delete_user', messageContent)
  },[socket,room])

  const removeMember = useCallback(  async(member) => {
    let messageContent = {
      room : room,
      member : member
    }
    socket.emit('remove_member', messageContent)
  },[socket,room])

  const sendAddMember = useCallback(  async() => {
    let messageContent = {
      room : room,
    }
    socket.emit('add_member', messageContent)
  },[socket,room])

  const sendDeleteGroup = useCallback(  async() => {
    let messageContent = {
      room : room,
    }
    socket.emit('delete_group', messageContent)
  },[socket,room])
 
  const sendDeleteMessage = useCallback(  async(id) => {
    let messageContent = {
      room : room,
      id : id
    }
    socket.emit('delete_message', messageContent)
  },[socket,room])
 
  const value = useMemo(
    () => ({
      connectToRoom,
      sendMessage,
      socket,
      isConnected,
      sendDeleteUser,
      removeMember,
      sendAddMember,
      sendDeleteGroup,
      sendDeleteMessage
    }),
    [
      connectToRoom,
      sendMessage,
      socket,
      isConnected,
      sendDeleteUser,
      removeMember,
      sendAddMember,
      sendDeleteGroup,
      sendDeleteMessage
    ]
  );

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};