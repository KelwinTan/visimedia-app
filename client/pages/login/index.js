import {
  Container,
  Text,
  Card,
  Button,
  Loading,
  Spacer,
} from "@nextui-org/react";
import Head from "next/head";

import { css } from "@emotion/css";
import color from "constants/color";
import { Form } from "react-final-form";
import useAuth from "hooks/useAuth";
import { FORM_ERROR } from "final-form";
import authConstant from "constants/auth";
import { useRouter } from "next/router";
import Input from "components/Form/Input";
import { object, string } from "yup";
import getValidatorFromSchema from "shared/form/getValidator";
import transformError from "shared/error/transformError";
import useToaster from "hooks/useToaster";

const styles = {
  submit: css`
    border-radius: 0;
    background-color: ${color.primary};
  `,
};

const schema = object().shape({
  email: string()
    .email("Invalid Email")
    .required("The email field is required."),
  password: string().required("The password field is required."),
});

export default function Login() {
  const { login, loading } = useAuth();
  const { error: errorToaster } = useToaster();
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      const response = await login(values);
      const token = response?.access_token;
      localStorage.setItem(authConstant.TOKEN, token);
      router.push("/");
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
              <Card css={{ mw: 500, margin: "auto" }}>
                <Card.Body css={{ padding: "$9" }}>
                  <Text css={{ marginBottom: 24, fontWeight: "bold" }}>
                    Masuk ke akun Visimedia anda
                  </Text>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    validate={getValidatorFromSchema("email", schema)}
                  />
                  <Spacer y={1} />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    validate={getValidatorFromSchema("password", schema)}
                  />
                </Card.Body>
                <Button
                  type="submit"
                  animated={false}
                  className={styles.submit}
                >
                  {loading && <Loading color="currentColor" size="sm" />}
                  Login
                </Button>
              </Card>
            </form>
          )}
        />
      </Container>
    </>
  );
}
