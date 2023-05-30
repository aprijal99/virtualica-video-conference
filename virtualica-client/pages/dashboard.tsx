import {Box} from '@mui/material';
import DashboardNavBar from '@/components/dashboard_components/DashboardNavBar';
import DashboardHome from '@/components/dashboard_components/DashboardHome';
import DashboardRooms from '@/components/dashboard_components/DashboardRooms';
import {useContext, useEffect, useState} from 'react';
import DashboardContacts from '@/components/dashboard_components/DashboardContacts';
import jwtDecode from 'jwt-decode';
import {UserContext, UserType} from '@/context/UserProvider';
import {ApiType} from '@/type/api';
import {GetServerSideProps} from 'next';

const Dashboard = ({ userData }: { userData: UserType, }) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const { handleSetUserData } = useContext(UserContext);

  useEffect(() => {
    if (handleSetUserData) handleSetUserData(userData);
  }, []);

  return (
    <Box>
      <DashboardNavBar tabValue={tabValue} changeTab={((n) => setTabValue(n))} />
      <Box sx={{ p: '24px', }}>
        {tabValue === 0 && <DashboardHome />}
        {tabValue === 1 && <DashboardRooms />}
        {tabValue === 2 && <DashboardContacts />}
      </Box>
    </Box>
  );
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken: string | undefined = ctx.req.cookies['access_token'];
  if (accessToken === undefined) return  {
    redirect: {
      destination: '/',
      statusCode: 302,
    },
  }

  const decodedAccessToken: { sub: string, roles: string[], iss: string, exp: number, } = jwtDecode(accessToken);
  const isValid: boolean = decodedAccessToken.exp > Date.now() / 1000;
  if (!isValid) return  {
    redirect: {
      destination: '/',
      statusCode: 302,
    },
  }

  const result = await fetch(`http://localhost:7181/user?email=${decodedAccessToken.sub}`);
  const apiResult: ApiType<UserType> = await result.json();

  return {
    props: {
      userData: apiResult.data,
    },
  }
}
