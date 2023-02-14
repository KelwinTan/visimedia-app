import { css, cx } from '@emotion/css';
import { Card, Grid, Spacer, Text } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'components/Button';
import auth from 'constants/auth';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import _axios from 'shared/axios';
import toIDR from 'shared/currency/toIDR';
import { hover } from 'styles/globals';
import { stySummary } from './style';

export default function Summary({ selectedAddress, subHarga }) {
  const router = useRouter();
  const client = useQueryClient();

  const { mutateAsync: checkoutAPI } = useMutation(vars =>
    _axios.post('cart-items/checkout/order', vars, {
      headers: {
        Authorization: `Bearer ${getCookie(auth.TOKEN)}`
      }
    })
  );

  const { mutateAsync: removeCart } = useMutation(vars =>
    _axios.delete(`cart-items/${vars.cartId}`, {
      headers: {
        Authorization: `Bearer ${getCookie(auth.TOKEN)}`
      }
    })
  );

  const checkout = useCallback(() => {
    checkoutAPI({
      address_id: selectedAddress.id
    }).then(() => {
      const cartItems = client.getQueryData(['carts']);
      Promise.all(
        cartItems.map(item => removeCart({ cartId: item.cart_item.id }))
      ).then(() => {
        client.removeQueries(['carts']);
        router.push('/thankyou');
      });
    });
  }, [checkoutAPI, selectedAddress]);

  return (
    <Card className={stySummary}>
      <Text weight="bold" h3>
        Rangkuman
      </Text>
      <Grid.Container>
        <Grid xs={4}>
          <Text>Subtotal</Text>
        </Grid>
        <Grid xs={4}>
          <Text>Rp.{toIDR(subHarga)}</Text>
        </Grid>
      </Grid.Container>

      <Spacer y={1} />

      <Grid.Container>
        <Grid xs={4}>
          <Text>Total Harga</Text>
        </Grid>
        <Grid xs={4}>
          <Text>Rp.{toIDR(subHarga)}</Text>
        </Grid>
      </Grid.Container>

      <Button
        primary
        classnames={cx(hover, css({ marginTop: 7 }))}
        onClick={checkout}
      >
        Checkout
      </Button>
    </Card>
  );
}
