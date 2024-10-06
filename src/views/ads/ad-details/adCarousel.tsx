import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import { AdType } from 'src/types/ad';

type AdCarouselProps = {
  ad: AdType;
};

const AdCarousel = ({ ad }: AdCarouselProps) => {
  const [state, setState] = useState<any>({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const { nav1, nav2 } = state;
  const settings = {
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 4,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: true,
    className: 'centerThumb',
    speed: 500,
  };

  return (
    ad && (
      <Box>
        <Slider asNavFor={nav2} ref={(slider: any) => (slider1.current = slider)}>
          {ad.photos.map((photo) => (
            <Box key={photo}>
              <img src={photo} alt={ad._id} width="100%" style={{ borderRadius: '5px' }} />
            </Box>
          ))}
        </Slider>
        <Slider asNavFor={nav1} ref={(slider: any) => (slider2.current = slider)} {...settings}>
          {ad.photos.map((photo) => (
            <Box key={photo} sx={{ p: 1, cursor: 'pointer' }}>
              <img src={photo} alt={ad._id} width="100%" style={{ borderRadius: '5px' }} />
            </Box>
          ))}
        </Slider>
      </Box>
    )
  );
};

export default AdCarousel;
