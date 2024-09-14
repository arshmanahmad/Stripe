// src/App.tsx
import React from "react";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 text-white text-center py-4">
          <h1 className="text-2xl font-bold">Secure Payment</h1>
          <p className="text-sm mt-1">Complete your payment with confidence</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">
              Cardholder Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">
              Card Information
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md">
              {/* Stripe CardElement would be placed here */}
              <div className="text-gray-400">Card number, expiry date, CVC</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                Expiry Date
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM / YY"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">CVC</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">
              Billing Address
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street address, P.O. box, company name, c/o"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">
              ZIP / Postal Code
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ZIP / Postal code"
            />
          </div>

          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
            Pay Now
          </button>
        </div>

        <div className="bg-gray-50 text-center py-3">
          <p className="text-xs text-gray-500">
            By completing this purchase, you agree to our{" "}
            <span className="text-blue-500">Terms</span> and{" "}
            <span className="text-blue-500">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
