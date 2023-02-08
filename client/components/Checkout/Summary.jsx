import { css, cx } from '@emotion/css';
import { Card, Grid, Spacer, Text } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import Button from 'components/Button';
import auth from 'constants/auth';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import _axios from 'shared/axios';
import { hover } from 'styles/globals';
import { stySummary } from './style';

export default function Summary({ selectedAddress }) {
  const router = useRouter();
  const { mutateAsync: checkoutAPI } = useMutation(vars =>
    _axios.post('order-details', vars, {
      headers: {
        Authorization: `Bearer ${getCookie(auth.TOKEN)}`
      }
    })
  );

  const checkout = useCallback(() => {
    checkoutAPI({
      orders: [
        {
          product_id: 19,
          quantity: 1
        },
        {
          product_id: 5,
          quantity: 2
        }
      ],
      address_id: selectedAddress.id
    }).then(() => {
      router.push('/thankyou');
    });
  }, [checkoutAPI]);

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
          <Text>Rp 90.000</Text>
        </Grid>
      </Grid.Container>

      <Grid.Container>
        <Grid xs={4}>
          <Text>Total Diskon</Text>
        </Grid>
        <Grid xs={4}>
          <Text>Rp 90.000</Text>
        </Grid>
      </Grid.Container>

      <Spacer y={1} />

      <Grid.Container>
        <Grid xs={4}>
          <Text>Total Harga</Text>
        </Grid>
        <Grid xs={4}>
          <Text>Rp 90.000</Text>
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
