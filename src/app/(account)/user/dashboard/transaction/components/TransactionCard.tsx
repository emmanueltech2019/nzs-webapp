// import React from 'react';
// import placeholder from '@/assets/images/productMockup.png'
// import Image from 'next/image';
// import { Icon } from '@iconify/react/dist/iconify.js';
// import Link from 'next/link';

// type TransactionCardProps = {
//   title: string;
//   location: string;
//   timeAgo: string;
//   yesterday?: boolean;
//   deleteFunc: () => void;
//   _id: string;
// };

// const TransactionCard: React.FC<TransactionCardProps> = ({ title, location, timeAgo, yesterday, deleteFunc, _id }) => {
//   return (
//     <Link href={`/user/dashboard/transaction/details?id=${_id}`} className="block">
//       {/* {yesterday && (
//         <div className="mt-4 mb-2 text-gray-500 font-semibold">Yesterday</div>
//       )} */}
//       <div className={`flex items-center justify-between bg-white shadow rounded-2xl mb-4 overflow-hidden`}>
//         <div className="flex items-center space-x-4">
//           <div className="bg-gray-200 min-h-full w-20 self-stretch">
//             <Image src={placeholder} alt="Placeholder" className="h-full w-full object-cover" />
//           </div>
//           <div className='py-4'>
//             <div className="text-lg font-extrabold">{title}</div>
//             <div className='flex space-x-2'>
//               <div className="text-sm text-gray-500">{location}</div>
//               <div className="text-sm text-gray-400 italic font-semibold tracking-wide">{timeAgo}</div>

//             </div>
//           </div>
//         </div>
//         <div className='flex'>
//           <button className="text-gray-500 hover:text-gray-700 focus:outline-none flex space-x-3 pr-4">
//             <Icon icon="ep:arrow-right-bold" className='text-[#8F9098] text-base' />
//           </button>
//           <button className="text-gray-500 hover:text-gray-700 focus:outline-none flex space-x-3 pr-4" onClick={deleteFunc}>
//             <span className='flex items-center justify-center w-6 h-6 rounded-full bg-[#D4D6DD] '>
//               <Icon icon="mingcute:close-fill" className='text-[12px] text-white' />
//             </span>
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default TransactionCard;
"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import placeholder from "@/assets/images/productMockup.png";

type TransactionCardProps = {
  title: string;
  location: string;
  timeAgo: string;
  totalAmount?: number | string;
  status: string;
  _id: string;
  onRemove: (id: string) => void;
};

const formatCurrency = (amount: unknown) => {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return null;
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
};

const getStatusConfig = (status: string) => {
  const normalized = status
    .toLowerCase()
    .trim();

  if (
    ["completed", "successful", "success", "succeeded"].includes(
      normalized
    )
  ) {
    return {
      label: "Completed",
      className:
        "bg-emerald-50 text-emerald-700 ring-emerald-100",
      icon: <CheckCircleRoundedIcon sx={{ fontSize: 14 }} />,
    };
  }

  if (
    ["pending", "processing", "in_progress"].includes(
      normalized
    )
  ) {
    return {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-700 ring-amber-100",
      icon: <PendingRoundedIcon sx={{ fontSize: 14 }} />,
    };
  }

  return {
    label: "Failed",
    className:
      "bg-red-50 text-red-700 ring-red-100",
    icon: <CancelRoundedIcon sx={{ fontSize: 14 }} />,
  };
};

const TransactionCard: React.FC<
  TransactionCardProps
> = ({
  title,
  location,
  timeAgo,
  totalAmount,
  status,
  _id,
  onRemove,
}) => {
  const statusConfig =
    getStatusConfig(status);

  const amount = formatCurrency(
    totalAmount
  );

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#006838]/20 hover:shadow-md">
      <Link
        href={`/user/dashboard/transaction/details?id=${encodeURIComponent(
          _id
        )}`}
        className="flex min-h-[100px] items-center gap-4 p-3 sm:p-4"
      >
        {/* Image */}

        <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={placeholder}
            alt="Transaction"
            fill
            sizes="76px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Main content */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-sm font-bold capitalize text-gray-900 sm:text-base">
              {title || "Transaction"}
            </h2>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ${statusConfig.className}`}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          </div>

          <div className="mt-2 flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Icon
                icon="mdi:identifier"
                className="shrink-0 text-gray-400"
              />

              <span className="truncate">
                {location}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Icon
                icon="mdi:calendar-outline"
                className="shrink-0"
              />

              <span>{timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Amount */}

        <div className="hidden shrink-0 text-right sm:block">
          {amount && (
            <p className="text-sm font-black text-gray-900">
              {amount}
            </p>
          )}

          <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#006838]">
            View
            <ArrowForwardRoundedIcon
              sx={{ fontSize: 14 }}
            />
          </span>
        </div>

        {/* Mobile arrow */}

        <ArrowForwardRoundedIcon
          sx={{ fontSize: 19 }}
          className="shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#006838] sm:hidden"
        />
      </Link>

      {/* Remove/hide button
          This intentionally does not pretend to delete from the backend.
          It removes the transaction from this current view. */}

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          onRemove(_id);
        }}
        aria-label="Remove transaction from this view"
        title="Remove from this view"
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-300 opacity-100 shadow-sm ring-1 ring-gray-100 transition hover:bg-red-50 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Icon
          icon="mdi:close"
          className="text-sm"
        />
      </button>
    </article>
  );
};

export default TransactionCard;