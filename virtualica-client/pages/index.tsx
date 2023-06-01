import {Box, Link, Typography} from '@mui/material';
import {GitHub, LinkedIn} from '@mui/icons-material';
import Carousel from '@/components/home_components/Carousel';
import Banner from '@/components/home_components/Banner';
import HomeNavBar from '@/components/home_components/HomeNavBar';
import {useContext} from 'react';
import {FeedbackContext} from '../context/FeedbackProvider';
import CustomBackdrop from '../components/feedback_components/CustomBackdrop';
import CustomSnackbar from '../components/feedback_components/CustomSnackbar';
import {GetServerSideProps} from 'next';

const Home = ({ isAuth }: { isAuth: boolean, }) => {
  const { backdrop, alert, alertMessage, toggleAlert } = useContext(FeedbackContext);

  return (
    <Box sx={{ maxWidth: '1000px', m: '0 auto', }}>
      {/* NAVBAR */}
      <HomeNavBar isAuth={isAuth} />

      <Box
        sx={{
          px: '24px', my: 3,
          '@media (min-width: 460px)': { mt: 5, }, '@media (min-width: 530px)': { mt: 7, }, '@media (min-width: 600px)': { mt: 9, },
        }}
      >
        {/* BANNER */}
        <Banner />

        {/* CAROUSEL */}
        <Carousel />

        {/* CREATED BY*/}
        <Typography
          align='center' gutterBottom={true}
          sx={{ mt: 10, fontWeight: '300', }}
        >
          Created by <Link underline='none' target='_blank' href='https://www.aprijal-ghiyas.tech'>
          Aprijal Ghiyas Setiawan</Link>
        </Typography>
        <Box display='flex' justifyContent='center' columnGap='10px'>
          <Link target='_blank' href='https://github.com/aprijal99'><GitHub sx={{ color: 'white', }} /></Link>
          <Link target='_blank' href='https://www.linkedin.com/in/aprijalghiyas/'><LinkedIn sx={{ color: 'white', }} /></Link>
        </Box>
      </Box>

      <CustomBackdrop backdropLoading={backdrop} />
      <CustomSnackbar openAlert={alert} closeAlert={() => toggleAlert && toggleAlert()} alertMessage={alertMessage.message} alertSeverity={alertMessage.severity} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken: string | undefined = ctx.req.cookies['access_token'];
  if (accessToken === undefined) {
    return {
      props: {
        isAuth: false,
      },
    }
  }

  return {
    props: {
      isAuth: true,
    },
  }
}

export default Home;
