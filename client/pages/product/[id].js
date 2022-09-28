import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import Breadcrumb from "components/Breadcrumb";
import Head from "next/head";
import { useUA } from "providers/user-agent";
import _axios from "shared/axios";
import toIDR from "shared/currency/toIDR";
import Button from "components/Button";
import ProductVariant from "components/ProductVariant";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function ProductDetail({ product }) {
  const { isMobile, isDesktop } = useUA();
  const router = useRouter();

  const goCheckout = useCallback(() => {
    router.push("/checkout");
  }, [router]);

  return (
    <>
      <Head>
        <title>produk detail</title>
      </Head>
      <Breadcrumb links={["home", "detail", product.name]} />
      <Container md css={{ mt: "$10" }} fluid>
        <Row wrap="wrap">
          <Col span={isMobile ? 12 : 4}>
            <Image
              src={process.env.IMAGE_URL + product.public_image_url}
              alt="Default Image"
              objectFit="cover"
            />
          </Col>
          <Col span={isMobile ? 12 : 4} css={{ pl: isDesktop ? "$10" : "$0" }}>
            <Text h4>{product.name}</Text>
            <Text>Harga Rp.{toIDR(product.price)}</Text>
            <Text css={{ mt: "$8" }}>{product.description}</Text>
            {isMobile && (
              <>
                <Spacer y={1} />
                <ProductVariant product={product} showSellNow={false} />
              </>
            )}
          </Col>
          {isDesktop && (
            <Col span={3} css={{ pl: "$8" }}>
              <Card
                variant="bordered"
                css={{ borderRadius: 8, maxWidth: isMobile ? "100%" : 300 }}
              >
                <Card.Body>
                  <ProductVariant product={product} />
                  <Text b h5>
                    Belanja Sekarang
                  </Text>
                  <Button onClick={goCheckout} bordered={false} primary>
                    Beli Sekarang
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
      {/* if mobile, show beli in bottom dock */}
      {isMobile && (
        <Row
          css={{
            position: "fixed",
            bottom: 65,
            zIndex: 10,
            backgroundColor: "White",
            padding: 8,
            boxShadow: "0 0 1px rgba(0,0,0,.2)",
          }}
        >
          <Button onClick={goCheckout} fullWidth bordered={false} primary>
            Beli Sekarang
          </Button>
        </Row>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const {
    data: { product },
  } = await _axios.get("/products/" + id);

  return {
    props: { product }, // will be passed to the page component as props
  };
}
