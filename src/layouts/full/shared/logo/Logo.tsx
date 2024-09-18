import { FC } from 'react';
import { useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
import logoLight from 'src/assets/images/logos/logo-light.png';
import logoDark from 'src/assets/images/logos/logo-dark.png';
import logoSmallLight from 'src/assets/images/logos/logo-sm-light.png';
import logoSmallDark from 'src/assets/images/logos/logo-sm-dark.png';
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

  const ImgStyled = styled('img')(() => ({
    width: '100%',
    height: 'auto',
  }));

  return (
    <LinkStyled to="/">
      {customizer.activeMode === 'dark' ? (
        <ImgStyled src={customizer.isCollapse ? logoSmallLight : logoLight} alt="XoAuto Logo Light" />
      ) : (
        <ImgStyled src={customizer.isCollapse ? logoSmallDark : logoDark} alt="XoAuto Logo Dark" />
      )}
    </LinkStyled>
  );
};

export default Logo;
