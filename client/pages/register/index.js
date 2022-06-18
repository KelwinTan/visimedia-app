import { css } from "@emotion/css";
import { Button, Card, Container, Input, Text } from "@nextui-org/react";
import color from "constants/color";
import Head from "next/head";
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

export default function Register() {
  const onSubmit = () => {};

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
              <Card css={{ mw: 500, margin: "auto" }}>
                <Card.Body>
                  <Text css={{ marginBottom: 24, fontWeight: "bold" }}>
                    Buat akun Visimedia
                  </Text>
                  <Field
                    name="name"
                    render={({ input, meta }) => (
                      <Input
                        {...input}
                        className={styles.input}
                        shadow={false}
                        clearable
                        type="text"
                        placeholder="Name"
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
                    name="phone"
                    render={({ input, meta }) => (
                      <Input
                        {...input}
                        className={styles.input}
                        shadow={false}
                        clearable
                        type="tel"
                        placeholder="Phone"
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
                  Register
                </Button>
              </Card>
            </form>
          )}
        />
      </Container>
    </>
  );
}
