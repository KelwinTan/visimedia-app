import { Container, Text } from "@nextui-org/react";
import Head from "next/head";
import { container } from "./style";

export default function (props) {
  console.log({ props });
  return (
    <>
      <Head>
        <title>FAQ - Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="FAQ - Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>
      <Container className={container}>
        <Text h2 css={{ textAlign: "center" }}>
          Frequently Asked Questions
        </Text>
      </Container>
    </>
  );
}
