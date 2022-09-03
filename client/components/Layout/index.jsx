import { node } from "prop-types";
import { inputNav, styMain, styNav } from "./style";
import { LOGO } from "assets/image";
import Image from "next/image";
import Head from "next/head";
import { Input, Container } from "@nextui-org/react";
import SearchIcon from "components/Icon/SearchIcon";
import Link from "next/link";
import { hover, noneSelected } from "styles/globals";
import { useUA } from "providers/user-agent";
import Footer from "./Footer";
import { cx } from "@emotion/css";
import MenuDesktop from "./Menu/Desktop";
import dynamic from "next/dynamic";

const AsideMobile = dynamic(
  () => import(/* webpackChunkName: "aside-mobile" */ "components/Aside"),
  { ssr: false }
);
const NavBottom = dynamic(
  () => import(/* webpackChunkName: "nav-bottom" */ "components/NavBottom"),
  { ssr: true }
);

const MenuActionDesktop = dynamic(
  () =>
    import(
      /* webpackChunkName: "menu-action-desktop" */ "./Menu/Desktop/MenuAction"
    ),
  { ssr: true }
);

const Layout = ({ children }) => {
  const { isMobile, isDesktop } = useUA();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styNav}>
        <Container
          md
          display="flex"
          wrap="nowrap"
          alignItems="center"
          css={{ padding: 10 }}
        >
          {isDesktop && <MenuDesktop />}
          <Link href="/">
            <a>
              <Image
                src={LOGO}
                alt="visimedia-logo"
                width={130}
                height={33}
                className={cx(hover, noneSelected)}
                objectFit="cover"
              />
            </a>
          </Link>
          <Input
            className={inputNav}
            placeholder="Cari Produk"
            animated={false}
            shadow={false}
            fullWidth
            contentRight={<SearchIcon />}
          />

          {isDesktop && <MenuActionDesktop />}
        </Container>
      </nav>

      <main className={styMain({ isMobile })}>
        <section>{children}</section>
        <Footer />
      </main>

      {isMobile && (
        <>
          <AsideMobile />
          <NavBottom />
        </>
      )}
    </>
  );
};

Layout.propTypes = {
  children: node,
};

export default Layout;
