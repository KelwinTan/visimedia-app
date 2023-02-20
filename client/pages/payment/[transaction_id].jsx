import InputFile from 'components/input/file';
import Payment from 'components/payment';
import { Form } from 'react-final-form';
import { useRouter } from 'next/router';
import Button from 'components/Button';
import { Spacer } from '@nextui-org/react';
import { css, cx } from '@emotion/css';
import { hover } from 'styles/globals';
import { useMutation } from '@tanstack/react-query';
import _axios from 'shared/axios';
import { getCookie } from 'cookies-next';
import auth from 'constants/auth';
import Head from 'next/head';
import useAuthMiddleware from 'middleware/auth.middleware';

export default function Index() {
  const {
    query: { transaction_id },
    push: pushRouter
  } = useRouter();

  const { mutateAsync: upload } = useMutation(vars =>
    _axios.post(`payment-details/update/${transaction_id}`, vars, {
      headers: {
        Authorization: `Bearer ${getCookie(auth.TOKEN)}`
      }
    })
  );

  return (
    <>
      <Head>
        <title>Payment</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Spacer y={2} />
      <div className={css({ maxWidth: 500, margin: 'auto' })}>
        <Form
          onSubmit={({ payment_image }) => {
            if (!payment_image) {
              return;
            }

            const formData = new FormData();
            formData.append('image', payment_image[0]);
            upload(formData).then(() => pushRouter('/'));
          }}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <InputFile
                  accept="image/*"
                  name="payment_image"
                  label="Image"
                />
                <Button
                  primary
                  type="submit"
                  classnames={cx(
                    hover,
                    css({ width: '100%', margin: '1rem 0' })
                  )}
                >
                  Unggah
                </Button>
              </form>
            );
          }}
        />

        <Payment
          data={[
            {
              name: 'Jimmy',
              bank_account_name: 'BCA',
              bank_account_number: '5785 887 333'
            }
          ]}
        />
      </div>
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
