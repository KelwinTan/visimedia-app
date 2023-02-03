import useAuthMiddleware from 'middleware/auth.middleware';

export default function Checkout() {
  return <>hello from checkout</>;
}

export async function getServerSideProps(ctx) {
  return useAuthMiddleware(ctx, () => {
    return {
      props: {}
    };
  });
}
