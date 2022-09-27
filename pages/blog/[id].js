import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";


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
      date
      createdAt
    }
  }
`;

const Blog = () => {
  const router = useRouter();

  const [blog, setBlog] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

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
        const other = data.blogs.filter((blog) => blog.id !== router.query.id);
        setOtherBlogs(other);

        const b = data?.blogs?.find((blog) => blog.id === router.query.id);

        setBlog(b);

        otherBlogs?.find(
          (related) =>
            related.category === blog.category && setRelatedBlogs(related)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBlogs();
  }, [router.query.id]);

  console.log(blog);

  console.log(relatedBlogs);

  return (
    <div>
      <Head>
        <title>{blog?.blogtitle} | Octo 🐙</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="max-w-[1440px] my-10 mx-auto flex flex-col items-center justify-center">
        <div>
          <div>
            <img src={url + blog?.blogcoverhash} alt={blog.category} />
            <p>{blog?.category}</p>
          </div>
          <div>
            <h2>{blog?.blogtitle}</h2>
            <p>{blog.date}</p>
          </div>
          {/* ReactMarkDown */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
