import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { truncateEthAddress } from "../utils/trucAddress";

const Header = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const [hasScrolled, setHasScrolled] = useState(false);

  const [addr,setAddr] = useState("");

  const changeNavbar = () => {
    if (window.scrollY >= 20) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", changeNavbar);
  });

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  },[])

  return (
    <section className="sticky top-0 z-[99999] w-full px-2 py-2 sm:px-4 transition-all">
      <nav
        className={
          hasScrolled
            ? `px-6 font-body flex items-center justify-between max-w-6xl my-2 mx-auto h-16 md:px-4 md:mx-5 backdrop-blur-sm bg-black/40`
            : `rounded-[64px] px-6 font-body flex items-center justify-between max-w-6xl my-2 mx-auto h-16 md:px-4 md:mx-5`
        }
      >
        <h2>Octo 🐙</h2>
        <ul className="flex gap-3 items-center justify-center">
          <li>
            <Link href="/dashboard">
              <a
                className={
                  currentRoute === "/dashboard"
                    ? "text-white text-base font-medium"
                    : "text-gray-500 font-normal"
                }
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a
                className={
                  currentRoute === "/search"
                    ? "text-white text-base font-medium"
                    : "text-gray-500 font-normal"
                }
              >
                Search
              </a>
            </Link>
          </li>
          <li>
            <Link href="/upload">
              <a
                className={
                  currentRoute === "/upload"
                    ? "text-white text-base font-medium"
                    : "text-gray-500 font-normal"
                }
              >
                Upload
              </a>
            </Link>
          </li>
        </ul>

        <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800">
          {truncateEthAddress(addr)}
        </p>
      </nav>
    </section>
  );
};

export default Header;
