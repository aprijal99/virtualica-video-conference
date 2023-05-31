import {UserType} from '@/context/UserProvider';
import {createContext, ReactNode, useState} from 'react';

export type RoomType = {
  roomId: string,
  roomName: string,
  roomDescription: string,
  createdAt: number
}

interface RoomContextProps {
  roomList: RoomType[],
  handleGetRoomList?: () => RoomType[],
  handleGetRoomDetail?: (roomId: string) => UserType,
  handleAddRoomList?: (roomList: RoomType[]) => void,
  handleAddRoom?: (room: RoomType) => void,
  handleRemoveRoom?: (roomId: string) => void,
}

const initialRoomContext: RoomContextProps = {
  roomList: [],
}

export const RoomContext = createContext<RoomContextProps>(initialRoomContext);

const RoomProvider = ({ children }: { children: ReactNode, }) => {
  const [roomList, setRoomList] = useState<RoomType[]>(initialRoomContext.roomList);

  return (
    <RoomContext.Provider value={{ roomList }}>
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
