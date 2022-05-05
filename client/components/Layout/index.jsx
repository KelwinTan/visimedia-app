import { node } from "prop-types";
import {
  actionContainer,
  inputNav,
  styMain,
  styNav,
  userContainer,
} from "./style";
import { LOGO } from "assets/image";
import Image from "next/image";
import Head from "next/head";
import { Input, Container, Text } from "@nextui-org/react";
import SearchIcon from "components/Icon/SearchIcon";
import UserIcon from "components/Icon/UserIcon";
import Link from "next/link";
import { hover } from "styles/globals";
import HamburgerIcon from "components/Icon/HamburgerIcon";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styNav}>
        <Container
          fluid
          display="flex"
          wrap="nowrap"
          alignItems="center"
          css={{ padding: "5px 10px" }}
        >
          <HamburgerIcon />
          <Link href="/">
            <Image
              src={LOGO}
              alt="visimedia-logo"
              width={130}
              height={33}
              className={hover}
              objectFit="contain"
            />
          </Link>
          <Input
            className={inputNav}
            placeholder="Cari Produk"
            animated={false}
            shadow={false}
            fullWidth
            contentRight={<SearchIcon />}
          />

          <div className={actionContainer}>
            <UserIcon />
            <div className={userContainer}>
              <Link href={"/login"}>
                <Text weight="bold" css={{ marginLeft: 4 }} size={14}>
                  Masuk
                </Text>
              </Link>
              <Link href={"/register"}>
                <Text weight="bold" css={{ marginLeft: 4 }} size={14}>
                  Daftar
                </Text>
              </Link>
            </div>
          </div>
        </Container>
      </nav>

      <main className={styMain}>{children}</main>

      <footer></footer>
    </>
  );
};

Layout.propTypes = {
  children: node,
};

export default Layout;
