import { css, cx } from '@emotion/css';
import { Card, Container, Grid, Image, Spacer, Text } from '@nextui-org/react';
import Button from 'components/Button';
import { format } from 'date-fns';
import Link from 'next/link';
import toIDR from 'shared/currency/toIDR';
import { dFlex, hover } from 'styles/globals';
import { OrderDetailProps } from './type';

/**
 * @param {{data : OrderDetailProps}} props
 */
export default function OrderDetail(props) {
  const [payment] = props.data.payment_details;
  /**
   *  order created
   *  product name - category - qty - price - image
   *  payment amount
   */
  return (
    <>
      <Card className={css({ marginBottom: '1rem' })}>
        <Card.Header>
          <Container display="flex" direction="row" justify="space-between">
            <Text>
              {format(
                new Date(props.data.order_details.created_at),
                'dd MMMM yyyy'
              )}
            </Text>
            <div>
              <Text weight="bold">Total</Text>
              <Text>{toIDR(Number(payment.amount))}</Text>
            </div>
          </Container>
        </Card.Header>

        <Card.Body>
          {props.data.order_items.map((order, key, arr) => (
            <>
              <Grid.Container display="flex" direction="row" key={key}>
                <Grid xs={1}>
                  <Image width={64} height={64} src={order.public_image_url} />
                </Grid>
                <Grid direction="column" xs={3}>
                  <Text>{order.product_name}</Text>
                  <Text>
                    {order.quantity} x {toIDR(Number(order.price))}
                  </Text>
                </Grid>
                <Grid direction="column" xs={3}>
                  <Text weight="bold">Price</Text>
                  <Text>{toIDR(Number(order.price))}</Text>
                </Grid>
              </Grid.Container>
              {key < arr.length - 1 && <Spacer y={1} />}
            </>
          ))}
          <div className={cx(dFlex, css({ justifyContent: 'flex-end' }))}>
            <Link href={`/payment/${props.data.order_details.payment_id}`}>
              <a>
                <Button primary classnames={cx(hover, css({ width: 200 }))}>
                  Bayar
                </Button>
              </a>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
