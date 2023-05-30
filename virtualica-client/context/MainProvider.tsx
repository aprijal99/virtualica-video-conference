import UserProvider from '@/context/UserProvider';
import {ReactNode} from 'react';

const MainProvider = ({ children }: { children: ReactNode, }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}

export default MainProvider;
