import dynamic from 'next/dynamic';
import { importRemote } from '@module-federation/utilities';
import React from 'react';

const Home = ({ remoteUrl }) => {
  const HomeRemote = dynamic(
    async () => {
      return importRemote({
        url: remoteUrl,
        scope: 'remote_home',
        module: 'Application',
        remoteEntryFileName: 'remote.js',
        bustRemoteEntryCache: true,
      });
    },
    { ssr: false, loading: () => <span>...Loading</span> }
  );
  return (
    <main>
      <HomeRemote />
    </main>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      remoteUrl: 'http://localhost:3001',
    },
  };
}

export default Home;
