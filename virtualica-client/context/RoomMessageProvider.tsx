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
  roomMessage: [
    // { message: 'Hallo guys, how are you?', senderName: 'Aprijal Ghiyas Setiawan', date: new Date().getTime(), },
    // { message: 'I\'m good', senderName: 'Deki Geraldi', date: new Date().getTime(), },
    // { message: 'How about you?', senderName: 'Deki Geraldi', date: new Date().getTime(), },
    // { message: 'Excellent', senderName: 'Aprijal Ghiyas Setiawan', date: new Date().getTime(), },
  ],
}

export const RoomMessageContext = createContext<RoomMessageContextProps>(initialRoomMessageContext);

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
