import {Box} from '@mui/material';
import DashboardNavBar from '@/components/dashboard_components/DashboardNavBar';
import DashboardHome from '@/components/dashboard_components/DashboardHome';
import DashboardRooms from '@/components/dashboard_components/DashboardRooms';
import {useState} from 'react';

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      <DashboardNavBar tabValue={tabValue} changeTab={((n) => setTabValue(n))} />
      <Box sx={{ p: '24px', }}>
        {tabValue === 0 && <DashboardHome />}
        {tabValue === 1 && <DashboardRooms />}
        {tabValue === 2 && <Box />}
      </Box>
    </Box>
  );
}

export default Dashboard;
