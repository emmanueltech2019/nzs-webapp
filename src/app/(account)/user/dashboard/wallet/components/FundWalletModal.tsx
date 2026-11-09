// import { showToast } from "@/utils/alert";
// import { address } from "framer-motion/client";
// import React, { useEffect, useState } from "react";
// import axios from "@/utils/axios";
// import CircleLoader from "@/components/loader/loader";


// interface FormData {
//   amount: string | number;
// }
// interface FundWalletModalProps {
//   onClose: () => void; // Define the type for the onClose prop
// }
// type eventType = React.MouseEvent<HTMLInputElement, MouseEvent>

// const FundWalletModal: React.FC<FundWalletModalProps> = ({ onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     amount:""
//   });
//   useEffect(() => {
//     // Load Paystack script on the client-side
//     if (typeof window !== "undefined") {
//       const script = document.createElement("script");
//       script.src = "https://js.paystack.co/v1/inline.js";
//       script.async = true;
//       script.onload = () => console.log("Paystack script loaded");
//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script); // Clean up script
//       };
//     }
//   }, []);

  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
    
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === "amount" ? Number(value) || 0 : value, // Ensure amount is always a number
//     }));
//   };
  
//   const handlePay = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (Number(formData.amount) >= 1000) {
//       axios({
//         method: "post",
//         url: "auth/topup",
//         data:{amount: formData.amount},
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//         },
//       })
//         .then((res) => {
//           // const { access_code, authorization_url, reference } = res.data.data;
//           setLoading(false);
//           // Ensure window and PaystackPop are defined
//           if (typeof window !== "undefined" && window.PaystackPop) {
//             const handler = window.PaystackPop.setup({
//               key: "pk_live_9bf26ea7f2189fc4f65b275add8e00fa26baa946", // Replace with your Paystack public key
//               email: res.data.user.email,
//               amount: Math.round(Number(formData.amount) * 100),
//               currency: "NGN",
//               ref: res.data.data.reference,
//               onClose: () => showToast("info", "Payment window closed"),
//               callback: (response) => {
//                 // Verify payment on your backend
//                 axios({
//                   method: "post",
//                   url: "auth/verify-topup",
//                   headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                   },
//                   data: { reference: response.reference, amount: Math.round(Number(formData.amount) * 100) },
//                 })
//                   .then((verifyRes) => {
//                     if (verifyRes.data.status === "success") {
//                       showToast("success", "Payment successful!");
//                       window.location.reload()
//                     } else {
//                       showToast("error", "Payment verification failed!");
//                     }
//                   })
//                   .catch((error) => {
//                     console.error(error);
//                     showToast("error", "Error verifying payment");
//                   });
//               },
//             });
//             handler.openIframe();
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//           showToast("error", "Error initiating payment");
//         });
//     } else {
//       showToast("info", `You can't fund lower than 1000 Naira`);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <CircleLoader isVisible={loading} />
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
//         <h2 className="text-lg font-bold mb-4 text-gray-800">
//           Fund Wallet
//         </h2>
//         <form onSubmit={handlePay}>
//           <div className="mb-4">
//             <label
//               htmlFor="street"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Amount
//             </label>
//             {/* <input
//               type="number"
//               id="amount"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               placeholder="123 Main St"
//             /> */}
//             <input
//               type="number"
//               id="amount"
//               name="amount"
//               value={formData.amount} // This will now be empty initially
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               placeholder="Enter amount"
//             />

//           </div>


//           <div className="flex justify-around">
           
//             <button
//               type="button"
//               onClick={onClose}
//               className="ml-2 mr-4 px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//             >
//               Cancel
//             </button>
//              <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             >
//               Proceed
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FundWalletModal;
"use client";

import React, {
  FormEvent,
  useEffect,
  useState,
} from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import axios from "@/utils/axios";
import CircleLoader from "@/components/loader/loader";
import { showToast } from "@/utils/alert";

interface FormData {
  amount: string | number;
}
declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        onClose: () => void;
        callback: (response: {
          reference: string;
          status?: string;
        }) => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

interface FundWalletModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  email?: string;
}

const MINIMUM_AMOUNT = 1000;

const quickAmounts = [
  1000,
  5000,
  10000,
  20000,
  50000,
];

const FundWalletModal: React.FC<
  FundWalletModalProps
