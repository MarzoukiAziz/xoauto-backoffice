import React, { SyntheticEvent, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Avatar,
} from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { AdType } from 'src/types/ad';
import { a11yProps, TabPanel } from '../../../components/shared/TabPanel';
import { UserType } from 'src/types/user';
import { formattedDate } from 'src/utils/usefulFunctions/formattedDate';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';

type AdDescriptionProps = {
  ad: AdType;
  user: UserType;
};

const AdDescription = ({ ad, user }: AdDescriptionProps) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ChildCard>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'grey.100' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            allowScrollButtonsMobile
            scrollButtons
            indicatorColor="primary"
          >
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Options" {...a11yProps(1)} />
            <Tab label="Videos" {...a11yProps(2)} />
            <Tab label="Contact" {...a11yProps(3)} />
            <Tab label="Statics" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography variant="h6">Description</Typography>
          <br />
          <Typography>{ad.description}</Typography>
          <br />
          <br />
          <Typography variant="h6">Current Charging:</Typography>
          <ul>
            {ad?.courant?.AC && <li>AC: {ad.courant.AC}</li>}
            {ad?.courant?.DC && <li>DC: {ad.courant.DC}</li>}
          </ul>
          <br />
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Fuel Type</TableCell>
                  <TableCell>{ad.fuel_type ?? 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Seats</TableCell>
                  <TableCell>{ad.seats ?? 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Color</TableCell>
                  <TableCell>{ad.color ?? 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Crit'Air</TableCell>
                  <TableCell>{ad.crit_air ?? 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Horse Power</TableCell>
                  <TableCell>{ad.horsepower ?? 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Power Kw</TableCell>
                  <TableCell>{ad.power_kw ?? 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Autonomy Wlt/Km</TableCell>
                  <TableCell>{ad.autonomy_wltp_km ?? 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h6">InDoor Equipments:</Typography>
          <ul>
            {ad.equipments?.indoor?.map((eq: string, index: number) => (
              <li key={index}>{eq}</li>
            ))}
          </ul>

          <Typography variant="h6">OutDoor Equipments:</Typography>
          <ul>
            {ad.equipments?.outdoor?.map((eq: string, index: number) => (
              <li key={index}>{eq}</li>
            ))}
          </ul>

          <Typography variant="h6">Safety Equipments:</Typography>
          <ul>
            {ad.equipments?.safety?.map((eq: string, index: number) => (
              <li key={index}>{eq}</li>
            ))}
          </ul>

          <Typography variant="h6">Functional Equipments:</Typography>
          <ul>
            {ad.equipments?.functional?.map((eq: string, index: number) => (
              <li key={index}>{eq}</li>
            ))}
          </ul>

          <Typography variant="h6">Available Options:</Typography>
          <ul>
            {ad.options_vehicule?.non_smoker && <li>Non-Smoker</li>}
            {ad.options_vehicule?.first_hand && <li>First Hand</li>}
            {ad.options_vehicule?.manufacturer_warranty && <li>Manufacturer Warranty</li>}
            <br />
            <li>Others : </li>
            <ul>
              {ad.options_vehicule?.others?.length
                ? ad.options_vehicule.others.map((option, index) =>
                    option.length ? <li key={index}>{option}</li> : '',
                  )
                : ''}
            </ul>
          </ul>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="h6">Videos</Typography>
          <br />
          {ad.interior_video ? (
            <div>
              <Typography variant="subtitle1">Interior Video :</Typography>
              <br />
              <iframe
                width="560"
                height="315"
                src={ad.interior_video}
                title="Interior Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <Typography>No interior video available</Typography>
          )}
          <br />
          {ad.exterior_video ? (
            <div>
              <Typography variant="subtitle1">Exterior Video :</Typography>
              <br />
              <iframe
                width="560"
                height="315"
                src={ad.exterior_video}
                title="Exterior Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <Typography>No exterior video available</Typography>
          )}
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Typography variant="h6">Ad Contact Information</Typography>
          <br />
          <Typography variant="body1">
            {ad.address ? `Address : ${ad.address}` : 'Address not provided'}
          </Typography>
          <Typography variant="body1">
            {ad.region ? `Region : ${ad.region}` : 'Region not provided'}
          </Typography>
          <Typography variant="body1">
            Phone : {ad.phone_number}
            {ad.mask_phone ? ' - Hidden' : ''}
          </Typography>
          <br />
          <br />
          <Typography variant="h6">User Information</Typography>
          <br />
          <Box display="flex" alignItems="center">
            <Avatar
              src={user?.avatar ? user.avatar : ProfileImg}
              alt="Admin Avatar"
              sx={{ width: 95, height: 95 }}
            />
            <Box ml={2}>
              {' '}
              {/* Adds margin to the left of the text box */}
              <Typography variant="body1">{`Name: ${user?.name}`}</Typography>
              <Typography variant="body1">{`Email: ${user?.email}`}</Typography>
              <Typography variant="body1">{`Member since: ${
                user?.createdAt ? formattedDate(user.createdAt) : 'N/A'
              }`}</Typography>
              <Typography variant="body1">{`Pro: ${user?.pro ? 'Yes' : 'No'}`}</Typography>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Typography variant="h6"> Soon ..</Typography>
        </TabPanel>
      </Box>
    </ChildCard>
  );
};

export default AdDescription;
