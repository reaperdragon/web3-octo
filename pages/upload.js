import React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const Upload = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    cover: "",
  });

  return (
    <div className="">
      <div className="flex flex-col max-w-[1440px] my-0 mx-auto">
        <input
          name="title"
          placeholder="Title Goes Here"
          className=""
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />

        <SimpleMDE
          className="mt-[40px]"
          placeholder="Pop Out your Whole Idea in Detail"
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e })}
        />
      </div>
    </div>
  );
};

export default Upload;
