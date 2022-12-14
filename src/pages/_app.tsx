import "styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
