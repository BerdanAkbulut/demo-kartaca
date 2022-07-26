import type { NextPage } from 'next';
import Head from 'next/head';
import Calendar from '../components/calendar';
import Header from '../components/header';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>
      <Header />
      <Calendar/>  
    </div>
  );
};

export default Home;
