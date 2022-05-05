import Layout from "components/Layout";
import { NextUIProvider } from "@nextui-org/react";

import { Global } from "@emotion/react";
import globalCss from "styles/globals";

import App from "next/app";
import ContextProvider from "providers/ContextProvider";

function MyApp({ Component, pageProps }) {
  console.log("my app ", { pageProps });
  return (
    <NextUIProvider>
      <Global styles={globalCss} />
      <ContextProvider {...pageProps}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </NextUIProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const initialProps = await App.getInitialProps(ctx);
  const userAgent = ctx.ctx.req.headers["user-agent"];
  return { ...initialProps, userAgent };
};

export default MyApp;
