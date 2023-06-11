import {createContext, ReactNode, useState} from 'react';

interface RoomDialogContextProps {
  dialogStatus: '' | 'people' | 'message' | 'info',
  changeDialogStatus?: (dialogStatus: '' | 'people' | 'message' | 'info') => void,
}

const initialRoomDialogContext: RoomDialogContextProps = {
  dialogStatus: 'people',
}

export const RoomDialogContext = createContext<RoomDialogContextProps>(initialRoomDialogContext);

const RoomDialogProvider = ({ children }: { children: ReactNode, }) => {
  const [dialogStatus, setDialogStatus] = useState<'' | 'people' | 'message' | 'info'>(initialRoomDialogContext.dialogStatus);
  const changeDialogStatus = (dialogStatus: '' | 'people' | 'message' | 'info') => setDialogStatus(dialogStatus);

  return (
    <RoomDialogContext.Provider value={{ dialogStatus, changeDialogStatus }}>
      {children}
    </RoomDialogContext.Provider>
  );
}

export default RoomDialogProvider;