> = ({
  onClose,
  onSuccess,
  email,
}) => {
  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [scriptReady, setScriptReady] =
    useState(
      typeof window !== "undefined" &&
        Boolean(window.PaystackPop)
    );

  /* ---------------------------------------------------------------------- */
  /*                         PAYSTACK SCRIPT                                */
  /* ---------------------------------------------------------------------- */

  // useEffect(() => {
  //   if (
  //     typeof window === "undefined"
  //   ) {
  //     return;
  //   }

  //   if (window.PaystackPop) {
  //     setScriptReady(true);
  //     return;
  //   }

  //   const existingScript =
  //     document.querySelector(
  //       'script[data-paystack="true"]'
  //     );

  //   if (existingScript) {
  //     const handleLoad = () => {
  //       setScriptReady(
  //         Boolean(window.PaystackPop)
  //       );
  //     };

  //     existingScript.addEventListener(
  //       "load",
  //       handleLoad
  //     );

  //     return () => {
  //       existingScript.removeEventListener(
  //         "load",
  //         handleLoad
  //       );
  //     };
  //   }

  //   const script =
  //     document.createElement("script");

  //   script.src =
  //     "https://js.paystack.co/v1/inline.js";

  //   script.async = true;
  //   script.dataset.paystack = "true";

  //   script.onload = () => {
  //     setScriptReady(
  //       Boolean(window.PaystackPop)
  //     );
  //   };

  //   script.onerror = () => {
  //     setScriptReady(false);

  //     showToast(
  //       "error",
  //       "Unable to load payment service."
  //     );
  //   };

  //   document.body.appendChild(script);
  // }, []);

  /* ---------------------------------------------------------------------- */
  /*                              HELPERS                                   */
  /* ---------------------------------------------------------------------- */

  const numericAmount =
    Number(amount) || 0;

  const isValidAmount =
    numericAmount >= MINIMUM_AMOUNT;

  /* ---------------------------------------------------------------------- */
  /*                              PAYMENT                                   */
  /* ---------------------------------------------------------------------- */

//   const handlePay = async (
//     event: FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     if (!isValidAmount) {
//       showToast(
//         "info",
//         `Minimum wallet funding is ₦${MINIMUM_AMOUNT.toLocaleString()}.`
//       );
//       return;
//     }

//     if (!scriptReady || !window.PaystackPop) {
//       showToast(
//         "error",
//         "Payment service is still loading. Please wait a moment."
//       );
//       return;
//     }

//     const token =
//       localStorage.getItem("userToken");

//     if (!token) {
//       showToast(
//         "error",
//         "Your session has expired. Please sign in again."
//       );
//       return;
//     }

//     if (!email) {
//       showToast(
//         "error",
//         "Your account email is unavailable."
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const initializeResponse =
//         await axios.post(
//           "auth/topup",
//           {
//             amount: numericAmount,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//       const reference =
//         initializeResponse?.data?.data
//           ?.reference;

//       const paymentEmail =
//         initializeResponse?.data?.user
//           ?.email || email;

//       if (!reference) {
//         throw new Error(
//           "Payment reference was not returned."
//         );
//       }
// // alert("Payment reference: " + reference);
// // console.log("Payment reference: " + reference);
// // console.log("Payment email: " + process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
// //       const publicKey ="pk_live_9bf26ea7f2189fc4f65b275add8e00fa26baa946"
// const publicKey =
//   process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY?.trim();

// if (!publicKey) {
//   throw new Error(
//     "NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is missing."
//   );
// }

// console.log(
//   "Paystack public key prefix:",
//   publicKey.slice(0, 8)
// );
//       if (!publicKey) {
//         throw new Error(
//           "Paystack public key is not configured."
//         );
//       }

//       setLoading(false);

//       const handler =
//         window.PaystackPop.setup({
//           key: publicKey,

//           email: paymentEmail,

//           /*
//            * Paystack expects the amount in kobo.
//            */
//           amount:
//             Math.round(
//               numericAmount * 100
//             ),

//           currency: "NGN",

//           ref: reference,

//           onClose: () => {
//             showToast(
//               "info",
//               "Payment window closed."
//             );
//           },

//           callback: async (
//             paymentResponse
//           ) => {
//             try {
//               setLoading(true);

//               const verificationResponse =
//                 await axios.post(
//                   "auth/verify-topup",
//                   {
//                     reference:
//                       paymentResponse.reference,

//                     amount:
//                       Math.round(
//                         numericAmount *
//                           100
//                       ),
//                   },
//                   {
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                     },
//                   }
//                 );

