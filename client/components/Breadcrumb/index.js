import { Container, Row, Text } from "@nextui-org/react";
import Link from "next/link";

export default function Breadcrumb() {
  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      <Container fluid md css={{ py: 4 }}>
        <Row align="center">
          <Link href="/">Home</Link>
          <Text css={{ mx: 9 }}>/</Text>
          <Link href="/">Detail</Link>
          <Text css={{ mx: 9 }}>/</Text>
          <Text>Axa12312</Text>
        </Row>
      </Container>
    </div>
  );
}
