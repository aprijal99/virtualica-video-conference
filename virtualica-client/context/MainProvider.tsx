import UserProvider from '@/context/UserProvider';
import {ReactNode} from 'react';
import RoomProvider from '@/context/RoomProvider';
import FeedbackProvider from '@/context/FeedbackProvider';

const MainProvider = ({ children }: { children: ReactNode, }) => {
  return (
    <UserProvider>
      <RoomProvider>
        <FeedbackProvider>
          {children}
        </FeedbackProvider>
      </RoomProvider>
    </UserProvider>
  );
}

export default MainProvider;
