import React, { useMemo, useRef } from "react";
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

  console.log(blog.cover);

  const newOptions = useMemo(() => {
    return {
      spellChecker: true,
      placeholder: "Pop Out your Whole Idea in Detail here... 🧠",
    };
  }, []);

  return (
    <div className="">
      <input
        id="selectImage"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
        ref={imageCoverRef}
      />

      <div className="max-w-[1440px] mt-2 mb-0 mx-auto md:p-6 flex flex-col items-center justify-center">
        {blog.cover && (
          <img
            src={window.URL.createObjectURL(blog.cover)}
            alt="image"
            ref={blog.cover}
            className="w-[60%] h-[420px] rounded-md md:h-[280px] md:w-[80%] self-center "
          />
        )}
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-8 py-5 text-center mr-2 mb-2 transition-all ease-in-out delay-150 duration-150
            hover:translate-y-1 text-1xl hover:shadow-lg hover:shadow-blue-500/80 mt-2"
          onClick={triggerOnChangeCover}
        >
          Select Cover Image 🖼️
        </button>
      </div>
      <div className="flex flex-col max-w-[1440px] my-0 mx-auto">
        <input
          name="title"
          placeholder="Title Goes Here"
          className="bg-transparent font-body mt-3 py-1 px-2 focus:ring-0 outline-0  text-2xl"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />

        <SimpleMDE
          className="mt-[40px]"
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e })}
          options={newOptions}
        />
      </div>
    </div>
  );
};

export default Upload;
