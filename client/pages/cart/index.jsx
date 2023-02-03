import useAuthMiddleware from 'middleware/auth.middleware';
import { useMemo } from 'react';
import generalConst from 'constants/general';
import { Card, Container, Grid, Image, Text } from '@nextui-org/react';
import canUseDOM from 'shared/utils/canUseDom';
import { css, cx } from '@emotion/css';
import { dFlex } from 'styles/globals';

class CartValue {
  product_name = '';
  product_price = '';
  product_image = '';
  qty = 0;
}

export default function Cart() {
  /**
   * @type {Array<CartValue>}
   */
  const itemsCart = useMemo(() => {
    if (!canUseDOM()) {
      return {};
    }
    const json = localStorage.getItem(generalConst.CART);
    if (!json) {
      return {};
    }

    return JSON.parse(json);
  }, []);

  console.log({ itemsCart });

  return (
    <>
      <Container fluid md css={{ px: '1rem' }}>
        <Grid.Container>
          <Grid xs={12} sm={8}>
            <div className={cx(dFlex, css({ flexDirection: 'column' }))}>
              {Object.values(itemsCart)
                .flat()
                .map(cart => {
                  return (
                    <>
                      <Card variant="flat">
                        <Card.Body>
                          <Image
                            width={64}
                            height={64}
                            src={process.env.IMAGE_URL + cart.product_image}
                          />
                          <div>
                            <Text>{cart.product_name}</Text>
                            <Text>{cart.product_price}</Text>
                          </div>
                        </Card.Body>
                      </Card>
                    </>
                  );
                })}
            </div>
          </Grid>
          <Grid xs={12} sm={4}>
            lkocak
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
