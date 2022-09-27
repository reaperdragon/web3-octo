import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import ReactMarkdown from "react-markdown";
import moment from "moment/moment";
import { truncateEthAddress } from "../../utils/trucAddress";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

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

        const rel = otherBlogs?.find(
          (related) => related.category === blog.category
        );
        setRelatedBlogs(rel);
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
    <div className="font-body  text-white">
      <Head>
        <title>{blog?.blogtitle} | Octo 🐙</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="max-w-[1440px] my-10 mx-auto flex flex-col">
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="max-w-[800px] max-h-[400px] relative rounded-xl mb-10 md:max-w-[680px] md:max-h-[400px]">
              <img
                src={url + blog?.blogcoverhash}
                alt={blog.category}
                className="w-full h-full rounded-xl"
              />
              <div className="flex items-center justify-center">
                <p className="absolute w-auto text-center bottom-2 left-auto right-auto backdrop-blur-sm bg-white/40 p-4 rounded-full  ">
                  <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800">
                    {blog?.category}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-white text-3xl my-2 font-semibold text-center">
                {blog?.blogtitle}
              </h2>
              <div className="flex justify-between items-center max-w-[800px] my-2 mx-auto px-10">
                <p className="text-white/50">
                  Owner:{" "}
                  <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800">
                    {" "}
                    {truncateEthAddress(blog?.user)}
                  </span>
                </p>
                <p className="text-white/50">{moment(blog?.date).fromNow()}</p>
              </div>
            </div>
          </div>
          <div className="px-10 max-w-[1024px] mx-auto my-1 sm:px-6">
            <ReactMarkdown className=""
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      // parent tag
                      style={dracula} // theme
                      language={match[1]}
                      PreTag="section" //
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {blog.blogcontent}
            </ReactMarkdown>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
