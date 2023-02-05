import { Col, Row } from "@nextui-org/react";
import BukalapakIcon from "components/Icon/BukalapakIcon";
import ShopeeIcon from "components/Icon/ShopeeIcon";
import TokopediaIcon from "components/Icon/TokopediaIcon";
import Link from "next/link";
import Layout from "components/Layout/FAQ/layout";

export default function Marketplace() {
  return (
    <Layout>
      <Row css={{ mt: 10 }}>
        <TokopediaIcon />
        <Col>
          Tokopedia:
          <Link href="https://www.tokopedia.com/visimediasupply">
            https://www.tokopedia.com/visimediasupply
          </Link>
        </Col>
      </Row>
      <Row css={{ mt: 10 }}>
        <ShopeeIcon marketPlace />
        <Col>
          Shopee:
          <Link href="https://shopee.co.id/visimediasupply">
            https://shopee.co.id/visimediasupply
          </Link>
        </Col>
      </Row>
      <Row css={{ mt: 10 }}>
        <BukalapakIcon />
        <Col>
          Bukalapak:
          <Link href="https://www.bukalapak.com/u/visimediasuppliesjkt">
            https://www.bukalapak.com/u/visimediasuppliesjkt
          </Link>
        </Col>
      </Row>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
