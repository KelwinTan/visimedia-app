import { Container, Spacer, Text } from '@nextui-org/react';
import Button from 'components/Button';
import Link from 'next/link';
import { hover } from 'styles/globals';

export default function Thankyou() {
  return (
    <Container
      fluid
      md
      css={{ px: '1rem' }}
      display="flex"
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Spacer y={2} />
      <Text h2>Thank you for the purchase!</Text>
      <Text>Your package will be delivered soon for you!</Text>
      <Spacer y={2} />
      <Link href="/order/21">
        <Button primary classnames={hover}>
          Go to order page
        </Button>
      </Link>
    </Container>
  );
}
