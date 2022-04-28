import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType
} from 'next';
import type { AppLayoutProps, AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ReactNode, useEffect, useState } from 'react';

import client from '@/apollo/client';
import GlobalStyles from '@/styles/global';
// eslint-disable-next-line import-helpers/order-imports
import { ApolloProvider } from '@apollo/client';

import 'antd/dist/antd.css';

import { useAtom } from 'jotai';

import { tokenAtom } from './login';
import Login from './login';

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
  const router = useRouter();
  const [token] = useAtom(tokenAtom);

  useEffect(() => {
    setShowChild(true);
  }, []);

  useEffect(() => {
    const redirect = async () => {
      if (!token) return await router.push('/login');
    };

    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!showChild) return null;

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Admin Ingress</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GlobalStyles />
      {token ? getLayout(<Component {...pageProps} />) : <Login />}
    </ApolloProvider>
  );
};

export default MyApp;
