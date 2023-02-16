import {
  Container,
  Text,
  Card,
  Button,
  Loading,
  Spacer
} from '@nextui-org/react';
import Head from 'next/head';

import { css } from '@emotion/css';
import color from 'constants/color';
import { Form } from 'react-final-form';
import { useAuth } from 'providers/auth';
import authConstant from 'constants/auth';
import { useRouter } from 'next/router';
import Input from 'components/Form/Input';
import { object, string } from 'yup';
import getValidatorFromSchema from 'shared/form/getValidator';
import transformError from 'shared/error/transformError';
import useToaster from 'hooks/useToaster';
import { setCookie } from 'cookies-next';
import useGuestMiddleware from 'middleware/guest.middleware';

const styles = {
  submit: css`
    border-radius: 0;
    background-color: ${color.primary};
  `
};

const schema = object().shape({
  email: string()
    .email('Invalid Email')
    .required('The email field is required.'),
  password: string().required('The password field is required.')
});

export default function Login() {
  const router = useRouter();
  const { error: errorToaster } = useToaster();
  const { login, loading, getProfile, setUser } = useAuth();

  const onSubmit = async values => {
    try {
      const response = await login(values);
      const token = response?.access_token;
      const expires_in = response?.expires_in;

      setCookie(authConstant.TOKEN, token, {
        maxAge: expires_in,
        sameSite: true
      });

      const profile = await getProfile(token);
      setCookie(authConstant.USER, JSON.stringify(profile), {
        maxAge: expires_in,
        sameSite: true
      });

      setUser(profile);
      router.push('/');
    } catch (error) {
      const errorFields = error?.response?.data?.errors;
      if (errorFields) {
        return transformError(errorFields);
      }
      const _err = error?.response?.data?.error;
      if (_err) {
        errorToaster(_err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login - Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="Login - Visimedia Supplies – Digital Printing Supplies"
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
                    Masuk ke akun Visimedia anda
                  </Text>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    validate={getValidatorFromSchema('email', schema)}
                  />
                  <Spacer y={1} />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    validate={getValidatorFromSchema('password', schema)}
                  />
                </Card.Body>
                <Button
                  type="submit"
                  animated={false}
                  className={styles.submit}
                >
                  {loading && <Loading color="currentColor" size="sm" />}
                  Masuk
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
