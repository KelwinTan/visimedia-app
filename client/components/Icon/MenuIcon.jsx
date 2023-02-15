import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import color from 'constants/color';
import { hover } from 'styles/globals';
import { number, string } from 'prop-types';

const MenuIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faGears}
    />
  );
};

MenuIcon.propTyps = {
  color: string,
  width: number,
  height: number
};

MenuIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24
};

export default MenuIcon;
