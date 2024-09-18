import React, { SyntheticEvent, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper, Box, Tabs, Tab } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { AdType } from 'src/types/ad';
import { a11yProps, TabPanel } from './tabPanel';

type AdDescProps = {
    ad: AdType;
};

const AdDesc = ({ ad }: AdDescProps) => {
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
                    <Typography >
                        {ad.description}
                    </Typography>
                    <br /><br />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Fuel Type</TableCell>
                                    <TableCell>{ad.fuel_type ?? "N/A"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Seats</TableCell>
                                    <TableCell>{ad.seats ?? "N/A"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Color</TableCell>
                                    <TableCell>{ad.color ?? "N/A"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Crit'Air</TableCell>
                                    <TableCell>{ad.crit_air ?? "N/A"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Horse Power</TableCell>
                                    <TableCell>{ad.horsepower ?? "N/A"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Power Kw</TableCell>
                                    <TableCell>{ad.power_kw ?? "N/A"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Autonomy WltpKm</TableCell>
                                    <TableCell>{ad.autonomy_wltp_km ?? "N/A"}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Typography variant="h6">Available Options:</Typography>
                    <ul>
                        {ad.options_vehicule?.heads_up_display && <li>Heads-Up Display</li>}
                        {ad.options_vehicule?.parking_assist && <li>Parking Assist</li>}
                        {ad.options_vehicule?.tow_hitch && <li>Tow Hitch</li>}
                        {ad.options_vehicule?.roof_racks && <li>Roof Racks</li>}
                        {ad.options_vehicule?.bluetooth && <li>Bluetooth</li>}
                        {ad.options_vehicule?.rear_camera && <li>Rear Camera</li>}
                        {ad.options_vehicule?.automatic_climate_control && <li>Automatic Climate Control</li>}
                        {ad.options_vehicule?.gps && <li>GPS</li>}
                        {ad.options_vehicule?.non_smoker && <li>Non-Smoker</li>}
                        {ad.options_vehicule?.first_hand && <li>First Hand</li>}
                        {ad.options_vehicule?.rear_radar && <li>Rear Radar</li>}
                        {ad.options_vehicule?.leather_seats && <li>Leather Seats</li>}
                        {ad.options_vehicule?.heated_seats && <li>Heated Seats</li>}
                        {ad.options_vehicule?.manufacturer_warranty && <li>Manufacturer Warranty</li>}
                        {ad.options_vehicule?.sound_system && <li>Sound System</li>}
                        {ad.options_vehicule?.sunroof && <li>Sunroof</li>}
                        {ad.options_vehicule?.panoramic_roof && <li>Panoramic Roof</li>}
                        {ad.options_vehicule?.others?.length ? <li>Other Options: {ad.options_vehicule.others.join(', ')}</li> : ""}
                    </ul>
                    <br /><br />
                    <Typography variant="h6">Current Charging:</Typography>
                    <ul>
                        {ad.courant.AC && <li>AC: {ad.courant.AC}</li>}
                        {ad.courant.DC && <li>DC: {ad.courant.DC}</li>}
                    </ul>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Typography variant="h6">Videos</Typography><br />
                    {ad.interior_video ? (
                        <div>
                            <Typography variant="subtitle1">Interior Video :</Typography><br />
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
                            <Typography variant="subtitle1">Exterior Video :</Typography><br />
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
                    <Typography variant="h6">Contact Information</Typography>
                    <p>
                        {ad.address ? `Address: ${ad.address}` : "Address not provided"}
                    </p>
                    <p>Phone: {ad.phone_number} - {ad.mask_phone ? "Phone number is hidden." : "Phone number not provided"}</p>
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <Typography variant="h6">Statics Soon ..</Typography>
                </TabPanel>
            </Box>
        </ChildCard>)
};

export default AdDesc;
