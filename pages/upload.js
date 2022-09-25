import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "easymde/dist/easymde.min.css";
import { ArrowCircleUp2 } from "iconsax-react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const Upload = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    cover: "",
  });

  const [loading, setLoading] = useState(false);
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

  const handleClear = () => {
    setBlog({
      title: "",
      content: "",
      cover: "",
    });
  };

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
        {blog.cover ? (
          <img
            src={window.URL.createObjectURL(blog.cover)}
            alt="image"
            ref={imageCoverRef}
            className="w-[60%] h-[420px] rounded-md md:h-[280px] md:w-[80%] self-center"
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

        <div className="flex max-w-[1440px] my-0 sm:my-14 mx-auto gap-2 px-5 py-3 ">
          <button
            className="sm:fixed inset-x-0 md:bottom-20 font-body  h-16 w-[200px] left-0 right-0 md:mx-auto  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2  text-center  mb-4 transition-all ease-in-out delay-150 duration-150
            hover:-translate-y-1 text-1xl flex items-center justify-center gap-4 z-50 hover:shadow-lg hover:shadow-blue-500/80"
            disabled={loading}
          >
            {loading ? (
              "Publishing..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                Upload <ArrowCircleUp2 size="26" color="#d9e3f0" />
              </span>
            )}
          </button>
          <button
            className="sm:fixed inset-x-0 bottom-0 font-body  h-16 w-[200px] left-0 right-0 md:mx-auto  text-white bg-gradient-to-r bg-red-700 hover:bg-gradient-to-br border-spacing-1 focus:ring-4 focus:outline-none 
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
    </div>
  );
};

export default Upload;
