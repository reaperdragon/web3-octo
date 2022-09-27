import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Footer, Header } from "../components";
import { truncateEthAddress } from "../utils/trucAddress";

const url = `http://arweave.net/`;

const FETCH_BLOGS = gql`
  query blogs($orderBy: String!, $orderDirection: String!) {
    blogs(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      blogcoverhash
      blogtitle
      blogcontent
      category
      user
      createdAt
    }
  }
`;

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  const clientApollo = useApolloClient();

  const [addr, setAddr] = useState("");

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

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

  console.log(blogs);

  return (
    <div>
      <Head>
        <title>Octo 🐙</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mt-8 font-body">
        <h1 className=" text-center text-9xl font-bold">Octo 🐙</h1>
        <div className="my-10 grid overflow-hidden grid-cols-3 grid-rows-2 gap-6  h-max md:grid-cols-2 sm:grid-cols-1 px-[28px] sm:px-1 sm:gap-1  max-w-[1440px] mx-auto md:gap-y-8 sm:gap-y-4">
          {blogs &&
            blogs?.blogs?.map((data) => (
              <div
                key={data.id}
                className="w-full h-[418px] p-3 border sm:border-0 border-sky-500/20 rounded-xl hover:bg-[#1E364A] sm:bg-[#1E364A] cursor-pointer hover:border-0"
              >
                <div className="w-full h-[300px] rounded-lg relative">
                  <img
                    src={url + data.blogcoverhash}
                    alt={data.blogtitle}
                    className="w-full h-full rounded-lg"
                  />
                  <div className="flex items-center justify-center">
                    <p className="absolute w-auto text-center bottom-2 left-auto right-auto backdrop-blur-sm bg-white/40 p-4 rounded-full  ">
                      <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800">
                        {data.category}
                      </span>
                    </p>
                  </div>
                </div>
                <h3 className="text-white text-3xl my-2 font-semibold">
                  {data.blogtitle}
                </h3>
                <p className="">
                  Owner:{" "}
                  <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800">
                    {truncateEthAddress(addr)}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
