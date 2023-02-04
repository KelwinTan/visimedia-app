import { css } from '@emotion/css';
import color from 'constants/color';

export const styCheckout = ({ sm }) =>
  css({
    display: 'flex',
    backgroundColor: 'white',
    borderBottom: '1px solid #dee2e6',
    padding: '1rem 0',
    ...(sm ? { flexDirection: 'column' } : {})
  });

export const stySummary = css({ padding: '1rem', alignSelf: 'flex-start' });

export const styAddress = css({
  borderRadius: '.25rem',
  padding: '.5rem',
  backgroundColor: 'white',
  ':not(:last-child)': {
    marginBottom: 14
  }
});
