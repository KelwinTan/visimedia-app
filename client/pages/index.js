import { css } from "@emotion/css";
import { Col, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import Marketplace from "components/Cards/Marketplace";
import Carousel from "components/Carousel";
import ProductCard from "components/ProductCard";
import color from "constants/color";
import Head from "next/head";
import Image from "next/image";
import _axios from "shared/axios";
import { height, hover, radius, styTextCenter } from "styles/globals";
import Link from "next/link";
import FacebookIcon from "components/Icon/FacebookIcon";
import InstagramIcon from "components/Icon/InstagramIcon";
import TwitterIcon from "components/Icon/TwitterIcon";
import ShopeeIcon from "components/Icon/ShopeeIcon";
import TokopediaIcon from "components/Icon/TokopediaIcon";
import BukalapakIcon from "components/Icon/BukalapakIcon";
import YoutubeIcon from "components/Icon/YoutubeIcon";
import TiktokIcon from "components/Icon/TiktokIcon";
import useCategories from "hooks/useCategories";
import { useUA } from "providers/user-agent";

export default function Home({ banners, products }) {
  const { data: _categories } = useCategories();
  const { isMobile } = useUA();
  return (
    <>
      <Head>
        <title>Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>

      <Carousel
        items={banners.map((banner, idx) => (
          <div
            key={idx}
            className={css`
              width: 100%;
              position: relative;
              height: ${isMobile ? "132px" : "490px"};
            `}
          >
            <Image
              src={`${process.env.IMAGE_URL}${banner.public_image_path}`}
              layout={"fill"}
              objectFit="cover"
              alt="banner"
              priority={idx === 0}
            />
          </div>
        ))}
      />

      <Spacer y={3} />

      <Container fluid md css={{ px: 0 }}>
        <Marketplace title={"List Kategori"}>
          <Grid.Container gap={2}>
            {_categories?.map((data, idx) => (
              <Grid justify="center" key={idx} xs={12} md={2}>
                <Link href="https://www.facebook.com/people/Visimedia-SupplierPrinting/100013772404133/">
                  <a target="_blank" className={styTextCenter}>
                    <Image
                      src={
                        "https://enterkomputer.com/web-assets/frontend/icon/svg/category/printer.svg"
                      }
                      layout="fixed"
                      width={48}
                      height={48}
                      className={styTextCenter}
                    />
                    <Text
                      className={styTextCenter}
                      css={{ fontWeight: "bolder" }}
                    >
                      {data.name}
                    </Text>
                    <Text className={styTextCenter}>
                      {data.products?.length} produk
                    </Text>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid.Container>
        </Marketplace>
      </Container>

      <Spacer y={2} />

      <Container fluid md css={{ px: 0 }}>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={6}>
            <Marketplace title={"Social Media"}>
              <Grid.Container gap={2} justify="flex-start">
                <Grid justify="center" xs={12} md={4}>
                  <Link href="https://www.facebook.com/visimediasupply">
                    <a target="_blank">
                      <FacebookIcon color={color.blue} width={75} height={75} />
                    </a>
                  </Link>
                </Grid>
                <Grid justify="center" xs={12} md={4}>
                  <Link href="https://twitter.com/visimediasupply">
                    <a target="_blank">
                      <TwitterIcon
                        color={color.twitter}
                        width={75}
                        height={75}
                      />
                    </a>
                  </Link>
                </Grid>
                <Grid justify="center" xs={12} md={4}>
                  <Link href="https://www.instagram.com/visimediasupply/">
                    <a target="_blank">
                      <InstagramIcon color={color.ig} width={75} height={75} />
                    </a>
                  </Link>
                </Grid>

                <Grid justify="center" xs={12} md={4}>
                  <Link href="https://www.youtube.com/channel/UCsMPBOwCuzcEDQAtCNMCmM">
                    <a target="_blank">
                      <YoutubeIcon
                        color={color.youtube}
                        width={75}
                        height={75}
                      />
                    </a>
                  </Link>
                </Grid>

                <Grid justify="center" xs={12} md={4}>
                  <Link href="https://www.tiktok.com/@visimediaofficial">
                    <a target="_blank">
                      <TiktokIcon color={color.tiktok} width={75} height={75} />
                    </a>
                  </Link>
                </Grid>
              </Grid.Container>
            </Marketplace>
          </Grid>
          <Grid xs={12} md={6}>
            <Marketplace title={"Marketplace"}>
              <Grid.Container gap={3} justify="flex-start">
                <Grid justify="center" xs={12} md={6}>
                  <Link href="https://www.facebook.com/people/Visimedia-SupplierPrinting/100013772404133/">
                    <a target="_blank">
                      <TokopediaIcon ecommerce width={250} height={75} />
                    </a>
                  </Link>
                </Grid>
                <Grid justify="center" xs={12} md={6}>
                  <Link href="https://www.instagram.com/visimediaindonesia/">
                    <a target="_blank">
                      <ShopeeIcon ecommerce width={250} height={75} />
                    </a>
                  </Link>
                </Grid>
                <Grid justify="center" xs={12} md={6}>
                  <Link href="https://twitter.com/visimediasupply">
                    <a target="_blank">
                      <BukalapakIcon ecommerce width={250} height={75} />
                    </a>
                  </Link>
                </Grid>
              </Grid.Container>
            </Marketplace>
          </Grid>
        </Grid.Container>
      </Container>

      <Spacer y={2} />

      <Container fluid md>
        <Row align="center">
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
