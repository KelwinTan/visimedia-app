import useAuthMiddleware from 'middleware/auth.middleware';
import OrderDetail from 'components/order/OrderDetail';
import OrderFilter from 'components/order/OrderFilter';
import Head from 'next/head';
import { Container, Spacer, Text } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import _axios from 'shared/axios';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import auth from 'constants/auth';
import { css } from '@emotion/css';

export default function Index() {
  const router = useRouter();
  const status = Array.isArray(router.query['status'])
    ? router.query['status'][0]
    : router.query['status'];

  const { data: orderStatus = [], isLoading: loadingOrderStatus } = useQuery(
    ['order-status'],
    () => _axios.get('/statuses').then(res => res.data?.statuses)
  );

  const { data: orderDetail = [], isLoading: loadingGetOrderDetail } = useQuery(
    ['order-details', status],
    () =>
      _axios
        .get(
          status
            ? `order-details/all/own/filter?filter=${status}`
            : `order-details/all/own`,
          {
            headers: {
              Authorization: `Bearer ${getCookie(auth.TOKEN)}`
            }
          }
        )
        .then(res => res.data?.data?.order_details)
  );

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>

      <Spacer y={3} />

      <Container md fluid>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center'
          })}
        >
          <div>
            <Text weight="bold">Order</Text>
            <Text>Filter Status</Text>
          </div>
          <Spacer x={1} />
          <div
            className={css({
              display: 'flex',
              whiteSpace: 'nowrap',
              overflowX: 'auto'
            })}
          >
            <OrderFilter filters={orderStatus} />
          </div>
          <Spacer y={1} />
        </div>
      </Container>
      <Spacer y={1} />

      <Container fluid md css={{ px: '1rem' }}>
        {!loadingGetOrderDetail &&
          orderDetail.map((order, idx) => (
            <OrderDetail key={idx} data={order} />
          ))}
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
