import { css, cx } from '@emotion/css';
import { Container, Grid, Modal, Spacer, Text } from '@nextui-org/react';
import CheckoutList from 'components/Checkout/List';
import Summary from 'components/Checkout/Summary';
import { useMediaQueryBetween } from 'hooks/useMediaQuery';
import useAuthMiddleware from 'middleware/auth.middleware';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { dFlex, hover } from 'styles/globals';
import { useQuery } from '@tanstack/react-query';
import AddressList from 'components/settings/Address/List';
import auth from 'constants/auth';
import _axios from 'shared/axios';
import { getCookie } from 'cookies-next';
import Button from 'components/Button';
import AddressChoosen from 'components/Checkout/AddressChoosen';

export default function Checkout() {
  const isBetweenSMAndMD = useMediaQueryBetween({ min: 320, max: 425 });
  const [openAllAddress, setOpenAllAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { data: carts = [] } = useQuery(['carts'], () =>
    _axios
      .get('cart-items', {
        headers: {
          Authorization: `Bearer ${getCookie(auth.TOKEN)}`
        }
      })
      .then(res => res.data.cartItems)
  );

  const { data: address = [] } = useQuery(
    ['address-user-list'],
    () =>
      _axios
        .get(`addresses/user/21`, {
          headers: {
            Authorization: `Bearer ${getCookie(auth.TOKEN)}`
          }
        })
        .then(res => res.data?.addresses || []),
    {
      onSuccess(data) {
        const [mainAddress] = data;
        setSelectedAddress(mainAddress);
      }
    }
  );

  const subHarga = useMemo(() => {
    return carts.reduce(
      (curr, data) =>
        curr + data.cart_item.quantity * +data.product_detail.price,
      0
    );
  }, [carts]);

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={openAllAddress}
        onClose={() => setOpenAllAddress(false)}
        width={isBetweenSMAndMD ? '90%' : '50%'}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Pilih alamat
          </Text>
        </Modal.Header>
        <Modal.Body>
          {address.map(addrr => (
            <AddressChoosen
              key={addrr.id}
              address={addrr}
              onChoose={() => {
                setSelectedAddress(addrr);
                setOpenAllAddress(false);
              }}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Head>
        <title>Checkout</title>
      </Head>
      <Spacer y={isBetweenSMAndMD ? 1 : 2} />
      <Container fluid md css={{ px: '1rem' }}>
        <Grid.Container>
          <Grid
            xs={12}
            sm={8}
            css={{ display: 'flex', flexDirection: 'column' }}
          >
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
              {carts.map((cart, idx) => {
                return <CheckoutList key={idx} data={cart} />;
              })}
            </div>
          </Grid>
          <Grid xs={12} sm={4} css={{ paddingLeft: '1rem' }}>
            <Summary selectedAddress={selectedAddress} subHarga={subHarga} />
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
