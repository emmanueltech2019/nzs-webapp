"use client"
import { useEffect, useState } from 'react';
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PaymentOptions from "../../../../../../../../assets/images/payment-options.png"
import Image from 'next/image';
import Link from 'next/link';
import axios from "@/utils/axios";
import PaystackPop from '@paystack/inline-js'
import { showToast } from '@/utils/alert';
interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
}
const PaymentComponent = () => {
  const [selectedCard, setSelectedCard] = useState<string>('mastercard');
  const [totalAmount] = useState<number>(88.00);
  const [selectedShipping, setSelectedShipping] = useState("Paystack");
  const [total, setTotal] = useState(0)
  const popup = new PaystackPop()
  const [user, setUser] = useState<User | null>(null);

  const handlePay = () =>{
    if (selectedShipping=="Paystack") {
      axios({
        method: "post",
        url: "auth/pay",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then((res) => {
          console.log("pay",res.data);
          // popup.resumeTransaction(res.data.data.access_code)
  
          // setTotal(res.data.total)
          // setCartItems(res.data.cart); 

          const { access_code, authorization_url } = res.data.data;

        const handler = window.PaystackPop.setup({
          key: "pk_test_7e949957b4cd3245c97c27433fef90679cca3479", // Replace with your Paystack public key
          email: res.data.user.email,
          amount: Math.round(res.data.total * 100),
          currency: "NGN",
          ref: res.data.data.reference, // Reference from the backend
          onClose: () => {
            showToast("info", "Payment window closed");
          },
          callback: (response) => {
            // This is where you verify the payment on your backend
            axios({
              method: "post",
              url: "auth/verify-payment",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
              data: { reference: response.reference, amount: Math.round(res.data.total * 100) },
            })
              .then((verifyRes) => {
                if (verifyRes.data.status === "success") {
                  showToast("success", "Payment successful!");
                  window.location.replace("/user/dashboard/transaction")
                  // Handle successful payment (e.g., clear cart, update UI)
                } else {
                  showToast("error", "Payment verification failed!");
                }
              })
              .catch((error) => {
                console.log(error);
                showToast("error", "Error verifying payment");
              });
          },
        });

        handler.openIframe();
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      showToast("info", `${selectedShipping} is not setup yet`)
    }



  }

  useEffect(() => {
    // const userToken = localStorage.getItem("userToken") || "";
    // const tr = JSON.parse(userToken);
    axios({
      method: "GET",
      url: "/users/profile", 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res.data.user); 
        setUser(res.data.user); 
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });

    axios({
      method: "GET",
      url: "cart",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res.data.cart);
        setTotal(res.data.total)
        // setCartItems(res.data.cart); 
      })
      .catch((error) => {
        console.log(error);
      });
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.onload = () => {
          console.log('Paystack script loaded');
        };
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script); // Clean up script
        };
      
  }, []); 
  return (
    <>
          <div className="flex justify-around mb-8 mx-auto xl:mx-20 px-5 ml-14 ">
        <div className="flex flex-col items-center text-center justify-center mr-auto">
          <div className="w-8 h-8 rounded-full text-[#006838] bg-[#C4EDDA] flex items-center justify-center">
            <CheckOutlinedIcon />
          </div>
          <p className="text-sm font-bold py-2">Your bag</p>
        </div>
        <div className="flex flex-col items-center justify-center mr-auto">
        <div className="w-8 h-8 rounded-full text-[#006838] bg-[#C4EDDA] flex items-center justify-center">
            <CheckOutlinedIcon />
          </div>
          <p className="text-sm font-bold py-2">Shipping</p>
        </div>
        <div className="flex flex-col items-center justify-center mr-auto">
          <div className="w-8 h-8 rounded-full bg-[#006838] flex items-center justify-center text-white">
            3
          </div>
          <p className="text-sm font-bold py-2">Payment</p>
        </div>
        {/* <div className="flex flex-col items-center text-gray-400 mr-auto">
          <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">
            4
          </div>
          <p className="text-sm font-bold py-2">Review</p>
        </div> */}
      </div>
      <div className='px-20'>
        <h2 className="text-lg font-semibold mb-4">Choose a payment method</h2>
        {/* <p className="text-gray-500 text-sm mb-4">
            You won't be charged until you review the order on the next page
        </p> */}
      </div>
    <div className="mx-auto mx-20 py-8 px-5 border rounded-lg mb-20 md:mb-0">
      
      {/* Credit Card Section */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <input 
            type="radio" 
            id="credit-card" 
            name="payment-method" 
            defaultChecked 
            className="mr-2" 
          />
          <label htmlFor="credit-card" className="font-medium">Payment Option</label>
        </div>
        <div className="mb-4 md:w-[20vw]">
        <div
          className={`p-4 md:w-[20vw] mb-2 rounded-lg border ${
            selectedShipping === "Paystack"
              ? "border bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedShipping("Paystack")}
        >
          <div className="flex justify-between items-center">
            <p>Paystack</p>
            <p>{selectedShipping === "Paystack"?<div className="w-8 h-8 rounded-full text-[#006838] pt-5 flex items-center justify-center">
            <CheckOutlinedIcon />
          </div>:''}</p>
          </div>
          <p className="text-gray-500 text-sm">Card, Transfer, Bank</p>
        </div>
        <div
          className={`p-4 md:w-[20vw] mb-2 rounded-lg border ${
            selectedShipping === "Flutterwave"
              ? "border bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedShipping("Flutterwave")}
        >
          <div className="flex justify-between items-center">
            <p>Flutterwave</p>
            <p>{selectedShipping === "Flutterwave"?<div className="w-8 h-8 rounded-full text-[#006838] pt-5 flex items-center justify-center">
            <CheckOutlinedIcon />
          </div>:''}</p>
          </div>
          <p className="text-gray-500 text-sm">Card, Transfer, Bank</p>
        </div>
        <div
          className={`p-4 md:w-[20vw] mb-2 rounded-lg border ${
            selectedShipping === "Paypal"
              ? "border bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedShipping("Paypal")}
        >
          <div className="flex justify-between items-center">
            <p>Paypal</p>
            <p>{selectedShipping === "Paypal"?<div className="w-8 h-8 rounded-full text-[#006838] pt-5 flex items-center justify-center">
            <CheckOutlinedIcon />
          </div>:''}</p>
          </div>
          <p className="text-gray-500 text-sm">Card, Transfer, Bank</p>
        </div>
        <div
          className={`p-4 mb-4 md:w-[20vw] rounded-lg border ${
            selectedShipping === "Visa"
              ? "border bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedShipping("Visa")}
        >
          <div className="flex justify-between items-center">
            <p>Accoutnt Balance</p>
            <p>{selectedShipping === "Visa"?<div className="w-8 h-8 rounded-full text-[#006838] pt-5 flex items-center justify-center">
            <CheckOutlinedIcon />
          </div>:''}</p>
          </div>
          <p className="text-gray-500 text-sm">₦ 0.00</p>
        </div>
        <div className="flex flex-col justify-center space-y-6 items-center">
        <Image src={PaymentOptions} alt=''/>
          {/* <button className="text-[#006838] mt-4 ">
            + Add new card
          </button> */}
        </div>
      </div>
        {/* <div className="pl-6">
          <div 
            className={`border rounded p-4 mb-2 cursor-pointer ${selectedCard === 'mastercard' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setSelectedCard('mastercard')}
          >
            <div className="flex justify-between items-center">
              <span>Mastercard</span>
              <span>**** **** **** 1234</span>
            </div>
          </div>

          <div 
            className={`border rounded p-4 cursor-pointer ${selectedCard === 'visa' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setSelectedCard('visa')}
          >
            <div className="flex justify-between items-center">
              <span>Visa</span>
              <span>**** **** **** 9876</span>
            </div>
          </div>

          <div className="mt-4">
            <button className="text-blue-600">+ Add new card</button>
          </div>
        </div> */}
      </div>

      {/* Other Payment Options */}
      {/* <div className="mb-6">
        <div className="flex items-center mb-2">
          <input 
            type="radio" 
            id="apple-pay" 
            name="payment-method" 
            className="mr-2" 
          />
          <label htmlFor="apple-pay" className="font-medium">Apple Pay</label>
        </div>
      </div> */}

      {/* Total Section */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold">₦{total.toFixed(2)}</span>
      </div>

      {/* Payment Button */}
      {/* <Link href={'./order-review'} > */}
      <button onClick={handlePay} className="w-full bg-[#006838] text-white py-2 rounded-md hover:bg-green-700 transition">
        Proceed to Payment
      </button>
      {/* </Link> */}
    </div>
    </>
  );
};

export default PaymentComponent;
