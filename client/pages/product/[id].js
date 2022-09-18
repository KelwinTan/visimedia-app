import {
  Card,
  Col,
  Collapse,
  Container,
  Divider,
  Image,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import Breadcrumb from "components/Breadcrumb";
import Head from "next/head";
import { useRouter } from "next/router";
import { useUA } from "providers/user-agent";
import { useCallback } from "react";
import _axios from "shared/axios";
import toIDR from "shared/currency/toIDR";
import Button from "components/Button";

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { isMobile, isDesktop } = useUA();

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
            <Spacer y={1}></Spacer>
            <Text>
              SKU: <b>{product.sku}</b>
            </Text>
            <Text>
              Est Berat: <b>1 Kg</b>
            </Text>
            <Text>
              Kategori: <b>Accessories</b>
            </Text>
            <Text css={{ mt: "$8" }}>{product.description}</Text>
          </Col>
          {isDesktop && (
            <Col span={3} css={{ pl: "$8" }}>
              <Card variant="bordered" css={{ borderRadius: 8, maxWidth: 300 }}>
                <Card.Body>
                  <Text b h4>
                    Pilih Varian
                  </Text>
                  <Collapse.Group css={{ px: 0 }}>
                    {product.productVariantsData?.map((variant, idx) => {
                      return (
                        <Collapse
                          key={idx}
                          title={variant.product_variant_name}
                          subtitle={"Rp." + toIDR(variant.price)}
                        >
                          {variant.variantValues?.flat()?.map((detail, idx) => (
                            <Text key={idx}>
                              {detail.variant?.variant} - {detail.value}
                            </Text>
                          ))}
                        </Collapse>
                      );
                    })}
                  </Collapse.Group>

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
      {/* 
      <Container md fluid css={{ mt: "$10" }}>
        <NestedTable />
      </Container>
 */}
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
