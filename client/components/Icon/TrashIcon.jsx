import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import color from 'constants/color';
import { hover } from 'styles/globals';
import { number, string } from 'prop-types';

const TrashIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faTrash}
    />
  );
};

TrashIcon.propTyps = {
  color: string,
  width: number,
  height: number
};

TrashIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24
};

export default TrashIcon;
