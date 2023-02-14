import App from 'next/app';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';
import { Global } from '@emotion/react';
import { NextUIProvider } from '@nextui-org/react';
import { getCookie } from 'cookies-next';

import Layout from 'components/Layout';
import { styGlobal as globalCss } from 'styles/globals';
import ContextProvider from 'providers/ContextProvider';
import authConstant from 'constants/auth';
import { node, object } from 'prop-types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SSRProvider } from 'react-aria';
import Script from 'next/script';

const queryClient = new QueryClient();

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, userAgent, auth }) {
  const dataProps = { userAgent, auth };

  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <Global styles={globalCss} />
          <ContextProvider {...dataProps}>
            <Layout>
              <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
        <!--Start of Tawk.to Script-->
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/63eae5e6c2f1ac1e20331b80/1gp6p43me';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
<!--End of Tawk.to Script-->
        `
                }}
              />
              <Component {...pageProps} />
              <Toaster toastOptions={{ duration: 2000 }} position="top-right" />
            </Layout>
          </ContextProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </SSRProvider>
  );
}

MyApp.getInitialProps = async ctx => {
  const initialProps = await App.getInitialProps(ctx);
  const req = ctx.ctx.req;
  const res = ctx.ctx.res;

  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

  const token = getCookie(authConstant.TOKEN, { req, res });
  const user = getCookie(authConstant.USER, { req, res });

  return { ...initialProps, userAgent, auth: { user, token } };
};

export default MyApp;
