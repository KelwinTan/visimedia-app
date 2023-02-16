import { css } from '@emotion/css';
import {
  Button,
  Card,
  Container,
  Loading,
  Spacer,
  Text
} from '@nextui-org/react';
import color from 'constants/color';
import { useAuth } from 'providers/auth';
import Head from 'next/head';
import { Form } from 'react-final-form';
import transformError from 'shared/error/transformError';
import Input from 'components/Form/Input';
import { object } from 'yup';
import { string } from 'yup';
import getValidatorFromSchema from 'shared/form/getValidator';
import { useRouter } from 'next/router';
import useGuestMiddleware from 'middleware/guest.middleware';

const styles = {
  submit: css`
    border-radius: 0;
    background-color: ${color.primary};
  `
};

const schema = object().shape({
  name: string().required('nama harus diisi.'),
  phone_number: string().required('nomor telepon harus diisi.'),
  email: string().email('Email Tidak Valid').required('email harus diisi.'),
  password: string().required('password harus diisi.'),
  password_confirmation: string().required('password confirmation harus diisi.')
});

export default function Register() {
  const router = useRouter();
  const { register, loading } = useAuth();

  const onSubmit = async values => {
    try {
      await register(values);
      router.push('/login');
    } catch (error) {
      const _err = error?.response?.data?.errors;
      if (_err) {
        return transformError(_err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Register - Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="Register - Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>
      <Container css={{ paddingTop: 24 }}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Card css={{ mw: 500, margin: 'auto' }}>
                <Card.Body css={{ padding: '$9' }}>
                  <Text css={{ marginBottom: 24, fontWeight: 'bold' }}>
                    Buat akun Visimedia
                  </Text>

                  <Input
                    name="name"
                    placeholder="Name"
                    validate={getValidatorFromSchema('name', schema)}
                  />
                  <Spacer y={1} />

                  <Input
                    name="phone_number"
                    placeholder="Nomor Telephone"
                    validate={getValidatorFromSchema('phone_number', schema)}
                  />
                  <Spacer y={1} />

                  <Input
                    name="email"
                    placeholder="Email Address"
                    validate={getValidatorFromSchema('email', schema)}
                  />
                  <Spacer y={1} />

                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    validate={getValidatorFromSchema('password', schema)}
                  />
                  <Spacer y={1} />

                  <Input
                    type="password"
                    name="password_confirmation"
                    placeholder="Password Confirmation"
                    validate={getValidatorFromSchema(
                      'password_confirmation',
                      schema
                    )}
                  />
                </Card.Body>
                <Button
                  type="submit"
                  animated={false}
                  className={styles.submit}
                >
                  {loading && <Loading color="currentColor" size="sm" />}
                  Daftar
                </Button>
              </Card>
            </form>
          )}
        />
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return useGuestMiddleware(ctx, () => {
    return {
      props: {}
    };
  });
}
