import { css } from '@emotion/css';
import { Card, Image, Input, Text } from '@nextui-org/react';
import TrashIcon from 'components/Icon/TrashIcon';
import toIDR from 'shared/currency/toIDR';
import { styCart, styCartDescription, styCartIncreDecre } from './style';

export default function CartItem({ cart }) {
  return (
    <div className={styCart}>
      <img
        width={64}
        height={64}
        style={{ margin: '0 !important' }}
        src={process.env.IMAGE_URL + cart.product_image}
      />
      <div className={styCartDescription}>
        <Text weight={'bold'} h5>
          {cart.product_name}
        </Text>
        <Text>Rp.{toIDR(cart.product_price)}</Text>
      </div>

      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto'
        })}
      >
        <TrashIcon />

        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem'
          })}
        >
          <div className={styCartIncreDecre}>-</div>
          <div>
            <Input />
          </div>
          <div className={styCartIncreDecre}>+</div>
        </div>
      </div>
    </div>
  );
}
