import {Box} from '@mui/material';
import DashboardNavBar from '@/components/dashboard_components/DashboardNavBar';
import DashboardHome from '@/components/dashboard_components/DashboardHome';

const Dashboard = () => {
  return (
    <Box>
      <DashboardNavBar />
      <Box sx={{ p: '24px', }}>
        <DashboardHome />
      </Box>
    </Box>
  );
}

export default Dashboard;
