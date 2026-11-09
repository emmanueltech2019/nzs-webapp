// import TransactionDetails from "../components/TransactionDetails";
// interface TransactionDetailsProps {
//   order: {
//     id: number;
//     total: number;
//   };
//   role: "buyer" | "seller"; // Using a union type for better safety
// }
// export default function Page() {
//   const mockOrder = { id: 1, total: 100 }; // Example data
//   return <TransactionDetails order={mockOrder} role="buyer" />;
// }
// "use client";

// import TransactionDetails from "../components/TransactionDetails";

// export default function Page() {
//   return <TransactionDetails  />;
// }

import { Suspense } from "react";
import TransactionDetails from "../components/TransactionDetails";

function TransactionDetailsFallback() {
  return (
    <main className="min-h-screen bg-[#f7f9f8] px-4 py-8 md:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-5 overflow-hidden rounded-3xl bg-white p-6 shadow-sm">
          <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />

          <div className="mt-6 space-y-4">
            <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />

            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<TransactionDetailsFallback />}>
      <TransactionDetails />
    </Suspense>
  );
}
