import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { truncateEthAddress } from "../utils/trucAddress";

const url = `http://arweave.net/`;

const BlogContainer = ({ data }) => {
  const router = useRouter();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  console.log(data)

  return (
    <div
      key={data.id}
      className="w-full h-[418px] p-3 border-2 border-solid border-sky-500/20  sm:border-0 rounded-xl hover:bg-[#1E364A] sm:bg-[#1E364A] cursor-pointer hover:border-0"
      onClick={() => router.push(`blog/${data.id}`)}
    >
      <div className="w-full h-[300px] rounded-lg relative">
        <img
          src={ data?.blogcoverhash.includes(url) ? data?.blogcoverhash : url + data.blogcoverhash}
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
        {data?.blogtitle?.length > 20
          ? data?.blogtitle?.slice(0, 20) + "..."
          : data?.blogtitle}
      </h3>
      <p className="">
        Owner:{" "}
        <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800">
          {truncateEthAddress(addr)}
        </span>
      </p>
    </div>
  );
};

export default BlogContainer;
