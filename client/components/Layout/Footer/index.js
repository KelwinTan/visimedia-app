import { Container, Divider, Grid, Row, Text } from "@nextui-org/react";
import route from "constants/route";
import Link from "next/link";
import { footerItem, styFooter, styFooterGrid } from "./style";
import EmailIcon from "components/Icon/EmailIcon";
import color from "constants/color";
import PhoneIcon from "components/Icon/PhoneIcon";
import JneIcon from "components/Icon/JneIcon";
import MexIcon from "components/Icon/MexIcon";
import GojekIcon from "components/Icon/GojekIcon";
import GrabIcon from "components/Icon/GrabIcon";
import AnterAjaIcon from "components/Icon/AnterAjaIcon";
import ShopeeIcon from "components/Icon/ShopeeIcon";
import BcaIcon from "components/Icon/BcaIcon";
import MandiriIcon from "components/Icon/MandiriIcon";
import PermataIcon from "components/Icon/PermataIcon";
import VisaIcon from "components/Icon/VisaIcon";
import MastercardIcon from "components/Icon/MastercardIcon";
import FacebookIcon from "components/Icon/FacebookIcon";
import InstagramIcon from "components/Icon/InstagramIcon";
import TwitterIcon from "components/Icon/TwitterIcon";

const Footer = () => {
  return (
    <footer className={styFooter}>
      <Container md>
        <Grid.Container gap={2} justify="space-between">
          <Grid xs={12} md={3}>
            <div className={footerItem}>
              <Text css={{ marginBlock: 8 }} weight={"bold"}>
                Bantuan
              </Text>

              <Link href={route.faq["how-to-buy"]}>
                <Text className={"link"} size={14}>
                  Cara berbelanja
                </Text>
              </Link>

              <Link href={route.faq.payment}>
                <Text className={"link"} size={14}>
                  Cara Pembayaran
                </Text>
              </Link>

              <Link href={route.faq.delivery}>
                <Text className={"link"} size={14}>
                  Pengiriman
                </Text>
              </Link>

              <Link href={route.faq["call-us"]}>
                <Text className={"link"} size={14}>
                  Hubungi Kami
                </Text>
              </Link>
            </div>
          </Grid>

          <Grid xs={12} md={3}>
            <div className={footerItem}>
              <Text css={{ marginBlock: 8 }} weight={"bold"}>
                Toko Kami
              </Text>

              <Row align="center">
                <EmailIcon width={16} height={16} color={color.black} />
                <Text className={"link"} size={14} style={{ marginLeft: 8 }}>
                  visimediasupplier@gmail.com
                </Text>
              </Row>

              <Row align="center">
                <PhoneIcon width={16} height={16} color={color.black} />
                <Text className={"link"} size={14} style={{ marginLeft: 8 }}>
                  visimediasupplier@gmail.com
                </Text>
              </Row>
            </div>
          </Grid>

          <Grid xs={12} md={3}>
            <div className={footerItem}>
              <Text css={{ marginBlock: 8 }} weight={"bold"}>
                Tentang Kami
              </Text>

              <Row align="center">
                <EmailIcon width={16} height={16} color={color.black} />
                <Text className={"link"} size={14} style={{ marginLeft: 8 }}>
                  visimediasupplier@gmail.com
                </Text>
              </Row>

              <Row align="center">
                <PhoneIcon width={16} height={16} color={color.black} />
                <Text className={"link"} size={14} style={{ marginLeft: 8 }}>
                  visimediasupplier@gmail.com
                </Text>
              </Row>
            </div>
          </Grid>
        </Grid.Container>

        <Grid.Container gap={2} justify="space-between">
          <Grid xs={12} md={3}>
            <div className={footerItem}>
              <Text css={{ marginBlock: 8 }} weight={"bold"}>
                Metode Pengiriman
              </Text>

              <div className={styFooterGrid}>
                <JneIcon />
                <MexIcon />
                <GojekIcon />
                <GrabIcon />
                <AnterAjaIcon />
                <ShopeeIcon />
              </div>
            </div>
          </Grid>

          <Grid xs={12} md={3} justify="cente">
            <div className={footerItem}>
              <Text css={{ marginBlock: 8 }} weight={"bold"}>
                Metode Pembayaran
              </Text>

              <div className={styFooterGrid}>
                <BcaIcon />
                <MandiriIcon />
                <PermataIcon />
                <VisaIcon />
                <MastercardIcon />
              </div>
            </div>
          </Grid>

          <Grid xs={12} md={3}>
            <div className={footerItem}>
              <Text css={{ marginBlock: 8 }} weight={"bold"}>
                Social Media
              </Text>

              <div className={styFooterGrid}>
                <Link href="https://www.facebook.com/people/Visimedia-SupplierPrinting/100013772404133/">
                  <a target="_blank">
                    <FacebookIcon color={color.blue} />
                  </a>
                </Link>
                <Link href="https://www.instagram.com/visimediaindonesia/">
                  <a target="_blank">
                    <InstagramIcon color={color.ig} />
                  </a>
                </Link>
                <Link href="https://twitter.com/visimediasupply">
                  <a target="_blank">
                    <TwitterIcon color={color.twitter} />
                  </a>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid.Container>

        <Divider css={{ margin: "3rem 0" }} />

        <Text css={{ marginBottom: "2rem" }}>
          Copyright <b>2022</b> © <b>Visimediasupplies.com</b>. All Rights
          Reserved.
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
