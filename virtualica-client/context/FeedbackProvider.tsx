import {AlertColor} from '@mui/material';
import {createContext, ReactNode, useState} from 'react';

type AlertMessageType = {
  severity: AlertColor,
  message: string,
}

interface FeedbackContextProps {
  backdrop: boolean,
  alert: boolean,
  alertMessage: AlertMessageType,
  toggleBackdrop?: () => void,
  toggleAlert?: () => void,
  handleSetAlertMessage?: (alertMessage: AlertMessageType) => void,
}

const initialFeedbackContext: FeedbackContextProps = {
  backdrop: false,
  alert: false,
  alertMessage: {
    severity: 'success',
    message: '',
  },
}

export const FeedbackContext = createContext<FeedbackContextProps>(initialFeedbackContext);

const FeedbackProvider = ({ children }: { children: ReactNode, }) => {
  const [backdrop, setBackdrop] = useState<boolean>(initialFeedbackContext.backdrop);
  const [alert, setAlert] = useState<boolean>(initialFeedbackContext.alert);
  const [alertMessage, setAlertMessage] = useState<AlertMessageType>(initialFeedbackContext.alertMessage);

  const toggleBackdrop = () => setBackdrop(prevState => !prevState);
  const toggleAlert = () => setAlert(prevState => !prevState);
  const handleSetAlertMessage = (alertMessage: AlertMessageType) => setAlertMessage(alertMessage);

  return (
    <FeedbackContext.Provider
      value={{ backdrop, alert, alertMessage, toggleBackdrop, toggleAlert, handleSetAlertMessage }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackProvider;
