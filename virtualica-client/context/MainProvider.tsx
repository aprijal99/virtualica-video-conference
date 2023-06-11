import UserProvider from '@/context/UserProvider';
import {ReactNode} from 'react';
import RoomProvider from '@/context/RoomProvider';
import FeedbackProvider from '@/context/FeedbackProvider';
import RoomDialogProvider from '@/context/RoomDialogProvider';

const MainProvider = ({ children }: { children: ReactNode, }) => {
  return (
    <UserProvider>
      <RoomProvider>
        <FeedbackProvider>
          <RoomDialogProvider>
            {children}
          </RoomDialogProvider>
        </FeedbackProvider>
      </RoomProvider>
    </UserProvider>
  );
}

export default MainProvider;
