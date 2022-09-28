import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BlogContainer, Footer, Header } from "../../components";
import ReactMarkdown from "react-markdown";
import moment from "moment/moment";
import { truncateEthAddress } from "../../utils/trucAddress";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { Edit } from "iconsax-react";
import { useBundler } from "../../context/bundlrContext";

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

  const [addr, setAddr] = useState("");

  const { setEditBlog } = useBundler();

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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBlogs();
  }, [router.query.id]);

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  const rl = otherBlogs.filter((other) => other?.category === blog?.category);

  return (
    <div className="font-body  text-white">
      <Head>
        <title>{blog?.blogtitle} | Octo 🐙</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="max-w-[1440px] my-10 mx-auto flex flex-col">
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-2 items-center justify-center ">
            <div className="max-w-[800px] max-h-[400px] relative rounded-xl mb-10 md:max-w-[680px] md:max-h-[400px] mx-auto my-0">
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
            <div className="w-full mx-auto my-0">
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

                <div>
                  {blog.user === addr ? (
                    <div
                      className={`${
                        blog.user === addr ? `block cursor-pointer` : `hidden`
                      } `}
                      onClick={() => {
                        setEditBlog(blog.id);
                        router.push("/upload");
                      }}
                    >
                      <Edit size="32" color="#d9e3f0" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 max-w-[800px] mx-auto my-1 sm:px-2 sm:text-xs ssm:text-sm prose text-white border-2 border-white ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className=""
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
      {rl?.length > 0 ? (
        <div className="max-w-[1440px] my-2 mx-auto px-[28px] sm:px-2 justify-center items-center flex">
          <h2>Related to {blog?.category}</h2>
        </div>
      ) : null}
      <div className="my-10 grid overflow-hidden grid-cols-3 gap-6 h-max md:grid-cols-2 sm:grid-cols-1 px-[28px] sm:px-1 sm:gap-1  max-w-[1440px] mx-auto md:gap-y-8 sm:gap-y-4">
        {rl && rl?.map((data) => <BlogContainer data={data} key={data.id} />)}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
