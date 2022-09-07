import { Container, Row, Text } from "@nextui-org/react";
import { upperFirst } from "lodash";
import Link from "next/link";
import { arrayOf, string } from "prop-types";

export default function Breadcrumb({ links }) {
  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      <Container fluid md css={{ py: 4 }}>
        <Row align="center">
          {links.map((data, idx, arr) => (
            <>
              <Link href="/">{upperFirst(data)}</Link>
              {idx < arr.length - 1 && <Text css={{ mx: 9 }}>/</Text>}
            </>
          ))}
        </Row>
      </Container>
    </div>
  );
}

Breadcrumb.propTypes = {
  links: arrayOf(string),
};

Breadcrumb.defaultProps = {
  links: [],
};
