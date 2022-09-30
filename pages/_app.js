import Link from "next/link";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
