import { css, cx } from '@emotion/css';
import { Grid, Text } from '@nextui-org/react';
import Button from 'components/Button';
import EmptyData from 'components/Empty';
import AddressList from 'components/settings/Address/List';
import { useMemo } from 'react';
import { dFlex, hover } from 'styles/globals';
import CheckoutList from './List';
import Summary from './Summary';

export default function Checkout({
  selectedAddress,
  carts = [],
  setOpenAllAddress
}) {
  const subHarga = useMemo(() => {
    return carts.reduce(
      (curr, data) =>
        curr + data.cart_item.quantity * +data.product_detail.price,
      0
    );
  }, [carts]);

  return (
    <Grid.Container>
      <Grid xs={12} sm={8} css={{ display: 'flex', flexDirection: 'column' }}>
        <Text weight="bold" h3>
          Checkout
        </Text>
        <Text h5>Alamat</Text>
        {selectedAddress && <AddressList address={selectedAddress} />}
        <div>
          <Button
            secondary
            onClick={() => setOpenAllAddress(true)}
            classnames={cx(hover, css({ border: 'none' }))}
          >
            Pilih alamat lain
          </Button>
        </div>
        <div
          className={cx(
            dFlex,
            css({
              flexDirection: 'column',
              width: '100%'
            })
          )}
        >
          {carts.length === 0 ? (
            <EmptyData />
          ) : (
            carts.map((cart, idx) => {
              return <CheckoutList key={idx} data={cart} />;
            })
          )}
        </div>
      </Grid>
      <Grid xs={12} sm={4} css={{ paddingLeft: '1rem' }}>
        <Summary selectedAddress={selectedAddress} subHarga={subHarga} />
      </Grid>
    </Grid.Container>
  );
}
