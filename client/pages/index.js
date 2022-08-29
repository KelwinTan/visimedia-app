import { css } from "@emotion/css";
import { Grid } from "@nextui-org/react";
import Carousel from "components/Carousel";
import ProductCard from "components/ProductCard";
import Head from "next/head";
import Image from "next/image";
import _axios from "shared/axios";

const style = {
  banner: css`
    width: 100%;
    height: 370px;
    position: relative;
  `,
};

const list = [
  {
    title: "Orange",
    img: "/images/fruit-1.jpeg",
    final_price: "Rp1.599.000",
    price: "Rp1.699.000",
    discount: 0.6,
    sold: 100,
  },

  {
    title: "Orange",
    img: "/images/fruit-1.jpeg",
    final_price: "Rp1.599.000",
    price: "Rp1.699.000",
    discount: 0,
    sold: 100,
  },
];

export default function Home({ banners }) {
  return (
    <div>
      <Head>
        <title>Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>

      <Carousel
        items={banners.map((banner, idx) => (
          <div key={idx} className={style.banner}>
            <Image
              src={`${process.env.IMAGE_URL}${banner.public_image_path}`}
              layout={"fill"}
              objectFit="cover"
              alt="banner"
            />
          </div>
        ))}
      />

      <Grid.Container gap={2} justify="flex-start">
        {list.map((item, index) => (
          <Grid xs={12} sm={2} key={index}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    data: { banners = [] },
  } = await _axios.get("/banners");

  return {
    props: { banners }, // will be passed to the page component as props
  };
}
