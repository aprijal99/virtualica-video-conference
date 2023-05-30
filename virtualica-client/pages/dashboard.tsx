import {Box} from '@mui/material';
import DashboardNavBar from '@/components/dashboard_components/DashboardNavBar';
import DashboardHome from '@/components/dashboard_components/DashboardHome';
import DashboardRooms from '@/components/dashboard_components/DashboardRooms';
import {useContext, useState} from 'react';
import DashboardContacts from '@/components/dashboard_components/DashboardContacts';
import {GetServerSidePropsContext} from 'next';
import jwtDecode from 'jwt-decode';
import {UserContext} from '@/context/UserProvider';

const Dashboard = ({ email }: { email: string, }) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const { handleSetUserData } = useContext(UserContext);



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

export const getServerSideProps: (ctx: GetServerSidePropsContext) => Promise<{ redirect: { destination: string } } | { props: {} }> = async (ctx) => {
  const accessToken: string | undefined = ctx.req.cookies['access_token'];
  if (accessToken === undefined) return  {
    redirect: {
      destination: '/',
    },
  }

  const decodedAccessToken: { sub: string, roles: string[], iss: string, exp: number, } = jwtDecode(accessToken);
  const isValid: boolean = decodedAccessToken.exp > Date.now() / 1000;
  if (!isValid) return  {
    redirect: {
      destination: '/',
    },
  }

  return {
    props: {
      email: decodedAccessToken.sub,
    },
  }
}
