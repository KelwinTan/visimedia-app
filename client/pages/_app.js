import App from "next/app";
import { Toaster } from "react-hot-toast";
import { Global } from "@emotion/react";
import { NextUIProvider } from "@nextui-org/react";
import { getCookie } from "cookies-next";

import Layout from "components/Layout";
import { styGlobal as globalCss } from "styles/globals";
import ContextProvider from "providers/ContextProvider";
import authConstant from "constants/auth";
import color from "constants/color";

function MyApp({ Component, pageProps, userAgent, auth }) {
  const dataProps = { userAgent, auth };

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

  const token = getCookie(authConstant.TOKEN, { req, res });
  const user = getCookie(authConstant.USER, { req, res });

  return { ...initialProps, userAgent, auth: { user, token } };
};

export default MyApp;
