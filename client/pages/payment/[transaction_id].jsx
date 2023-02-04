import InputFile from 'components/input/file';
import InputField from 'components/input/text';
import Payment from 'components/payment';
import { Form } from 'react-final-form';
import { useRouter } from 'next/router';
import Button from 'components/Button';
import { Container, Spacer } from '@nextui-org/react';
import { css, cx } from '@emotion/css';
import { hover } from 'styles/globals';
import FormInput from 'components/Form/Input';

const FILE_SIZE = 8 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export default function Index() {
  const {
    query: { transaction_id },
    push
  } = useRouter();

  return (
    <>
      <Spacer y={2} />
      <div className={css({ maxWidth: 500, margin: 'auto' })}>
        <Form
          onSubmit={({ payment_image, ...values }) =>
            mutateUploadImage({ ...values, payment_image: payment_image[0] })
          }
          className="mb-4"
          validate={values => {
            /** all validation should occur here */
            return {};
          }}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <InputFile
                  accept={'image/*'}
                  type="file"
                  name="payment_image"
                  label="Image"
                />
                <FormInput name="payment_notes" label="Notes" fullWidth />
                <Button
                  primary
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
