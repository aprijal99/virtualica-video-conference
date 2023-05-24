import {Box} from '@mui/material';
import DashboardNavBar from '@/components/dashboard_components/DashboardNavBar';

const Dashboard = () => {
  return (
    <Box sx={{ maxWidth: '1000px', m: '0 auto', }}>
      <DashboardNavBar />
    </Box>
  );
}

export default Dashboard;
