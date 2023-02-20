import { node } from 'prop-types';
import { inputNav, styMain, styNav } from './style';
import { LOGO } from 'assets/image';
import Image from "next/legacy/image";
import Head from 'next/head';
import { Input, Container } from '@nextui-org/react';
import SearchIcon from 'components/Icon/SearchIcon';
import Link from 'next/link';
import { hover, noneSelected } from 'styles/globals';
import { useUA } from 'providers/user-agent';
import Footer from './Footer';
import { cx } from '@emotion/css';
import MenuDesktop from './Menu/Desktop';
import dynamic from 'next/dynamic';
import SearchInput from 'components/Search';
import SubHeader from 'components/SubHeader';

const AsideMobileCategory = dynamic(
  () =>
    import(/* webpackChunkName: "aside-mobile" */ 'components/Aside/Category'),
  { ssr: false }
);

const AsideMenuMobile = dynamic(
  () => import(/* webpackChunkName: "aside-mobile" */ 'components/Aside/Menu'),
  { ssr: false }
);

const FilterMobile = dynamic(
  () =>
    import(/* webpackChunkName: "aside-mobile" */ 'components/Aside/Filter'),
  { ssr: false }
);

const NavBottom = dynamic(
  () => import(/* webpackChunkName: "nav-bottom" */ 'components/NavBottom'),
  { ssr: true }
);

const MenuActionDesktop = dynamic(
  () =>
    import(
      /* webpackChunkName: "menu-action-desktop" */ './Menu/Desktop/MenuAction'
    ),
  { ssr: true }
);

const Layout = ({ children }) => {
  const { isMobile, isDesktop } = useUA();

  return <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <SubHeader />
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

          <Image
            src={LOGO}
            alt="visimedia-logo"
            width={200}
            height={50}
            className={cx(hover, noneSelected)}
            objectFit="cover"
            priority
          />

        </Link>
        <div className={inputNav}>
          <SearchInput />
        </div>
        {isDesktop && <MenuActionDesktop />}
      </Container>
    </nav>

    <main className={styMain({ isMobile })}>
      <section>{children}</section>
      <Footer />
    </main>

    {isMobile && (
      <>
        <AsideMobileCategory />
        <FilterMobile />
        <AsideMenuMobile />
        <NavBottom />
      </>
    )}
  </>;
};

Layout.propTypes = {
  children: node
};

export default Layout;
