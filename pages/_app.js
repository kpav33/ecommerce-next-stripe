import Link from "next/link";
import styled from "styled-components";
import { Normalize } from "styled-normalize";

// import "../styles/globals.css";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap");

  background: pink;
  font-family: "Padauk", sans-serif;
`;

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Normalize />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
