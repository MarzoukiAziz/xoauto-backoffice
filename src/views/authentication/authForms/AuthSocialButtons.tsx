import icon1 from 'src/assets/images/svgs/google-icon.svg';
import CustomSocialButton from '../../../components/forms/theme-elements/CustomSocialButton';
import { Avatar, Box, Stack } from '@mui/material';
import useAuth from 'src/guards/authGuard/UseAuth';
import { signInType } from 'src/types/auth/auth';

const AuthSocialButtons = ({ title }: signInType) => {
  const { loginWithGoogle } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <CustomSocialButton onClick={handleLoginGoogle}>
          <Avatar
            src={icon1}
            alt={icon1}
            sx={{
              width: 16,
              height: 16,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box
            sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}
          >
            {title}
          </Box>{' '}
          Google
        </CustomSocialButton>
      </Stack>
    </>
  );
};
export default AuthSocialButtons;
