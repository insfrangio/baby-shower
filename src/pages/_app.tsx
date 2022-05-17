import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType
} from 'next';
import type { AppLayoutProps, AppProps } from 'next/app';
import Head from 'next/head';

import { Fragment, ReactNode, useEffect, useState } from 'react';

import GlobalStyles from '@/styles/global';

import 'antd/dist/antd.css';

declare module 'next' {
  type NextLayoutComponentType<P = Record<string, never>> = NextComponentType<
    NextPageContext,
    never,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module 'next/app' {
  type AppLayoutProps = AppProps & {
    Component: NextLayoutComponentType;
  };
}

const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  const getLayout =
    (Component.getLayout as (page: ReactNode) => ReactNode) ||
    ((page: ReactNode) => page);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) return null;

  return (
    <Fragment>
      <Head>
        <title>Baby shower</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Parisienne&family=Roboto+Flex:opsz@8..144&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Merriweather:wght@300;700&family=Open+Sans:wght@300;400&display=swap'
          rel='stylesheet'
        />
      </Head>
      <GlobalStyles />

      {getLayout(<Component {...pageProps} />)}
    </Fragment>
  );
};

export default MyApp;
