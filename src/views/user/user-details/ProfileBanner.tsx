import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  CardMedia,
  styled,
  Chip,
} from '@mui/material';
import profilecover from 'src/assets/images/backgrounds/profilebg.jpg';
import { IconCar } from '@tabler/icons';
import BlankCard from 'src/components/shared/BlankCard';
import { UserType } from 'src/types/user';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { useSelector } from 'react-redux';
import { AppState, dispatch } from 'src/store/Store';
import axiosServices from 'src/utils/axios';
import { fetchUser } from 'src/store/user/UserSlice';
import { showNotification } from 'src/store/notification/NotificationSlice';

type ProfileBannerProps = {
  user: UserType;
};
const ProfileBanner = ({ user }: ProfileBannerProps) => {
  const USER_API_URL = process.env.REACT_APP_USER_API_URL;

  const ProfileImage = styled(Box)(() => ({
    backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  }));

  const handleSendEmail = (email: string) => {
    window.location.href = 'mailto:' + email;
  };

  const handleChangeUserAccess = async () => {
    const action = user.enable ? 'Disable' : 'Enable';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        const response = await axiosServices.put(`${USER_API_URL}/cognito/change-user-access`, {
          username: user.id,
          action: user.enable ? 'disable' : 'enable',
        });

        dispatch(fetchUser(user._id));

        dispatch(
          showNotification({
            title: 'Info',
            subtitle: response.data,
            severity: 'info',
          }),
        );
      } catch (err: any) {
        console.log(err);
        throw new Error(err);
      }
    }
  };

  const adsCount: number = useSelector((state: AppState) => state.adReducer.count);

  return (
    <>
      <BlankCard>
        <CardMedia component="img" image={profilecover} alt={profilecover} width="100%" />
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid
            item
            lg={4}
            sm={12}
            md={5}
            xs={12}
            sx={{
              order: {
                xs: '2',
                sm: '2',
                lg: '1',
              },
            }}
          >
            <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
              <Box>
                <Typography color="text.secondary">
                  <IconCar width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {adsCount}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Ads
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '1',
                sm: '1',
                lg: '2',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: '-85px',
              }}
            >
              <Box>
                <ProfileImage>
                  <Avatar
                    src={user.avatar ? user.avatar : ProfileImg}
                    alt={`${user.name} avatar`}
                    sx={{
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                      border: '4px solid #fff',
                    }}
                  />
                </ProfileImage>
                {user.pro ? (
                  <Chip
                    sx={{
                      marginLeft: 'auto',
                      marginTop: '5px',
                      backgroundColor: 'green',
                      color: 'white',
                    }}
                    label="Pro"
                    size="small"
                  ></Chip>
                ) : (
                  <Chip
                    sx={{
                      marginLeft: 'auto',
                      marginTop: '5px',
                      backgroundColor: 'grey',
                      color: 'white',
                    }}
                    label="Particular"
                    size="small"
                  ></Chip>
                )}
                <Box mt={1}>
                  <Typography fontWeight={600} variant="h5">
                    {user.name}
                  </Typography>
                  <Typography color="textSecondary" variant="h6" fontWeight={400}>
                    {user.roles?.join(', ')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '3',
                sm: '3',
                lg: '3',
              },
            }}
          >
            <Stack direction={'row'} gap={2} alignItems="center" justifyContent="center" my={2}>
              <Button
                color={user.enable ? 'error' : 'success'}
                variant="contained"
                onClick={() => handleChangeUserAccess()}
              >
                {user.enable ? 'Disable' : 'Enable'}
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleSendEmail(user.email)}
              >
                Send Email
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
