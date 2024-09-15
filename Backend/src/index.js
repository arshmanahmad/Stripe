import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import bodyParser from "body-parser";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("active");
});

app.post("create-payment-intent", (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = stripe.paymentIntents({
      amount,
      currency,
    });
    res.send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running");
});
