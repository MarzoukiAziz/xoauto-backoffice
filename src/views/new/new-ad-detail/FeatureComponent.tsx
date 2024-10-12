import { Box, Typography } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import React from 'react';

type FeatureComponentProps = {
  iconPath: string;
  title: string;
  features: { [key: string]: string | boolean };
};
const FeatureComponent = ({ iconPath, title, features }: FeatureComponentProps) => {
  return (
    <Box p={2}>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          backgroundColor: '#0A7EA4',
          padding: '5px 15px',
          color: 'white',
        }}
      >
        <img src={require(`src/assets/images/icons/${iconPath}`)} alt="icon" width="13px" />
        <Typography fontWeight={600} variant="h4" ml={2}>
          {title}
        </Typography>
      </Box>
      <Box mt={2}>
        {Object.entries(features).map(([key, value]) => (
          <Box display="flex" justifyContent="space-between" key={title + key} mb={1}>
            <Typography variant="subtitle1" fontWeight={500}>
              {key}
            </Typography>
            {value === true ? (
              <Typography variant="subtitle1" color="success.main">
                <IconCheck />
              </Typography>
            ) : (
              <Typography variant="subtitle1">{value}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default FeatureComponent;
