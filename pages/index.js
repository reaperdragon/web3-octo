import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Dashboard from "./dashboard";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const router = useRouter();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please Install Metamask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsWalletConnected(true);
      localStorage.setItem("walletAddress", accounts[0]);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Octo 🐙</title>
        <link rel="icon" href="/octo.png" />
      </Head>
      {isWalletConnected && localStorage.getItem("walletAddress") ? (
        <Dashboard />
      ) : (
        <div className="h-screen flex items-center  font-body justify-center text-center">
          <div>
            <img
              src="/octo.png"
              alt="logo"
              className="h-[150px] animate-bounce"
            />
            <h2 className="text-[80px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 my-2 leading-[120px] md:leading-normal sm:text-[30px]">
              The Web 3 Publishing Hub{" "}
            </h2>
            <p className="semibold text-gray-500 my-[26px] font-medium text-3xl sm:text-2xl">
              Built with Next Js, Arweave, Hardhat, Polygon Mumbai and All the
              CSS Magic with Tailwind CSS
            </p>
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-8 py-5 text-center mr-2 mb-2 transition-all ease-in-out delay-150 duration-150
            hover:translate-y-1 text-1xl hover:shadow-lg hover:shadow-blue-500/80"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
