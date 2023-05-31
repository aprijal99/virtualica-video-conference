import UserProvider from '@/context/UserProvider';
import {ReactNode} from 'react';
import RoomProvider from '@/context/RoomProvider';

const MainProvider = ({ children }: { children: ReactNode, }) => {
  return (
    <UserProvider>
      <RoomProvider>
        {children}
      </RoomProvider>
    </UserProvider>
  );
}

export default MainProvider;
