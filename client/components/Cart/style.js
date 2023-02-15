import { css } from '@emotion/css';
import color from 'constants/color';

export const styCart = css({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid #dee2e6`,
  width: '100%',
  padding: '1rem'
});

export const styCartDescription = css({
  marginLeft: 7
});

export const styCartActionContainer = css({
  marginLeft: 'auto',
  alignSelf: 'flex-end'
});

export const styCartIncreDecre = css({
  width: 24,
  height: 24,
  border: `1px solid ${color.primary}`,
  color: color.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  ':first-child': {
    marginRight: 10
  },
  ':last-child': {
    marginLeft: 10
  },
  ':hover': {
    cursor: 'pointer'
  }
});
