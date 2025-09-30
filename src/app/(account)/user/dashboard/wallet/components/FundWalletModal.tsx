import { showToast } from "@/utils/alert";
import { address } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import CircleLoader from "@/components/loader/loader";


interface FormData {
  amount: string | number;
}
interface FundWalletModalProps {
  onClose: () => void; // Define the type for the onClose prop
}
type eventType = React.MouseEvent<HTMLInputElement, MouseEvent>

const FundWalletModal: React.FC<FundWalletModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    amount:""
  });
  useEffect(() => {
    // Load Paystack script on the client-side
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => console.log("Paystack script loaded");
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Clean up script
      };
    }
  }, []);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "amount" ? Number(value) || 0 : value, // Ensure amount is always a number
    }));
  };
  
  const handlePay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Number(formData.amount) >= 1000) {
      axios({
        method: "post",
        url: "auth/topup",
        data:{amount: formData.amount},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then((res) => {
          // const { access_code, authorization_url, reference } = res.data.data;
          setLoading(false);
          // Ensure window and PaystackPop are defined
          if (typeof window !== "undefined" && window.PaystackPop) {
            const handler = window.PaystackPop.setup({
              key: "pk_test_ab278e8e5bf14e297cb6f867ad553df75268a89b", // Replace with your Paystack public key
              email: res.data.user.email,
              amount: Math.round(Number(formData.amount) * 100),
              currency: "NGN",
              ref: res.data.data.reference,
              onClose: () => showToast("info", "Payment window closed"),
              callback: (response) => {
                // Verify payment on your backend
                axios({
                  method: "post",
                  url: "auth/verify-topup",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                  },
                  data: { reference: response.reference, amount: Math.round(Number(formData.amount) * 100) },
                })
                  .then((verifyRes) => {
                    if (verifyRes.data.status === "success") {
                      showToast("success", "Payment successful!");
                      window.location.reload()
                    } else {
                      showToast("error", "Payment verification failed!");
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                    showToast("error", "Error verifying payment");
                  });
              },
            });
            handler.openIframe();
          }
        })
        .catch((error) => {
          console.error(error);
          showToast("error", "Error initiating payment");
        });
    } else {
      showToast("info", `You can't fund lower than 1000 Naira`);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <CircleLoader isVisible={loading} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Fund Wallet
        </h2>
        <form onSubmit={handlePay}>
          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            {/* <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="123 Main St"
            /> */}
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount} // This will now be empty initially
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter amount"
            />

          </div>


          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Proceed
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FundWalletModal;
