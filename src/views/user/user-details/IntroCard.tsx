import { Stack, Typography } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { IconMail, IconPhone } from '@tabler/icons';
import { UserType } from 'src/types/user';
import { formattedDate } from 'src/utils/usefulFunctions/formattedDate';

type IntroCardProps = {
  user: UserType;
};

const IntroCard = ({ user }: IntroCardProps) => (
  <ChildCard>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <IconMail size="21" />
      <Typography variant="h6">{user.email}</Typography>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <IconPhone size="21" />
      <Typography variant="h6">
        {user.phone_number} {user.phone_number_verified ? ' (Verified)' : ' (Not Verified)'}
      </Typography>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <Typography variant="body1">
        Created At: {user.createdAt ? formattedDate(user.createdAt) : 'N/A'}
      </Typography>
    </Stack>

    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <Typography variant="body1">
        Last Login At: {user.lastLogin ? formattedDate(user.lastLogin) : 'N/A'}
      </Typography>
    </Stack>
  </ChildCard>
);

export default IntroCard;
