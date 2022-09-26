import Head from "next/head";
import React from "react";
import { Header } from "../components";

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>Octo 🐙</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mt-8">
        <div className="grid grid-cols-5 gap-6 h-max md:grid-cols-2 sm:grid-cols-1 px-[28px] sm:px-1 sm:gap-1 md:gap-y-1 max-w-[1440px] my-0 mx-auto">
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
