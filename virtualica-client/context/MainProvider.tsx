import React from 'react';
import UserProvider from '@/context/UserProvider';

const MainProvider: React.FC = ({ children }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}

export default MainProvider;
