import Layout from "components/Layout";
import { NextUIProvider } from "@nextui-org/react";

import { Global } from "@emotion/react";
import { styGlobal as globalCss } from "styles/globals";

import App from "next/app";
import ContextProvider from "providers/ContextProvider";

function MyApp({ Component, pageProps, userAgent }) {
  const dataProps = { userAgent };
  return (
    <NextUIProvider>
      <Global styles={globalCss} />
      <ContextProvider {...dataProps}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </NextUIProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const initialProps = await App.getInitialProps(ctx);
  let userAgent;
  if (!!ctx.ctx.req) userAgent = ctx.ctx.req.headers["user-agent"];
  else userAgent = navigator.userAgent;
  return { ...initialProps, userAgent };
};

export default MyApp;
