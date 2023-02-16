import { css, cx } from '@emotion/css';
import { Card, Divider, Grid, Text } from '@nextui-org/react';
import Button from 'components/Button';
import EmptyData from 'components/Empty';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import toIDR from 'shared/currency/toIDR';
import { hover } from 'styles/globals';
import CartItem from './CartItem';

export default function Cart({ carts = [] }) {
  const router = useRouter();

  const subHarga = useMemo(() => {
    return carts.reduce(
      (curr, data) =>
        curr + data.cart_item.quantity * +data.product_detail.price,
      0
    );
  }, [carts]);

  if (!carts.length) {
    return <EmptyData />;
  }
  return (
    <Grid.Container>
      <Grid xs={12} sm={8}>
        <div style={{ width: '100%' }}>
          {carts.map((cart, idx) => {
            return <CartItem key={idx} cart={cart} />;
          })}
        </div>
      </Grid>
      <Grid xs={12} sm={4}>
        <Card className={css({ alignSelf: 'start', marginLeft: '1rem' })}>
          <Card.Body>
            <Text weight="bold" h3>
              Rangkuman
            </Text>
            <Grid.Container>
              <Grid xs={6}>
                <Text>Subharga</Text>
              </Grid>
              <Grid xs={6}>
                <Text>Rp.{toIDR(subHarga)}</Text>
              </Grid>
            </Grid.Container>

            <Divider css={{ margin: '1rem 0' }} />
            <Grid.Container>
              <Grid xs={6}>
                <Text>Total Harga</Text>
              </Grid>
              <Grid xs={6}>
                <Text>Rp.{toIDR(subHarga)}</Text>
              </Grid>
            </Grid.Container>

            <Button
              primary
              classnames={cx(hover, css({ marginTop: 7 }))}
              onClick={() => router.push('/checkout')}
            >
              Beli
            </Button>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
