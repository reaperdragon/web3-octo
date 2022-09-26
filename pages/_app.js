import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BundlrContextProvider from "../context/bundlrContext";
import { ApolloProvider } from "@apollo/client";
import client from "../client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <div>
        <BundlrContextProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BundlrContextProvider>
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
