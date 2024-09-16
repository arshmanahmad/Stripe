import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

app.post("/pay", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "name not found" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1200,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`server is running ${process.env.PORT}`)
);
