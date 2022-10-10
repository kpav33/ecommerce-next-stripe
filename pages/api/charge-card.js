// In api routes you could use the "import" keyword for importing packages
const fs = require("fs");
const matter = require("gray-matter");
// Immediately call the library and pass it the secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Get products from content folder
const getProducts = () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    // read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    // pull out frontmatter => name
    const { data } = matter(fileContent);

    return data;
  });

  return products;
};

export default async function handler(req, res) {
  // console.log(req.headers.host);
  // console.log(req);

  const { cart } = req.body;
  const products = getProducts();

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://melodic-banoffee-2a26f3.netlify.app";

  // Fetch again the product details on the server side to make sure the users have not tinkered with the data
  const cartWithProducts = cart.map(({ id, qty }) => {
    const product = products.find((p) => p.id === id);
    return {
      ...product,
      qty,
    };
  });
  // console.log(cartWithProducts);

  // talking to Stripe
  const lineItems = cartWithProducts.map((product) => ({
    price_data: {
      // Change to different currency here if needed
      currency: "aud",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price,
    },
    quantity: product.qty,
  }));

  // console.log("URL ", redirectURL);
  // Don't forget to add account name on Stripe dashboard, otherwise this checkout method will fail!
  const session = await stripe.checkout.sessions.create({
    // Configuration object
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${redirectURL}/success`,
    cancel_url: `${redirectURL}/cancelled`,
  });

  // charging the card
  res.status(200).json({ body: { id: session.id } });
}
