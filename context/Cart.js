import { use } from "marked";
import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const Cart = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(isOpen);

  useEffect(() => {
    const initialCart = getInitialCart();
    // console.log("INITIAL ", initialCart);
    // console.log("OK")
    // The length check is temporary, later checking only if (initialCart) {} will be enough
    if (initialCart && initialCart.length > 0) {
      //   console.log("EXECUTE");
      setCart(initialCart);
    }
  }, []);

  useEffect(() => {
    // write to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const addItemToCart = (product, qty = 1) => {
    const item = cart.find((i) => i.id === product.id);

    if (item) {
      // increase qty
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeItemFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
    openCart,
    closeCart,
    isOpen,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default Cart;
