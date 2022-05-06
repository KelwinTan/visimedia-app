import { Container, Divider, Grid, Text } from "@nextui-org/react";
import route from "constants/route";
import Head from "next/head";
import Link from "next/link";
import { container, styFAQList } from "./style";

export default function (props) {
  return (
    <>
      <Head>
        <title>FAQ - Visimedia Supplies – Digital Printing Supplies</title>
        <meta
          name="description"
          content="FAQ - Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>
      <Container className={container}>
        <Text h2 css={{ textAlign: "center" }}>
          Frequently Asked Questions
        </Text>

        <Grid.Container>
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

              <Link href={route.faq["how-to-buy"]}>
                <a>
                  <Text className="link">Cara Berbelanja</Text>
                  <Divider />
                </a>
              </Link>

              <Link href={route.faq.delivery}>
                <a>
                  <Text className="link">Pengiriman</Text>
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
        </Grid.Container>
      </Container>
    </>
  );
}
