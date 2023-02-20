import useAuthMiddleware from 'middleware/auth.middleware';
import { Container, Loading, Spacer } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import _axios from 'shared/axios';
import { getCookie } from 'cookies-next';
import auth from 'constants/auth';
import Head from 'next/head';
import Cart from 'components/Cart';

export default function Cart_() {
  const { data: carts = [], isLoading } = useQuery(['carts'], () =>
    _axios
      .get('cart-items', {
        headers: {
          Authorization: `Bearer ${getCookie(auth.TOKEN)}`
        }
      })
      .then(res => res.data.cartItems)
  );

  if (isLoading) {
    return <Loading size="md" />;
  }
  return (
    <>
      <Head>
        <title>Keranjang</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Spacer y={2} />
      <Container fluid md css={{ px: '1rem' }}>
        <Cart carts={carts} />
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
