// In api routes you could use the "import" keyword for importing packages
const fs = require("fs");
const matter = require("gray-matter");

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

export default function handler(req, res) {
  //   console.log(req.body);

  const { cart } = req.body;
  const products = getProducts();

  // Fetch again the product details on the server side to make sure the users have not tinkered with the data
  const cartWithProducts = cart.map(({ id, qty }) => {
    const product = products.find((p) => p.id === id);
    return {
      ...product,
      qty,
    };
  });
  console.log(cartWithProducts);
  // talking to Stripe
  // charging the card

  res.status(200).json({ body: "I have charged that card many times!" });
}
