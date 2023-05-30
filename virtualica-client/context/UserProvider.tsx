import {createContext, ReactNode, useState} from 'react';

export type UserType = {
  name: string,
  email: string,
}

interface UserContextProps {
  userData: UserType,
  handleSetUserData?: (userData: UserType) => void,
}

const initialUserContext: UserContextProps = {
  userData: {
    name: 'Aprijal Ghiyas Setiawan',
    email: 'aprijalghiyas@gmail.com',
  },
}

export const UserContext = createContext<UserContextProps>(initialUserContext);

const UserProvider = ({ children }: { children: ReactNode, }) => {
  const [userData, setUserData] = useState<UserType>(initialUserContext.userData);
  const handleSetUserData = (userData: UserType) => setUserData(userData);

  return (
    <UserContext.Provider value={{ userData, handleSetUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;
