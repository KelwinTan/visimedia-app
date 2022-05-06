import { css } from "@emotion/css";
import Head from "next/head";
import Image from "next/image";

const style = {
  banner: css`
    width: 100%;
    height: 370px;
    position: relative;
  `,
};
export default function Home() {
  return (
    <div>
      <Head>
        <title>Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>

      <div className={style.banner}>
        <Image
          src="https://dummyimage.com/1080x370/058585/fff.png"
          layout={"fill"}
          objectFit="cover"
          alt="banner"
        />
      </div>
    </div>
  );
}
