import useAuthMiddleware from 'middleware/auth.middleware';
import { useEffect, useMemo, useState } from 'react';
import generalConst from 'constants/general';
import {
  Card,
  Container,
  Divider,
  Grid,
  Image,
  Spacer,
  Text
} from '@nextui-org/react';
import canUseDOM from 'shared/utils/canUseDom';
import { css, cx } from '@emotion/css';
import { dFlex, hover } from 'styles/globals';
import CartItem from 'components/Cart/CartItem';
import Button from 'components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

class CartValue {
  product_name = '';
  product_price = '';
  product_image = '';
  qty = 0;
}

export default function Cart() {
  const router = useRouter();
  const [carts, setCarts] = useState({});

  useEffect(() => {
    setCarts(() => {
      const json = localStorage.getItem(generalConst.CART);
      if (!json) {
        return {};
      }

      return JSON.parse(json);
    });
  }, []);

  return (
    <>
      <Spacer y={2} />
      <Container fluid md css={{ px: '1rem' }}>
        <Grid.Container>
          <Grid xs={12} sm={8}>
            <div style={{ width: '100%' }}>
              {Object.values(carts)
                .flat()
                .map((cart, idx) => {
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
                    <Text>Rp99.000</Text>
                  </Grid>
                </Grid.Container>

                <Divider css={{ margin: '1rem 0' }} />
                <Grid.Container>
                  <Grid xs={6}>
                    <Text>Total Harga</Text>
                  </Grid>
                  <Grid xs={6}>
                    <Text>Rp99.000</Text>
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
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return useAuthMiddleware(ctx, () => {
    return {
      props: {}
    };
  });
}
