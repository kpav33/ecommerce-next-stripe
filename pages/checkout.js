import React from "react";
import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import styled from "styled-components";
import axios from "axios";

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1rem;
`;

const Ul = styled.ul`
  padding: 0;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: linear-gradient(to right, #fc00ff, #00dbde);
  font-size: 2rem;
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  padding: 1rem;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

export default function Checkout() {
  const { cart, total } = useCart();
  //   console.log(cart);

  const processPayment = async () => {
    // const url = "/.netlify/functions/charge-card";
    // const { data } = await axios.post(url, { cart });
    console.log("Process payment...");

    // const url = "/.netlify/functions/charge-card";
    // const newCart = cart.map(({ id, qty }) => ({
    //   id,
    //   qty,
    // }));

    // console.log(newCart);
    // const { data } = await axios.post(url, { cart: newCart });
    // console.log("DONE");
    // console.log(data);
  };

  return (
    <Page>
      <h2>Checkout</h2>
      {cart.length > 0 ? (
        <>
          <Ul>
            {cart.map((item) => {
              return (
                <Item key={item.name}>
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>${item.price / 100}</span>
                </Item>
              );
            })}
          </Ul>
          <Total>
            <span>Total</span>
            <span>${total / 100}</span>
          </Total>
          <Button onClick={processPayment}>Process payment</Button>
        </>
      ) : (
        <p>You do not appear to have any items in your cart.</p>
      )}
    </Page>
  );
}
