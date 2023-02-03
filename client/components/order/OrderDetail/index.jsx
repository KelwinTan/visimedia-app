import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Spacer,
  Text,
} from "@nextui-org/react";
import { format } from "date-fns";
import { OrderDetailProps } from "./type";

/**
 * @param {{data : OrderDetailProps}} props
 */
export default function OrderDetail(props) {
  console.log({ data: props.data });
  const [payment] = props.data.payment_details;
  /**
   *  order created
   *  product name - category - qty - price - image
   *  payment amount
   */
  return (
    <>
      <Card>
        <Card.Header>
          <Container display="flex" direction="row" justify="space-between">
            <Text>
              {format(
                new Date(props.data.order_details.created_at),
                "dd MMMM yyyy"
              )}
            </Text>
            <div>
              <Text weight="bold">Total</Text>
              <Text>{payment.amount}</Text>
            </div>
          </Container>
        </Card.Header>

        <Card.Body>
          {props.data.order_items.map((order, key, arr) => (
            <>
              <Grid.Container display="flex" direction="row" key={key}>
                <Grid xs={1}>
                  <Image
                    width={64}
                    height={64}
                    src={process.env.IMAGE_URL + order.public_image_url}
                  />
                </Grid>
                <Grid direction="column" xs={3}>
                  <Text>{order.product_name}</Text>
                  <Text>
                    {order.quantity} x {order.price}
                  </Text>
                </Grid>
                <Grid direction="column" xs={3}>
                  <Text weight="bold">Price</Text>
                  <Text>{order.price}</Text>
                </Grid>
              </Grid.Container>
              {key < arr.length - 1 && <Spacer y={1} />}
            </>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}
