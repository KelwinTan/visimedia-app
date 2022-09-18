import { Container, Divider, Grid, Text } from "@nextui-org/react";
import route from "constants/route";
import { useMediaQuery } from "hooks/useMediaQuery";
import Head from "next/head";
import Link from "next/link";
import { node } from "prop-types";
import { useUA } from "providers/user-agent";
import { container, styFAQList } from "styles/faq";

export default function Layout({ children }) {
  const isMd = useMediaQuery(960);
  const { isDesktop } = useUA();

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
          {isDesktop && (
            <>
              <Grid xs={12} md={2}>
                <div
                  className={styFAQList}
                  style={isMd ? { width: "100%", marginBottom: 14 } : {}}
                >
                  <Text weight={"bold"} css={{ marginBottom: 8 }}>
                    Frequently Asked Questions
                  </Text>

                  <Link href={route.faq["how-to-buy"]}>
                    <a>
                      <Text className="link">Cara berbelanja</Text>
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
                      <Divider />
                    </a>
                  </Link>

                  <Link href={route.faq["about-us"]}>
                    <a>
                      <Text className="link">Tentang Kami</Text>
                      <Divider />
                    </a>
                  </Link>

                  <Link href={route.faq.marketplace}>
                    <a>
                      <Text className="link">Marketplace Kami</Text>
                    </a>
                  </Link>
                </div>
              </Grid>
            </>
          )}

          <Grid xs={12} md={9} css={{ paddingLeft: isMd ? 0 : "2rem" }}>
            <>{children}</>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: node.isRequired,
};
