import { css } from "@emotion/css";
import Carousel from "components/Carousel";
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
