import App from "next/app";
import { Toaster } from "react-hot-toast";
import { Global } from "@emotion/react";
import { NextUIProvider } from "@nextui-org/react";
import { getCookie } from "cookies-next";

import Layout from "components/Layout";
import { styGlobal as globalCss } from "styles/globals";
import ContextProvider from "providers/ContextProvider";
import authConstant from "constants/auth";

function MyApp({ Component, pageProps, userAgent, isAuth }) {
  const dataProps = { userAgent, isAuth };

  return (
    <NextUIProvider>
      <Global styles={globalCss} />
      <ContextProvider {...dataProps}>
        <Layout>
          <Component {...pageProps} />
          <Toaster toastOptions={{ duration: 2000 }} position="top-right" />
        </Layout>
      </ContextProvider>
    </NextUIProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const initialProps = await App.getInitialProps(ctx);
  const req = ctx.ctx.req;
  const res = ctx.ctx.res;

  let userAgent;
  if (!!req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }

  const isAuth = !!getCookie(authConstant.TOKEN, { req, res });

  return { ...initialProps, userAgent, isAuth };
};

export default MyApp;
