import { css, cx } from '@emotion/css';
import { Card, Grid, Spacer, Text } from '@nextui-org/react';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { hover } from 'styles/globals';
import { stySummary } from './style';

export default function Summary() {
  const router = useRouter();

  return (
    <Card className={stySummary}>
      <Text weight="bold" h3>
        Rangkuman
      </Text>
      <Grid.Container>
        <Grid xs={4}>
          <Text>Subtotal</Text>
        </Grid>
        <Grid xs={4}>
          <Text>Rp 90.000</Text>
        </Grid>
      </Grid.Container>

      <Grid.Container>
        <Grid xs={4}>
          <Text>Total Diskon</Text>
        </Grid>
        <Grid xs={4}>
          <Text>Rp 90.000</Text>
        </Grid>
      </Grid.Container>

      <Spacer y={1} />

      <Grid.Container>
        <Grid xs={4}>
          <Text>Total Harga</Text>
        </Grid>
        <Grid xs={4}>
          <Text>Rp 90.000</Text>
        </Grid>
      </Grid.Container>

      <Button
        primary
        classnames={cx(hover, css({ marginTop: 7 }))}
        onClick={() => router.push('/thankyou')}
      >
        Checkout
      </Button>
    </Card>
  );
}
