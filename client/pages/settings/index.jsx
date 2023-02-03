import { Container, Spacer } from '@nextui-org/react';
import useAuthMiddleware from 'middleware/auth.middleware';
import _axios from 'shared/axios';
import Tab from 'components/settings/Tab';
import Address from 'components/settings/Address';

export default function Settings() {
  return (
    <Container fluid md css={{ px: '1rem' }}>
      <Spacer y={2} />
      <Tab headers={[{ text: 'Address List' }]}>
        <div style={{ padding: 24 }}>
          <Address />
        </div>
      </Tab>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  return useAuthMiddleware(ctx, () => {
    return {
      props: {}
    };
  });
}
