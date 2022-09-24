import React, { useRef } from "react";
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

  const imageCoverRef = useRef();

  const triggerOnChangeCover = () => {
    imageCoverRef.current.click();
  };


  const handleFileChange = (e) => {
    const uploadFile = e.target.files[0];
    if (!uploadFile) return;
    setBlog({ ...blog, cover: uploadFile });
  };

  console.log(blog.cover)

  return (
    <div className="">
      <input
        id="selectImage"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
        ref={imageCoverRef}
      />

      <div className="max-w-[1440px] mt-2 mb-0 mx-auto">
        {blog.cover && (
          <img
            src={window.URL.createObjectURL(blog.cover)}
            alt="image"
            ref={blog.cover}
            className="w-full h-[420px] rounded-md "
          />
        )}
        <button onClick={triggerOnChangeCover}>Select Cover Image</button>
      </div>
      <div className="flex flex-col max-w-[1440px] my-0 mx-auto">
        <input
          name="title"
          placeholder="Title Goes Here"
          className="bg-transparent font-body mt-3 p-1"
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
