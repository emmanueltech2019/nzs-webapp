
import FundWalletModal from "@/app/(account)/user/dashboard/wallet/components/FundWalletModal";
import Link from "next/link";
import React, { useState } from "react";

interface MyModalProps {
  isVisible: boolean;
  walletBalance?: number;
  onClose: () => void;
  onPayForVerification: () => void;
}

const MyModal: React.FC<MyModalProps> = ({isVisible,walletBalance,onClose,onPayForVerification}) => {
      const [showModal, setShowModal] = useState(false);
    
  if (!isVisible) return null;

  return (
    <>
      {showModal && <FundWalletModal onClose={() => setShowModal(false)} />}
        {showModal==false ? <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">
          Verification Required 🔒
        </h2>
        <p className="text-gray-600  py-5">
          Your business profile is not yet verified. Please pay the verification
          fee to unlock full features.
        </p>
 <p className="text-green-600 mb-6 py-2 text-lg font-bold">
         6500 NGN
        </p>
        {walletBalance !== undefined ? (
  walletBalance < 6500 ? (
    <p className="text-red-500 mb-6 text-sm">
      Insufficient Wallet Balance. Please top up your wallet to proceed with the verification payment. <br/><div onClick={() => setShowModal(!showModal)} className="underline text-green-600">Deposit</div>
    </p>
  ) : (
    // Optionally render something when walletBalance >= 5000, 
    // or 'null' or ' ' to render nothing.
    null 
  )
) : (
  // Render nothing (or a loading state) when walletBalance is undefined
  null 
)}
        <p className="text-green-500 mb-6">
            Your Wallet Balance: <span className="font-semibold">{walletBalance} NGN</span>
          </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onPayForVerification}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Pay for Verification
          </button>

          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div> : '' }
    
    </>
  );
};

export default MyModal;
