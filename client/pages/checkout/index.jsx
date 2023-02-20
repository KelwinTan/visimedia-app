import { Container, Modal, Spacer, Text } from '@nextui-org/react';
import { useMediaQueryBetween } from 'hooks/useMediaQuery';
import useAuthMiddleware from 'middleware/auth.middleware';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import auth from 'constants/auth';
import _axios from 'shared/axios';
import { getCookie } from 'cookies-next';
import AddressChoosen from 'components/Checkout/AddressChoosen';
import Checkout from 'components/Checkout';

export default function Checkout_() {
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

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
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
        <Checkout
          selectedAddress={selectedAddress}
          carts={carts}
          setOpenAllAddress={setOpenAllAddress}
        />
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
