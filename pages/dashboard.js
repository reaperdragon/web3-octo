import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Footer, Header } from "../components";
import {BlogContainer} from "../components";

const FETCH_BLOGS = gql`
  query blogs($orderBy: String!, $orderDirection: String!) {
    blogs(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      blogcoverhash
      blogtitle
      category
      user
    }
  }
`;

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  const clientApollo = useApolloClient();

  const getBlogs = async () => {
    clientApollo
      .query({
        query: FETCH_BLOGS,
        variables: {
          orderBy: "createdAt",
          orderDirection: "desc",
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBlogs();
  }, [blogs]);

  return (
    <div>
      <Head>
        <title>Octo 🐙</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mt-8 font-body">
        <h1 className=" text-center text-9xl font-bold sm:text-lg">Octo 🐙</h1>
        <div className="my-10 grid overflow-hidden grid-cols-3 grid-rows-2 gap-6  h-max md:grid-cols-2 sm:grid-cols-1 px-[28px] sm:px-1 sm:gap-1  max-w-[1440px] mx-auto md:gap-y-8 sm:gap-y-4">
          {blogs &&
            blogs?.blogs?.map((data) => (
             <BlogContainer data={data} key={data.id} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
