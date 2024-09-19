import { Link } from 'react-router-dom';
import { Box, CardContent, Grid, Typography } from '@mui/material';

import icon1 from '../../assets/images/svgs/icon-active-users.svg';
import icon2 from '../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../assets/images/svgs/icon-car.svg';
import icon4 from '../../assets/images/svgs/icon-view.svg';
import icon5 from '../../assets/images/svgs/icon-article.svg';
import { DashboardHighlightsType } from 'src/types/inshights';

interface cardType {
  href: string;
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
  moreInfo?: string;
}

type TopCardsProps = {
  data: DashboardHighlightsType
}


const TopCards = ({ data }: TopCardsProps) => {
  const topcards: cardType[] = [
    {
      href: '/users',
      icon: icon2,
      title: 'New Users',
      digits: `${data.newUsers}`,
      bgcolor: 'success',
    },
    {
      href: '/users',
      icon: icon1,
      title: 'Active Users',
      digits: `${data.activeUsersLast30Days}`,
      bgcolor: 'secondary',
    },
    {
      href: '/ad',
      icon: icon3,
      title: 'Ads',
      digits: `${data.newAdsLast30Days}`,
      bgcolor: 'warning',
    },
    {
      href: '/ad',
      icon: icon4,
      title: 'Ad Views',
      digits: `${data.adViewsLast30Days}`,
      bgcolor: 'primary',
    },
    {
      href: '/blog',
      icon: icon5,
      title: 'Articles',
      digits: `${data.newArticlesLast30Days}`,
      bgcolor: 'error',
    },
    {
      href: '/blog',
      icon: icon4,
      title: 'Article Views',
      digits: `${data.articleViewsLast30Days}`,
      bgcolor: 'primary',
    },
  ];

  return (<Box mt={3}>
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Link to={topcard.href}>
            <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
              <CardContent>
                <img src={topcard.icon} alt={topcard.icon} width="50" />
                <Typography
                  color={topcard.bgcolor + '.main'}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {topcard.title}
                </Typography>
                <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                  {topcard.digits}
                </Typography>
              </CardContent>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>

    <Box textAlign="right" >
      <Typography
        variant="caption"
        fontWeight={300}
      >
        Based on Last 30 Days
      </Typography>
    </Box>
  </Box>

  );
};

export default TopCards;
