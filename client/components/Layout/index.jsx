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
import { Input, Container, Text, User } from "@nextui-org/react";
import SearchIcon from "components/Icon/SearchIcon";
import UserIcon from "components/Icon/UserIcon";
import Link from "next/link";
import { hover, noneSelected } from "styles/globals";
import { useUA } from "providers/user-agent";
import NavBottom from "components/NavBottom";
import Footer from "./Footer";
import color from "constants/color";
import { cx } from "@emotion/css";
import Aside from "components/Aside";
import { useAuth } from "providers/auth";
import MenuDesktop from "./Menu/MenuDesktop";

const Layout = ({ children }) => {
  const { isMobile, isDesktop } = useUA();
  const { isAuth, user } = useAuth();

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

          {isDesktop && (
            <div className={actionContainer}>
              {isAuth ? (
                <User
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  name={user.name}
                />
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </Container>
      </nav>

      <main className={styMain({ isMobile })}>
        <section>{children}</section>
        <Footer />
      </main>

      {isMobile && (
        <>
          <Aside />
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
