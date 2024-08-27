import { FC } from 'react';
import { useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
import logo from 'src/assets/images/logos/logo.png';

import { styled } from '@mui/material';
import { AppState } from 'src/store/Store';

const Logo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled to="/">
        {customizer.activeMode === 'dark' ? (
          <img src={logo} alt={logo} width={'180px'} />
        ) : (
          <img src={logo} alt={logo} width={'180px'} />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled to="/">
      {customizer.activeMode === 'dark' ? (
        <img src={logo} alt={logo} width={'180px'} />
      ) : (
        <img src={logo} alt={logo} width={'180px'} />
      )}
    </LinkStyled>
  );
};

export default Logo;
