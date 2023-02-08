import { css } from '@emotion/css';
import { Card, Image, Input, Text } from '@nextui-org/react';
import Button from 'components/Button';
import TrashIcon from 'components/Icon/TrashIcon';
import color from 'constants/color';
import { useMediaQuery, useMediaQueryBetween } from 'hooks/useMediaQuery';
import { useCallback } from 'react';
import toIDR from 'shared/currency/toIDR';
import { dFlex } from 'styles/globals';
import { styCheckout } from './style';
import generalConst from 'constants/general';

export default function CheckoutList(props) {
  const { data: cart } = props;
  const { cart_item, product_detail } = cart || {};

  const isBetweenSMAndMD = useMediaQueryBetween({ min: 320, max: 425 });

  return (
    <div className={styCheckout({ sm: isBetweenSMAndMD })}>
      <div className={dFlex}>
        <Image
          width={64}
          height={64}
          src={process.env.IMAGE_URL + product_detail.public_image_url}
          className={css({ margin: '0' })}
        />
        <div className={css({ marginLeft: isBetweenSMAndMD ? 0 : 10 })}>
          <Text weight="bold">{product_detail.name}</Text>
          <Text>Rp.{toIDR(Number(product_detail.price))}</Text>
        </div>
      </div>
    </div>
  );
}
