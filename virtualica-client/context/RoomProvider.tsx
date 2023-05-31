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
  handleGetRoomDetail?: (roomId: string) => RoomType,
  handleAddRoom?: (room: RoomType) => void,
  handleAddRoomList?: (roomList: RoomType[]) => void,
  handleRemoveRoom?: (roomId: string) => void,
  handleChangeSelectedRoom?: (roomId: string) => void,
}

const initialRoomContext: RoomContextProps = {
  roomList: [],
  selectedRoom: '',
}

export const RoomContext = createContext<RoomContextProps>(initialRoomContext);

const RoomProvider = ({ children }: { children: ReactNode, }) => {
  const [roomList, setRoomList] = useState<RoomType[]>(initialRoomContext.roomList);
  const [selectedRoom, setSelectedRoom] = useState<string>(initialRoomContext.selectedRoom);

  const handleGetRoomList = (): RoomType[] => roomList;
  const handleGetRoomDetail = (roomId: string): RoomType => roomList.filter((room) => room.roomId === roomId)[0];
  const handleAddRoom = (room: RoomType) => setRoomList(prevState => [...prevState, room]);
  const handleAddRoomList = (roomList: RoomType[]) => setRoomList(roomList);
  const handleRemoveRoom = (roomId: string) => setRoomList(prevState => prevState.filter((room) => room.roomId !== roomId));
  const handleChangeSelectedRoom = (roomId: string) => setSelectedRoom(roomId);

  return (
    <RoomContext.Provider value={{ roomList, selectedRoom }}>
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
