import {createContext, ReactNode, useState} from 'react';

export type RoomMessageType = {
  message: string,
  senderName: string,
  date: number,
}

interface RoomMessageContextProps {
  roomMessage: RoomMessageType[],
  addRoomMessage?: (roomMessage: RoomMessageType) => void,
}

const initialRoomMessageContext: RoomMessageContextProps = {
  roomMessage: [],
}

const RoomMessageContext = createContext<RoomMessageContextProps>(initialRoomMessageContext);

const RoomMessageProvider = ({ children }: { children: ReactNode, }) => {
  const [roomMessage, setRoomMessage] = useState<RoomMessageType[]>(initialRoomMessageContext.roomMessage);
  const addRoomMessage = (roomMessage: RoomMessageType) => setRoomMessage(prevState => [...prevState, roomMessage]);

  return (
    <RoomMessageContext.Provider value={{ roomMessage, addRoomMessage }}>
      {children}
    </RoomMessageContext.Provider>
  );
}

export default RoomMessageProvider;
