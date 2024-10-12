import { SyntheticEvent, useState } from 'react';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { a11yProps, TabPanel } from '../../../components/shared/TabPanel';
import { ModelType, VersionType } from 'src/types/new';
import Carousel from 'src/components/carousel/Carousel';
import NewAdDetail from './VersionDetail';
import FeatureComponent from './FeatureComponent';

type VersionTechnicalSheetProps = {
  model: ModelType;
};

const VersionTechnicalSheet = ({ model }: VersionTechnicalSheetProps) => {
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
            {model.versions.map((version: VersionType, index) => (
              <Tab key={index} label={version.version} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {model.versions.map((version: VersionType, index) => (
          <TabPanel value={value} index={index} key={index}>
            <Grid item xs={12} sm={12} lg={12}>
              <ChildCard>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} lg={6}>
                    <Box key={version.preview}>
                      <img
                        src={version.preview}
                        alt={version.preview}
                        width="100%"
                        style={{ borderRadius: '5px' }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <NewAdDetail
                      brand={model.brand}
                      model={model.model}
                      version={version}
                      versionsLengh={model.versions.length}
                    />
                  </Grid>
                </Grid>
              </ChildCard>
            </Grid>
            <Carousel photos={version.photos} />

            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Characteristics"
                    iconPath="ic1.png"
                    features={version.technical_sheet.features}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Engine"
                    iconPath="ic2.png"
                    features={version.technical_sheet.motor}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Transmission"
                    iconPath="ic3.png"
                    features={version.technical_sheet.transmission}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Performance"
                    iconPath="ic4.png"
                    features={version.technical_sheet.performance}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Consumption"
                    iconPath="ic5.png"
                    features={version.technical_sheet.consumption}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Dimensions"
                    iconPath="ic6.png"
                    features={version.technical_sheet.dimensions}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Driver Assistance"
                    iconPath="ic12.png"
                    features={version.technical_sheet.driving_aids}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Audio and Multimedia Options"
                    iconPath="ic11.png"
                    features={version.technical_sheet.multimedia}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Exterior Equipment"
                    iconPath="ic7.png"
                    features={version.technical_sheet.outdoor_equipment}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Interior Equipment"
                    iconPath="ic8.png"
                    features={version.technical_sheet.indoor_equipment}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Safety Equipment"
                    iconPath="ic9.png"
                    features={version.technical_sheet.safety_equipment}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureComponent
                    title="Functional Equipment"
                    iconPath="ic10.png"
                    features={version.technical_sheet.functional_equipment}
                  />
                </Grid>
              </Grid>{' '}
            </Box>
          </TabPanel>
        ))}
      </Box>
    </ChildCard>
  );
};

export default VersionTechnicalSheet;
