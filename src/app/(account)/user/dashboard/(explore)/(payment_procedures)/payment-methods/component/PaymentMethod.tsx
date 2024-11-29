"use client"
import { useState } from 'react';
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PaymentOptions from "../../../../../../../../assets/images/payment-options.png"
import Image from 'next/image';
import Link from 'next/link';
const PaymentComponent = () => {
  const [selectedCard, setSelectedCard] = useState<string>('mastercard');
  const [totalAmount] = useState<number>(88.00);
  const [selectedShipping, setSelectedShipping] = useState("Paystack");

  return (
    <>
          <div className="flex justify-around mb-8 mx-auto xl:ml-20 px-5 ">
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
        <div className="flex flex-col items-center text-gray-400 mr-auto">
          <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">
            4
          </div>
          <p className="text-sm font-bold py-2">Review</p>
        </div>
      </div>
      <div className='px-20'>
        <h2 className="text-lg font-semibold mb-4">Choose a payment method</h2>
        <p className="text-gray-500 text-sm mb-4">
            You won't be charged until you review the order on the next page
        </p>
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
        <span className="text-xl font-bold">₦{totalAmount.toFixed(2)}</span>
      </div>

      {/* Payment Button */}
      {/* <Link href={'./order-review'} > */}
      <button className="w-full bg-[#006838] text-white py-2 rounded-md hover:bg-green-700 transition">
        Proceed to Payment
      </button>
      {/* </Link> */}
    </div>
    </>
  );
};

export default PaymentComponent;
