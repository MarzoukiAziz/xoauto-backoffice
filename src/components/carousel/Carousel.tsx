import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import { IconPhotoOff } from '@tabler/icons';

type CarouselProps = {
  photos: string[];
};

const Carousel = ({ photos }: CarouselProps) => {
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
  if (photos && photos.length > 0) {
    return (
      <Box>
        <Slider asNavFor={nav2} ref={(slider: any) => (slider1.current = slider)}>
          {photos.map((photo) => (
            <Box key={photo}>
              <img src={photo} alt={photo} width="100%" style={{ borderRadius: '5px' }} />
            </Box>
          ))}
        </Slider>
        <Slider asNavFor={nav1} ref={(slider: any) => (slider2.current = slider)} {...settings}>
          {photos.map((photo) => (
            <Box key={photo} sx={{ p: 1, cursor: 'pointer' }}>
              <img src={photo} alt={photo} width="100%" style={{ borderRadius: '5px' }} />
            </Box>
          ))}
        </Slider>
      </Box>
    );
  }

  return (
    <Typography variant="h4" style={{ textAlign: 'center', marginTop: 80 }}>
      No Photos <IconPhotoOff />
    </Typography>
  );
};

export default Carousel;
