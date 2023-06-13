import {Box} from '@mui/material';
import DashboardNavBar from '@/components/dashboard_components/DashboardNavBar';
import DashboardHome from '@/components/dashboard_components/DashboardHome';
import DashboardRooms from '@/components/dashboard_components/DashboardRooms';
import {useContext, useEffect, useState} from 'react';
import DashboardContacts from '@/components/dashboard_components/DashboardContacts';
import jwtDecode from 'jwt-decode';
import {UserContext} from '@/context/UserProvider';
import {ApiType} from '@/type/api';
import {GetServerSideProps, Redirect} from 'next';
import cookie from 'cookie';
import {RoomContext, RoomType} from '@/context/RoomProvider';
import {FeedbackContext} from '@/context/FeedbackProvider';
import CustomBackdrop from '@/components/feedback_components/CustomBackdrop';
import CustomSnackbar from '@/components/feedback_components/CustomSnackbar';

const Dashboard = ({ userName, userEmail }: { userName: string, userEmail: string, }) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const { backdrop, alert, alertMessage, toggleAlert } = useContext(FeedbackContext);
  const { handleSetUserData } = useContext(UserContext);
  const { handleAddRoomList } = useContext(RoomContext);

  useEffect(() => {
    handleSetUserData!({ name: userName, email: userEmail });
    getRoomList();
  }, []);

  const getRoomList = async () => {
    const fetchResult = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room/room-list/${userEmail}`);
    const apiResult: ApiType<RoomType[]> = await fetchResult.json();
    if (handleAddRoomList) handleAddRoomList(apiResult.data as RoomType[]);
  }

  return (
    <Box>
      <DashboardNavBar tabValue={tabValue} changeTab={((n) => setTabValue(n))} />
      <Box sx={{ p: '24px', }}>
        {tabValue === 0 && <DashboardHome />}
        {tabValue === 1 && <DashboardRooms />}
        {tabValue === 2 && <DashboardContacts />}
      </Box>

      <CustomBackdrop backdropLoading={backdrop} />
      <CustomSnackbar openAlert={alert} closeAlert={() => toggleAlert && toggleAlert()} alertMessage={alertMessage.message} alertSeverity={alertMessage.severity} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect: Redirect = {
    destination: '/',
    statusCode: 302,
  }

  if (ctx.req.method === 'POST') {
    ctx.res.setHeader('Set-Cookie', [
      cookie.serialize('access_token', '', { maxAge: 0, }),
      cookie.serialize('user_name', '', { maxAge: 0, }),
      cookie.serialize('user_email', '', { maxAge: 0, }),
    ]);

    return { redirect, }
  }

  const accessToken: string | undefined = ctx.req.cookies['access_token'];
  if (accessToken === undefined) return { redirect, }

  const decodedAccessToken: { sub: string, roles: string[], iss: string, exp: number, } = jwtDecode(accessToken);
  const isValid: boolean = decodedAccessToken.exp > Date.now() / 1000;
  if (!isValid) return { redirect, }

  const userName: string | undefined = ctx.req.cookies['user_name'];
  const userEmail: string | undefined = ctx.req.cookies['user_email'];

  return {
    props: {
      userName: userName as string,
      userEmail: userEmail as string,
    },
  }
}

export default Dashboard;
