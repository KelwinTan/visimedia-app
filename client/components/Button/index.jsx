import { cx } from '@emotion/css';
import { bool, func, node, string } from 'prop-types';
import { w100 } from 'styles/globals';
import {
  styButton,
  styButtonGhost,
  styButtonPrimary,
  styButtonSecondary
} from './styles';

export default function Button({
  primary,
  secondary,
  classnames,
  ghost,
  children,
  fullWidth,
  type,
  onClick
}) {
  const _classnames = [styButton, classnames];
  if (primary) {
    _classnames.push(styButtonPrimary);
  }
  if (secondary) {
    _classnames.push(styButtonSecondary);
  }
  if (ghost) {
    _classnames.push(styButtonGhost);
  }
  if (fullWidth) {
    _classnames.push(w100);
  }
  return (
    <button type={type} onClick={onClick} className={cx(_classnames)}>
      {children}
    </button>
  );
}

Button.propTypes = {
  primary: bool,
  secondary: bool,
  ghost: bool,
  children: node,
  classnames: string,
  type: string,
  onClick: func
};

Button.defaultProps = {
  primary: false,
  secondary: false,
  ghost: false,
  children: <></>,
  classnames: '',
  type: 'button',
  onClick: () => {}
};
