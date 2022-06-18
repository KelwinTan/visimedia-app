import { Container, Text } from "@nextui-org/react";
import Head from "next/head";
import { Card } from "@nextui-org/react";

import { Input } from "@nextui-org/react";
import { css } from "@emotion/css";
import { Button } from "@nextui-org/react";
import color from "constants/color";
import { Form, Field } from "react-final-form";

const styles = {
  input: css`
    margin: 16px 0;
  `,
  submit: css`
    border-radius: 0;
    background-color: ${color.primary};
  `,
};

export default function Login() {
  const onSubmit = (values) => {};

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
                <Card.Body>
                  <Text css={{ marginBottom: 24, fontWeight: "bold" }}>
                    Masuk ke akun Visimedia anda
                  </Text>
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <Input
                        {...input}
                        className={styles.input}
                        shadow={false}
                        clearable
                        type="email"
                        placeholder="Email Address"
                        color={meta.touched && meta.error ? "error" : "default"}
                        helperColor={
                          meta.touched && meta.error ? "error" : "default"
                        }
                        status={
                          meta.touched && meta.error ? "error" : "default"
                        }
                      />
                    )}
                  />
                  <Field
                    name="password"
                    render={({ input, meta }) => (
                      <Input.Password
                        {...input}
                        shadow={false}
                        className={styles.input}
                        clearable
                        placeholder="Password"
                        type="password"
                        color={meta.touched && meta.error ? "error" : "default"}
                        helperColor={
                          meta.touched && meta.error ? "error" : "default"
                        }
                        status={
                          meta.touched && meta.error ? "error" : "default"
                        }
                      />
                    )}
                  />
                </Card.Body>
                <Button
                  type="submit"
                  animated={false}
                  className={styles.submit}
                >
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