//               const verified =
//                 verificationResponse?.data
//                   ?.status === "success" ||
//                 verificationResponse?.data
//                   ?.success === true;

//               if (!verified) {
//                 throw new Error(
//                   "Payment verification failed."
//                 );
//               }

//               showToast(
//                 "success",
//                 "Wallet funded successfully."
//               );

//               onSuccess?.();
//             } catch (error: any) {
//               console.error(
//                 "Payment verification error:",
//                 error
//               );

//               showToast(
//                 "error",
//                 error?.response?.data
//                   ?.message ||
//                   "We could not verify the payment."
//               );
//             } finally {
//               setLoading(false);
//             }
//           },
//         });

//       handler.openIframe();
//     } catch (error: any) {
//       console.error(
//         "Wallet funding error:",
//         error
//       );

//       setLoading(false);

//       showToast(
//         "error",
//         error?.response?.data?.message ||
//           error?.message ||
//           "Unable to initialize payment."
//       );
//     }
//   };
    
// const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState<FormData>({
  //   amount:""
  // });
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
  //     [name]: name === "amount" ? Number(value) || 0 : value, // Ensure amount is always a number
  //   }));
  // };
  
  const handlePay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Number(amount) >= 1000) {
      axios({
        method: "post",
        url: "auth/topup",
        data:{amount: amount},
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
              key: "pk_live_9bf26ea7f2189fc4f65b275add8e00fa26baa946", // Replace with your Paystack public key
              email: res.data.user.email,
              amount: Math.round(Number(amount) * 100),
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
                  data: { reference: response.reference, amount: Math.round(Number(amount) * 100) },
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


  /* ---------------------------------------------------------------------- */
  /*                                  UI                                    */
  /* ---------------------------------------------------------------------- */

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fund-wallet-title"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl">
        {/* Header */}

        <div className="bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] p-6 text-white">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close funding modal"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-50"
          >
            <CloseRoundedIcon
              sx={{ fontSize: 19 }}
            />
          </button>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <PaymentsRoundedIcon
              sx={{ fontSize: 24 }}
            />
          </div>

          <h2
            id="fund-wallet-title"
            className="mt-5 text-2xl font-black"
          >
            Fund your wallet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-white/65">
            Add money securely using Paystack and
            continue shopping without leaving the
            wallet.
          </p>
        </div>

        {/* Body */}

        <form
          onSubmit={handlePay}
          className="p-5 sm:p-6"
        >
          <label
            htmlFor="wallet-amount"
            className="text-sm font-bold text-gray-800"
          >
            Amount
          </label>

          <div className="relative mt-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">
              ₦
            </span>

            <input
              id="wallet-amount"
              type="number"
              min={MINIMUM_AMOUNT}
              step="100"
              inputMode="numeric"
              value={amount}
              onChange={(event) =>
                setAmount(
                  event.target.value
                )
              }
              placeholder="Enter amount"
              disabled={loading}
              className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-lg font-bold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#006838] focus:bg-white focus:ring-4 focus:ring-[#006838]/5 disabled:opacity-60"
            />
          </div>

          <p className="mt-2 text-xs text-gray-400">
            Minimum funding amount: ₦
            {MINIMUM_AMOUNT.toLocaleString()}
          </p>

          {/* Quick amounts */}

          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-500">
              Quick select
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {quickAmounts.map(
                (quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() =>
                      setAmount(
                        String(
                          quickAmount
                        )
                      )
                    }
                    disabled={loading}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      Number(amount) ===
                      quickAmount
                        ? "border-[#006838] bg-[#006838]/5 text-[#006838]"
                        : "border-gray-200 bg-white text-gray-600 hover:border-[#006838]/30 hover:text-[#006838]"
                    }`}
                  >
                    ₦
                    {quickAmount.toLocaleString()}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Summary */}

          {numericAmount > 0 && (
            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  You will add
                </span>

                <span className="text-lg font-black text-gray-900">
                  ₦
                  {numericAmount.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-12 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !isValidAmount
              }
              className="relative flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#006838] text-sm font-bold text-white transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 18 }}
                  />
                  Proceed to payment
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading overlay */}

        {loading && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
            <CircleLoader isVisible />
          </div>
        )}
      </div>
    </div>
  );
};

export default FundWalletModal;