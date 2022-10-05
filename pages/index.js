// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import Link from "next/link";
// You can only use the fs library on the server side!
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  min-height: 200px;
  position: relative;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Price = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  font-size: 2.5rem;
`;

const renderProduct = (product, addItemToCart) => {
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product);
  };

  // console.log(product);

  return (
    <Link key={product.id} href={product.slug}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <button onClick={handleClick}>Add to cart</button>
          <Price>${product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

export default function Home({ products }) {
  // https://www.youtube.com/watch?v=Cn8Y9zmnbDM&list=PLFGFKs8nQ3EbG-ykV8xc1mBt99sqq2Ssx&index=2 => Tutorial playlist
  // https://github.com/dijonmusters/e-commerce-in-25-days => Tutorial repository
  // This tutorial also has a useful short overview of React, Next.js and deploying of an app
  // Also includes a short guide on how to checkout a branch and later merge it into the main app

  const { cart, addItemToCart } = useCart();
  console.log(cart);

  return (
    <ProductsContainer>
      {products.map((product) => renderProduct(product, addItemToCart))}
    </ProductsContainer>
  );
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
