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
  selectedRoom: string,
  handleGetRoomList?: () => RoomType[],
  handleGetRoomDetail?: (roomId: string) => UserType,
  handleAddRoomList?: (roomList: RoomType[]) => void,
  handleAddRoom?: (room: RoomType) => void,
  handleRemoveRoom?: (roomId: string) => void,
}

const initialRoomContext: RoomContextProps = {
  roomList: [],
  selectedRoom: '',
}

export const RoomContext = createContext<RoomContextProps>(initialRoomContext);

const RoomProvider = ({ children }: { children: ReactNode, }) => {
  const [roomList, setRoomList] = useState<RoomType[]>(initialRoomContext.roomList);
  const [selectedRoom, setSelectedRoom] = useState<string>(initialRoomContext.selectedRoom);

  return (
    <RoomContext.Provider value={{ roomList, selectedRoom }}>
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
