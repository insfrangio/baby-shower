import Head from 'next/head';

import { FC } from 'react';

import GlobalStyles from '@/styles/global';

import * as S from './style';

import 'antd/dist/antd.css';

const Bootstrap: FC = ({ children }) => {
  return (
    <S.Wrapper>
      <Head>
        <title>Admin Ingress</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GlobalStyles />
      {children}
    </S.Wrapper>
  );
};

export default Bootstrap;
