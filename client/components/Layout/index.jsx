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
import { hover, noneSelected } from "styles/globals";
import HamburgerIcon from "components/Icon/HamburgerIcon";
import { useUA } from "providers/user-agent";
import NavBottom from "components/NavBottom";
import Footer from "./Footer";
import color from "constants/color";
import Dropdown from "components/Dropdown";
import DropdownItem from "components/Dropdown/DropdownItem";
import { cx } from "@emotion/css";
import Aside from "components/Aside";

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
          {isDesktop && (
            <div style={{ marginRight: 10 }}>
              <Dropdown
                header={<HamburgerIcon />}
                content={
                  <>
                    <DropdownItem>
                      <Text color={color.primary} h4>
                        Produk
                      </Text>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/">
                        <a>
                          <Text weight={"semibold"}>Flexi Frontlite</Text>
                        </a>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/">
                        <a>
                          <Text weight={"semibold"}>Flexi Backlite</Text>
                        </a>
                      </Link>
                    </DropdownItem>

                    <DropdownItem>
                      <Link href="/">
                        <a>
                          <Text weight={"semibold"}>Media Indoor</Text>
                        </a>
                      </Link>
                    </DropdownItem>

                    <DropdownItem>
                      <Link href="/">
                        <a>
                          <Text weight={"semibold"}>Stickers</Text>
                        </a>
                      </Link>
                    </DropdownItem>

                    <DropdownItem>
                      <Link href="/">
                        <a>
                          <Text weight={"semibold"}>Laminating</Text>
                        </a>
                      </Link>
                    </DropdownItem>

                    <DropdownItem>
                      <Link href="/">
                        <a>
                          <Text weight={"semibold"}>Display</Text>
                        </a>
                      </Link>
                    </DropdownItem>

                    <DropdownItem>
                      <Link href="/">
                        <a>
                          <Text weight={"semibold"}>Ink & Accessories</Text>
                        </a>
                      </Link>
                    </DropdownItem>
                  </>
                }
              />
            </div>
          )}
          <Link href="/">
            <a>
              <Image
                src={LOGO}
                alt="visimedia-logo"
                width={130}
                height={33}
                className={cx(hover, noneSelected)}
                objectFit="contain"
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

          {isDesktop && (
            <div className={actionContainer}>
              <UserIcon />
              <div className={userContainer}>
                <Link href={"/login"}>
                  <a>
                    <Text
                      weight="bold"
                      css={{ marginLeft: 8, color: color.gray }}
                      size={14}
                      className={hover}
                    >
                      Masuk
                    </Text>
                  </a>
                </Link>
                <Link href={"/register"}>
                  <a>
                    <Text
                      weight="bold"
                      css={{ marginLeft: 8, color: color.gray }}
                      size={14}
                      className={hover}
                    >
                      Daftar
                    </Text>
                  </a>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </nav>

      <main className={styMain({ isMobile })}>
        <section>{children}</section>
        <Footer />
      </main>

      {isMobile && <Aside />}
      {isMobile && <NavBottom />}
    </>
  );
};

Layout.propTypes = {
  children: node,
};

export default Layout;
