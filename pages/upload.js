import React, { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "easymde/dist/easymde.min.css";
import { ArrowCircleUp2 } from "iconsax-react";
import Head from "next/head";
import { useBundler } from "../context/bundlrContext";
import { Footer, FundWallet, Header } from "../components";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import ContractABI from "../artifacts/contracts/Blog.sol/BlogApp.json";
import { useRouter } from "next/router";
import { gql, useApolloClient } from "@apollo/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

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

const Upload = () => {
  const { initialiseBundlr, bundlrInstance, balance, uploadFile, editBlog } =
    useBundler();

  const router = useRouter();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "Blockchain",
    cover: "",
  });

  const [file, setFile] = useState("");

  const [loading, setLoading] = useState(false);
  const imageCoverRef = useRef(null);

  const clientApollo = useApolloClient();

  const triggerOnChangeCover = () => {
    console.log("Clicking");
    imageCoverRef.current.click();
  };

  const handleFileChange = (e) => {
    const uploadFile = e.target.files[0];
    if (!uploadFile) return;
    setBlog({ ...blog, cover: uploadFile });
    let reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        setFile(Buffer.from(reader.result));
      }
    };
    reader.readAsArrayBuffer(uploadFile);
  };

  const newOptions = useMemo(() => {
    return {
      spellChecker: true,
      placeholder: "Pop Out your Whole Idea in Detail here... 🧠",
    };
  }, []);

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      signer
    );
    return contract;
  };

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
        const b = data?.blogs?.find((blog) => blog.id === editBlog);
        console.log(b?.blogcoverhash);
        console.log(b?.blogtitle);
        console.log(b?.blogcontent);
        console.log(b);

        setBlog({
          title: b?.blogtitle,
          content: b?.blogcontent,
          category: b?.category,
          cover: b?.blogcoverhash,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleUpload = async () => {
    const { title, category, content, cover } = blog;
    if (title === "") {
      toast.error("Please provide Title For the Blog");
    } else if (content === "") {
      toast.error("Please provide Blog Content For the Blog");
    } else if (category === "") {
      toast.error("Please provide Blog Category For the Blog");
    } else if (cover === "") {
      toast.error("Please provide Blog Cover image For the Blog");
    } else {
      setLoading(true);
      console.log("Clicking");
      const url = await uploadFile(file);
      console.log(url);
      publishBlog(url.data.id);
    }
  };

  console.log(file);

  const publishBlog = async (cover) => {
    try {
      const contract = await getContract();

      let uploadDate = String(new Date());

      if (editBlog) {
        await contract.updateblog(
          editBlog,
          blog.cover,
          blog.title,
          blog.content,
          blog.category
        );
      }

      await contract.createblog(
        cover,
        blog.title,
        blog.content,
        blog.category,
        uploadDate
      );

      setLoading(false);

      setBlog({
        title: "",
        content: "",
        category: "",
        cover: "",
      });

      setFile("");

      toast.success("Published Successfully");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", error);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setBlog({
      title: "",
      content: "",
      cover: "",
      file: "",
    });
  };

  useEffect(() => {
    if (editBlog) {
      imageCoverRef?.current?.focus();
    }
  }, [editBlog]);

  console.log(blog);

  console.log(editBlog);

  if (!bundlrInstance) {
    return (
      <div className="justify-center items-center h-screen flex font-body flex-col">
        <h3 className="text-4xl font-bold">
          Let&apos;s initialise Bundlr now 💱
        </h3>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-8 py-5 text-center mr-2 mb-2 transition-all ease-in-out delay-150 duration-150
            hover:translate-y-1 text-1xl hover:shadow-lg hover:shadow-blue-500/80 mt-2"
          onClick={initialiseBundlr}
        >
          Initialise Bundlr 💸
        </button>
      </div>
    );
  }

  if (
    !balance ||
    (Number(balance) <= 0 && !balance) ||
    Number(balance) <= 0.02
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <h3 className="text-4xl font-body text-center">
          Oops!, Before Publishing Blog Please Add Some Funds.🪙
        </h3>
        <FundWallet />
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Octo Publish 🐙</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <input
        id="selectImage"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
        ref={imageCoverRef}
      />

      <div className="max-w-[1440px] mt-2 mb-0 mx-auto md:p-6 flex flex-col items-center justify-center">
        {blog.cover ? (
          <img
            src={
              editBlog
                ? url + blog?.cover
                : window.URL.createObjectURL(blog.cover)
            }
            alt="image"
            ref={imageCoverRef}
            className="w-[60%] h-[420px] rounded-md md:h-[280px] md:w-[80%] self-center cursor-pointer"
          />
        ) : null}
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-8 py-5 text-center mr-2 mb-2 transition-all ease-in-out delay-150 duration-150
            hover:translate-y-1 text-1xl hover:shadow-lg hover:shadow-blue-500/80 mt-2"
          onClick={triggerOnChangeCover}
        >
          Select Cover Image 🖼️
        </button>
      </div>
      <div className="flex flex-col max-w-[1440px] my-0 mx-auto font-body">
        <input
          name="title"
          placeholder="Title Goes Here"
          className="bg-transparent font-body mt-3 py-1 px-2 focus:ring-0 outline-0  text-2xl outline-none border-none"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />

        <label className="labels my-2 px-3">Category</label>
        <select
          value={blog.category}
          onChange={(e) => {
            setBlog({ ...blog, category: e.target.value });
          }}
          name="category"
          className="bg-[#1E364A] py-2 px-3 focus:ring-0 outline-0 my-4 mx-4 rounded-lg cursor-pointer outline-none border-none font-body text-lg"
        >
          <option>Blockchain</option>
          <option>Science</option>
          <option>Space</option>
          <option>Product Review</option>
          <option>Education</option>
          <option>Meditation</option>
          <option>Q&A</option>
          <option>Movie</option>
          <option>Productivity</option>
          <option>Food</option>
          <option>Nature</option>
          <option>Other</option>
        </select>

        <SimpleMDE
          className="mt-[40px] md:my-4 md:mx-4 "
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e })}
          options={newOptions}
        />

        <div className="flex sm:flex-col max-w-[1440px] my-0 sm:my-4 mx-auto gap-2 px-5 py-3 ">
          <button
            className="sm:sticky inset-x-0 md:bottom-20 font-body  h-16 w-[200px] left-0 right-0 md:mx-auto  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2  text-center  mb-4 transition-all ease-in-out delay-150 duration-150
            hover:-translate-y-1 text-1xl flex items-center justify-center gap-4 z-50 hover:shadow-lg hover:shadow-blue-500/80"
            disabled={loading}
            onClick={handleUpload}
          >
            {loading ? (
              "Publishing..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                Publish <ArrowCircleUp2 size="26" color="#d9e3f0" />
              </span>
            )}
          </button>
          <button
            className="sm:sticky inset-x-0 bottom-0 font-body  h-16 w-[200px] left-0 right-0 md:mx-auto  text-white bg-gradient-to-r bg-red-700 hover:bg-gradient-to-br border-spacing-1 focus:ring-4 focus:outline-none 
            border-red focus:ring-red-300 
            dark:focus:ring-red-800 font-medium rounded-full text-sm px-5 py-2  text-center  mb-4 transition-all ease-in-out delay-150 duration-150
            hover:-translate-y-1 text-1xl flex items-center justify-center gap-4 z-50 hover:shadow-lg hover:shadow-red-500/80"
            onClick={handleClear}
            disabled={loading}
          >
            {loading ? "Please Wait..." : "Discard"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upload;
