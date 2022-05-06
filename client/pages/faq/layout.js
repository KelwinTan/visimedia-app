import { Container, Divider, Grid, Row, Text } from "@nextui-org/react";
import route from "constants/route";
import { useMediaQuery } from "hooks/useMediaQuery";
import Head from "next/head";
import Link from "next/link";
import { node } from "prop-types";
import { container, styFAQList } from "styles/faq";

export default function Layout({ children }) {
  const isMd = useMediaQuery(960);
  console.log({ isMd });
  return (
    <>
      <Head>
        <title>FAQ - Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="FAQ - Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>
      <Container md className={container}>
        <Text h2 css={{ textAlign: "center" }}>
          Frequently Asked Questions
        </Text>

        <Grid.Container css={{ marginTop: "3rem" }}>
          <Grid>
            <div className={styFAQList}>
              <Text weight={"bold"} css={{ marginBottom: 8 }}>
                Frequently Asked Questions
              </Text>

              <Link href={route.faq.payment}>
                <a>
                  <Text className="link">Pembayaran</Text>
                  <Divider />
                </a>
              </Link>

              <Link href={route.faq.delivery}>
                <a>
                  <Text className="link">Pengiriman</Text>
                  <Divider />
                </a>
              </Link>

              <Link href={route.faq.terms}>
                <a>
                  <Text className="link">Syarat dan Ketentuan</Text>
                  <Divider />
                </a>
              </Link>

              <Link href={route.faq["call-us"]}>
                <a>
                  <Text className="link">Hubungi Kami</Text>
                </a>
              </Link>
            </div>
          </Grid>

          <Grid md={9} css={{ paddingLeft: "2rem" }}>
            <div>{children}</div>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: node.isRequired,
};
