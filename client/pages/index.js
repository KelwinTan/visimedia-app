import { css } from "@emotion/css";
import { Container, Grid, Row, Text } from "@nextui-org/react";
import Carousel from "components/Carousel";
import ProductCard from "components/ProductCard";
import color from "constants/color";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import _axios from "shared/axios";
import { hover, radius } from "styles/globals";

const style = {
  banner: css`
    width: 100%;
    height: 370px;
    position: relative;
  `,
};

export default function Home({ banners, products }) {
  return (
    <>
      <Head>
        <title>Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>

      <Container fluid md css={{ mt: "$10" }}>
        <Carousel
          items={banners.map((banner, idx) => (
            <div key={idx} className={style.banner}>
              <Image
                src={`${process.env.IMAGE_URL}${banner.public_image_path}`}
                layout={"fill"}
                objectFit="cover"
                alt="banner"
                className={radius(10)}
                priority={idx === 0}
              />
            </div>
          ))}
        />
      </Container>

      <Container fluid md>
        <Row css={{ mt: "$18" }} align="center">
          <Text h4 css={{ mb: 0 }}>
            Produk pilihan untukmu
          </Text>
          <Link passHref href="/12312">
            <Text css={{ ml: "$8", color: color.primary }} b className={hover}>
              Lihat semua
            </Text>
          </Link>
        </Row>
        <Grid.Container gap={2} css={{ px: 0 }} justify="flex-start">
          {products.map((item, index) => (
            <Grid xs={12} sm={2} key={index}>
              <Link
                passHref
                href={{ pathname: "/product/[id]", query: { id: item.id } }}
              >
                <ProductCard item={item} />
              </Link>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const [banners, products] = await Promise.all([
    _axios.get("/banners").then((res) => res.data?.banners || []),
    _axios.get("/products").then((res) => res.data?.products || []),
  ]);

  console.log({ banners, products });
  return {
    props: { banners, products }, // will be passed to the page component as props
  };
}
