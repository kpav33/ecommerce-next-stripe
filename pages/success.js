import React, { useEffect } from "react";
import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page>
      <h2>Payment successful</h2>
      <p>Thank you for your purchase!</p>
    </Page>
  );
}
