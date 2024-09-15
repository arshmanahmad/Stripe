import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load Stripe public key
const stripePromise = loadStripe(
  "pk_test_51Pyz3TFFXEMRsbHHdKks2q9NoxKSVkyGVrVQOibxuVYNC2GFZerw2kN3gvDFc6zWW0wk6hYKCh9KwJZMQnSfIjNe00bqxZZ8Br"
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Fetch the client secret from the backend when the component mounts
  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch(
        "http://localhost:8000/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 2000, currency: "usd" }), // Dynamic data can be passed here
        }
      );
      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret); // Set clientSecret in state
      } else {
        setError("Failed to fetch client secret.");
      }
    };
    fetchClientSecret();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement!,
        },
      }
    );

    setProcessing(false);

    if (error) {
      setError(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Payment succeeded");
    }
  };

  return (
    <div>
      {/* If clientSecret exists, show the form */}
      {clientSecret ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe || isProcessing}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </form>
      ) : (
        <div>Loading payment details...</div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

// Wrap the CheckoutForm component with Elements for Stripe
const StripeContainer: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeContainer;
