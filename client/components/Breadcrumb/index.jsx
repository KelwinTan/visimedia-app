import { Container, Row, Text } from '@nextui-org/react';
import upperFirst from 'lodash-es/upperFirst';
import Link from 'next/link';
import { arrayOf, string } from 'prop-types';
import React from 'react';

export default function Breadcrumb({ links }) {
  return (
    <div style={{ backgroundColor: '#f1f1f1' }}>
      <Container fluid md css={{ py: 4 }}>
        <Row align="center">
          {links.map((data, idx, arr) => (
            <React.Fragment key={idx}>
              <Link href="/" style={{ whiteSpace: 'nowrap' }}>
                {upperFirst(data)}
              </Link>
              {idx < arr.length - 1 && <Text css={{ mx: 9 }}>/</Text>}
            </React.Fragment>
          ))}
        </Row>
      </Container>
    </div>
  );
}

Breadcrumb.propTypes = {
  links: arrayOf(string)
};

Breadcrumb.defaultProps = {
  links: []
};
