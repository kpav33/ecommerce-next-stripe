// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res
    .status(200)
    // .json({ name: `public key: ${process.env.STRIPE_PUBLIC_KEY}` });
    .json({ name: "Hello world!" });
}
