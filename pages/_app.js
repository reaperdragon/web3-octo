import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BundlrContextProvider from "../context/bundlrContext";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <BundlrContextProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BundlrContextProvider>
    </div>
  );
}

export default MyApp;
