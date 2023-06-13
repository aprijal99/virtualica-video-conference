import UserProvider from '@/context/UserProvider';
import {ReactNode} from 'react';
import RoomProvider from '@/context/RoomProvider';
import FeedbackProvider from '@/context/FeedbackProvider';
import RoomDialogProvider from '@/context/RoomDialogProvider';
import RoomMessageProvider from '@/context/RoomMessageProvider';

const MainProvider = ({ children }: { children: ReactNode, }) => {
  return (
    <UserProvider>
      <RoomProvider>
        <FeedbackProvider>
          <RoomDialogProvider>
            <RoomMessageProvider>
              {children}
            </RoomMessageProvider>
          </RoomDialogProvider>
        </FeedbackProvider>
      </RoomProvider>
    </UserProvider>
  );
}

export default MainProvider;
