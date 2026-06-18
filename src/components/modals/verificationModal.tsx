
// import FundWalletModal from "@/app/(account)/user/dashboard/wallet/components/FundWalletModal";
// import axios from "@/utils/axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// interface MyModalProps {
//   isVisible: boolean;
//   walletBalance?: number;
//   onClose: () => void;
//   onPayForVerification: () => void;
// }

// const MyModal: React.FC<MyModalProps> = ({isVisible,walletBalance,onClose,onPayForVerification}) => {
//       const [showModal, setShowModal] = useState(false);
    
//   if (!isVisible) return null;

//   // fetch fee from business profile and check if wallet balance is less than fee, if yes show fund wallet modal  
//   useEffect(() => {
//     let activeBusiness = localStorage.getItem("activeBusiness");

//     axios.get(`/business/${activeBusiness}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//     .then((response) => {
//       const businessData = response.data;
//       const verificationFee = businessData?.registrationFee || 9800; // Default to 9800 if not found
//       if (walletBalance !== undefined && walletBalance < verificationFee) {
//         setShowModal(true);
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching business data:", error);
//     });

//   }, [walletBalance]);

//   return (
//     <>
//       {showModal && <FundWalletModal onClose={() => setShowModal(false)} />}
//         {showModal==false ? <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 text-center">
//         <h2 className="text-xl font-semibold mb-4">
//           Verification Required 🔒
//         </h2>
//         <p className="text-gray-600  py-5">
//           Your business profile is not yet verified. Please pay the verification
//           fee to unlock full features.
//         </p>
//  <p className="text-green-600 mb-6 py-2 text-lg font-bold">
//          9800 NGN
//         </p>
//         {walletBalance !== undefined ? (
//   walletBalance < 9800 ? (
//     <p className="text-red-500 mb-6 text-sm">
//       Insufficient Wallet Balance. Please top up your wallet to proceed with the verification payment. <br/><div onClick={() => setShowModal(!showModal)} className="underline text-green-600">Deposit</div>
//     </p>
//   ) : (
//     // Optionally render something when walletBalance >= 5000, 
//     // or 'null' or ' ' to render nothing.
//     null 
//   )
// ) : (
//   // Render nothing (or a loading state) when walletBalance is undefined
//   null 
// )}
//         <p className="text-green-500 mb-6">
//             Your Wallet Balance: <span className="font-semibold">{walletBalance} NGN</span>
//           </p>
//         <div className="flex flex-col sm:flex-row gap-3 justify-center">
//           <button
//             onClick={onPayForVerification}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             Pay for Verification
//           </button>

//           <button
//             onClick={onClose}
//             className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
//           >
//             Maybe Later
//           </button>
//         </div>
//       </div>
//     </div> : '' }
    
//     </>
//   );
// };

// export default MyModal;
import FundWalletModal from "@/app/(account)/user/dashboard/wallet/components/FundWalletModal";
import axios from "@/utils/axios";
import React, { useEffect, useState } from "react";

interface MyModalProps {
  isVisible: boolean;
  walletBalance?: number;
  onClose: () => void;
  onPayForVerification: () => void;
}

const MyModal: React.FC<MyModalProps> = ({
  isVisible,
  walletBalance,
  onClose,
  onPayForVerification,
}) => {
  const [showFundModal, setShowFundModal] = useState(false);
  const [verificationFee, setVerificationFee] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch the fee only when the modal becomes visible
  useEffect(() => {
    if (!isVisible) return;

    const fetchBusinessData = async () => {
      setIsLoading(true);
      try {
        const activeBusiness = localStorage.getItem("activeBusiness");
        if (!activeBusiness) return;

        const response = await axios.get(`/business/${activeBusiness}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        // Depending on your exact GET response structure, adjust mapping if needed
        const fetchedFee = response.data?.registrationFee || response.data?.business?.registrationFee || 9800;
        setVerificationFee(fetchedFee);
      } catch (error) {
        console.error("Error fetching business data:", error);
        setVerificationFee(9800); // Safe fallback in case of API failure
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessData();
  }, [isVisible]);

  // 2. Evaluate balance against the dynamically fetched fee
  useEffect(() => {
    if (!isLoading && verificationFee !== null && walletBalance !== undefined) {
      // if (walletBalance < verificationFee) {
      //   setShowFundModal(true);
      // }
    }
  }, [walletBalance, verificationFee, isLoading]);

  if (!isVisible) return null;

  return (
    <>
      {showFundModal ? (
        <FundWalletModal onClose={() => setShowFundModal(false)} />
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Verification Required 🔒
            </h2>
            <p className="text-gray-600 py-5">
              Your business profile is not yet verified. Please pay the
              verification fee to unlock full features.
            </p>

            {isLoading ? (
              <p className="text-gray-500 mb-6 py-2 text-lg animate-pulse">
                Calculating fee...
              </p>
            ) : (
              <>
                <p className="text-green-600 mb-6 py-2 text-lg font-bold">
                  {verificationFee?.toLocaleString()} NGN
                </p>

                {walletBalance !== undefined && verificationFee !== null && walletBalance < verificationFee && (
                  <p className="text-red-500 mb-6 text-sm">
                    Insufficient Wallet Balance. Please top up your wallet to
                    proceed with the verification payment. <br />
                    <button
                      onClick={() => setShowFundModal(true)}
                      className="underline text-green-600 font-medium mt-1"
                    >
                      Deposit
                    </button>
                  </p>
                )}
              </>
            )}

            <p className="text-green-500 mb-6">
              Your Wallet Balance:{" "}
              <span className="font-semibold">
                {walletBalance !== undefined ? walletBalance.toLocaleString() : "..."} NGN
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onPayForVerification}
                disabled={isLoading || (walletBalance !== undefined && verificationFee !== null && walletBalance < verificationFee)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
      )}
    </>
  );
};

export default MyModal;