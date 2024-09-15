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
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": {
        color: "#aab7c4",
      },
      padding: "10px", // Ensure padding aligns with your Tailwind spacing
      border: "1px solid #e5e7eb", // Tailwind's border color
      borderRadius: "0.375rem", // Tailwind's rounded-md
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
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
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-lg">
      {clientSecret ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-2 border border-gray-300 rounded-md">
            <CardElement options={cardElementOptions} />
          </div>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`w-full py-2 px-4 border rounded-md ${
              isProcessing ? "bg-gray-400" : "bg-blue-500"
            } text-white font-semibold`}
          >
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </form>
      ) : (
        <div>Loading payment details...</div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

const StripeContainer: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeContainer;
