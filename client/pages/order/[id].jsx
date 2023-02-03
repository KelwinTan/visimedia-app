import useAuthMiddleware from 'middleware/auth.middleware';
import OrderDetail from 'components/order/OrderDetail';
import OrderFilter from 'components/order/OrderFilter';
import Head from 'next/head';
import { useState } from 'react';
import { Badge, Container, Spacer, Text } from '@nextui-org/react';
import color from 'constants/color';
import { useQuery } from '@tanstack/react-query';
import _axios from 'shared/axios';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import auth from 'constants/auth';

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const id = Array.isArray(router.query['id'])
    ? router.query['id'][0]
    : router.query['id'];

  const { data: orderStatus = [], isLoading: loadingOrderStatus } = useQuery(
    ['order-status'],
    () => _axios.get('/statuses').then(res => res.data?.statuses)
  );

  const { data: orderDetail, isLoading: loadingGetOrderDetail } = useQuery(
    ['order-details', id],
    () =>
      _axios
        .get(`order-details/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie(auth.TOKEN)}`
          }
        })
        .then(res => res.data?.data)
  );

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>

      <Spacer y={3} />

      <Container
        fluid
        md
        css={{ px: '1rem' }}
        direction="row"
        alignItems="center"
        wrap="nowrap"
        display="flex"
      >
        <div>
          <Text weight="bold">Order</Text>
          <Text>Filter Status</Text>
        </div>
        <Spacer x={3} />
        <div>
          <OrderFilter filters={orderStatus} />
        </div>
        <Spacer y={1} />
      </Container>

      <Spacer y={1} />

      <Container fluid md css={{ px: '1rem' }}>
        {!loadingGetOrderDetail && <OrderDetail data={orderDetail} />}
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
