// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import Link from "next/link";

// You can only use the fs library on the server side!
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";

const Container = styled.div`
  /* background: red; */
`;

export default function Home({ products }) {
  // https://www.youtube.com/watch?v=Cn8Y9zmnbDM&list=PLFGFKs8nQ3EbG-ykV8xc1mBt99sqq2Ssx&index=2 => Tutorial playlist
  // https://github.com/dijonmusters/e-commerce-in-25-days => Tutorial repository
  // This tutorial also has a useful short overview of React, Next.js and deploying of an app
  // Also includes a short guide on how to checkout a branch and later merge it into the main app

  return products.map((product) => {
    return (
      <Container key={product.name}>
        <Link href={product.slug}>
          <a>
            <h1>{product.name}</h1>
          </a>
        </Link>
        <p>{product.description}</p>
        <p>${product.price / 100}</p>
      </Container>
    );
  });
}

export async function getStaticProps() {
  // Get the current working directory and go to the content subfolder
  const directory = `${process.cwd()}/content`;

  // Use fs to read the directory and read the files
  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    // Read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    // Pull out frontmatter => name
    const { data } = matter(fileContent);
    // Return name, slug
    const slug = `/products/${filename.replace(".md", "")}`;
    const product = {
      ...data,
      slug,
    };

    return product;
  });

  return {
    props: {
      products,
    },
  };
}
