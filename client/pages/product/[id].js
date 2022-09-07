import {
  Button,
  Card,
  Col,
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
import { useCallback } from "react";
import _axios from "shared/axios";
import toIDR from "shared/currency/toIDR";

export default function ProductDetail({ product }) {
  const router = useRouter();

  const goCheckout = useCallback(() => {
    router.push("/checkout");
  }, [router]);

  return (
    <>
      <Head>
        <title>produk detail</title>
      </Head>
      <Breadcrumb />
      <Container md css={{ mt: "$10" }} fluid>
        <Container fluid>
          <Row>
            <Col span={4}>
              <Image
                src={process.env.IMAGE_URL + product.public_image_url}
                alt="Default Image"
                objectFit="cover"
              />
            </Col>
            <Col span={4} css={{ pl: "$10" }}>
              <Text h4>{product.name}</Text>
              {/* <Text>
                Terjual <b>502</b>
              </Text> */}
              <Text>Harga Rp.{toIDR(product.price)}</Text>{" "}
              {/* <Badge variant={"flat"}>Hemat Rp.3.000</Badge> */}
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
              <Spacer y={3} />
              <Text color="error">
                *Mohon maaf saat ini media Whatsapp sedang tidak tersedia,
                silakan order melalui media Email : sales@enterkomputer.com
              </Text>
              <Text>Pengiriman</Text>
              <Divider y={1} />
              <Text>
                Dikirim dari <b>Jakarta pusat</b>
              </Text>
              <Text>
                Dikirim ke <b>Pilih Tujuan</b>
              </Text>
            </Col>
            <Col span={3} css={{ pl: "$8" }}>
              <Card variant="bordered" css={{ borderRadius: 8, maxWidth: 300 }}>
                <Card.Body>
                  <Text b h5>
                    Belanja Sekarang
                  </Text>
                  <Button
                    onClick={goCheckout}
                    bordered={false}
                    css={{ borderRadius: 8 }}
                  >
                    Beli Sekarang
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
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
