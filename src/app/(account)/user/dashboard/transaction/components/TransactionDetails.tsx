
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Icon } from "@iconify/react";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import TagHeader from "@/components/header/TagHeader";
import axios from "@/utils/axios";

import placeholder from "@/assets/images/productMockup.png";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type UserRole = "buyer" | "seller";

interface ShippingAddress {
  recipientName?: string;
  recipientPhone?: string;
  recipientEmail?: string;
  address?: string;
  city?: string;
  state?: string;
  townID?: number;
}

interface Logistics {
  waybillNumber?: string;
  status?: string;
  deliveryFee?: number;
  vatAmount?: number;
  isPickup?: boolean;
}

interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  town?: string;
  townId?: string | number;
  cityName?: string;
}

interface OrderUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  addresses?: UserAddress;
  accountType?: "buyer" | "seller";
}

interface Business {
  _id?: string;
  businessName?: string;

  addresses?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    town?: string;
    country?: string;
  };

  paymentInfo?: {
    accountName?: string;
    accountNumber?: string;
    accountType?: string;
    bankName?: string;
  };
}

interface Vendor {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
}

interface Product {
  _id?: string;
  name?: string;
  price?: number;
  images?: string[];
}

interface OrderItem {
  _id?: string;
  productId?: Product;
  quantity?: number;
  price?: number;
  weight?: number;
}

interface Order {
  _id: string;

  shippingAddress?: ShippingAddress;
  logistics?: Logistics;

  /*
   * IMPORTANT:
   * The user's role MUST come from this object.
   */
  userId?: OrderUser;

  businessId?: Business;
  vendorId?: Vendor;

  orderReference?: string;

  items?: OrderItem[];

  subTotal?: number;
  shippingTotal?: number;
  grandTotal?: number;

  status?: string;
  paymentReference?: string;
  paymentStatus?: string;
  vendorSettlementStatus?: string;

  createdAt?: string;
  updatedAt?: string;
}

/* -------------------------------------------------------------------------- */
/*                              HELPERS                                       */
/* -------------------------------------------------------------------------- */

const formatCurrency = (value: unknown) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "₦0.00";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (date?: string) => {
  if (!date) return "Date unavailable";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
};

const formatTime = (date?: string) => {
  if (!date) return "--:--";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "--:--";
  }

  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
};

const normalizeStatus = (value?: string) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, "_");

const getStatusConfig = (status?: string) => {
  const normalized = normalizeStatus(status);

  if (
    ["completed", "successful", "success", "succeeded"].includes(
      normalized
    )
  ) {
    return {
      label: "Completed",
      className:
        "bg-emerald-50 text-emerald-700 ring-emerald-100",
      icon: (
        <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />
      ),
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
      icon: (
        <AccessTimeRoundedIcon sx={{ fontSize: 15 }} />
      ),
    };
  }

  if (
    ["failed", "cancelled", "canceled", "rejected"].includes(
      normalized
    )
  ) {
    return {
      label: "Failed",
      className: "bg-red-50 text-red-700 ring-red-100",
      icon: (
        <Icon
          icon="mdi:close-circle-outline"
          className="text-[15px]"
        />
      ),
    };
  }

  return {
    label: status || "Unknown",
    className:
      "bg-gray-100 text-gray-700 ring-gray-200",
    icon: (
      <Icon
        icon="mdi:information-outline"
        className="text-[15px]"
      />
    ),
  };
};

const getPersonName = (
  person?: OrderUser | Vendor
) => {
  if (!person) return "Not available";

  const first =
    "firstname" in person
      ? person.firstname || ""
      : "";

  const last =
    "lastname" in person
      ? person.lastname || ""
      : "";

  const fullName = `${first} ${last}`.trim();

  return fullName || "Not available";
};

const getProductImage = (
  item: OrderItem
) => {
  return item.productId?.images?.[0] || placeholder;
};

const isValidValue = (
  value?: string
) => {
  if (!value) return false;

  return (
    value.trim() !== "" &&
    value.trim().toLowerCase() !== "n/a"
  );
};

const getShippingAddress = (
  address?: ShippingAddress
) => {
  if (!address) return [];

  return [
    address.address,
    address.city,
    address.state,
  ].filter(isValidValue);
};

const getCustomerAddress = (
  address?: UserAddress
) => {
  if (!address) return [];

  return [
    address.street,
    address.town,
    address.cityName || address.city,
    address.state,
    address.zip,
  ].filter(isValidValue);
};

const maskAccountNumber = (
  accountNumber?: string
) => {
  if (!accountNumber) {
    return "Not available";
  }

  if (accountNumber.length <= 4) {
    return accountNumber;
  }

  return `•••• ${accountNumber.slice(-4)}`;
};

/* -------------------------------------------------------------------------- */
/*                             ROLE LOADING                                   */
/* -------------------------------------------------------------------------- */

const RoleLoadingState = () => {
  return (
    <div className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <TagHeader title="Transaction Details" />

        <div className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="h-48 animate-pulse bg-gray-100" />

          <div className="space-y-5 p-6">
            <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />

            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                        ROLE RESOLUTION ERROR                               */
/* -------------------------------------------------------------------------- */

const RoleResolutionError = ({
  onRetry,
}: {
  onRetry: () => void;
}) => {
  return (
    <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <TagHeader title="Transaction Details" />

        <div className="mt-5 rounded-3xl border border-amber-200 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Icon
              icon="mdi:account-alert-outline"
              className="text-3xl"
            />
          </div>

          <h1 className="mt-5 text-xl font-black text-gray-900">
            Account role unavailable
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            We received the transaction, but the
            account role was not included in the
            response. Role-specific information has
            been hidden for your protection.
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
          >
            <RefreshRoundedIcon
              sx={{ fontSize: 18 }}
            />
            Try again
          </button>
        </div>
      </div>
    </main>
  );
};

/* -------------------------------------------------------------------------- */
/*                              TIMELINE                                      */
/* -------------------------------------------------------------------------- */

const StatusTimeline = ({
  order,
}: {
  order: Order;
}) => {
  const orderStatus = normalizeStatus(
    order.status
  );

  const paymentStatus = normalizeStatus(
    order.paymentStatus
  );

  const logisticsStatus = normalizeStatus(
    order.logistics?.status
  );

  const paymentComplete = [
    "paid",
    "completed",
    "successful",
    "success",
  ].includes(paymentStatus);

  const processingComplete =
    ["completed", "successful", "success"].includes(
      orderStatus
    ) ||
    logisticsStatus.includes("processing") ||
    logisticsStatus.includes("completed");

  const orderComplete = [
    "completed",
    "successful",
    "success",
  ].includes(orderStatus);

  const steps = [
    {
      title: "Order placed",
      description: order.createdAt
        ? formatDate(order.createdAt)
        : "Order received",
      completed: Boolean(order.createdAt),
    },
    {
      title: "Payment",
      description:
        order.paymentStatus || "Payment pending",
      completed: paymentComplete,
    },
    {
      title: "Processing",
      description:
        order.logistics?.status ||
        "Awaiting processing",
      completed: processingComplete,
    },
    {
      title: "Completed",
      description: orderComplete
        ? "Order completed"
        : "Awaiting completion",
      completed: orderComplete,
    },
  ];

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isLast =
          index === steps.length - 1;

        return (
          <div
            key={step.title}
            className="relative flex gap-4"
          >
            {!isLast && (
              <span
                className={`absolute left-[15px] top-9 h-[calc(100%-18px)] w-px ${
                  step.completed
                    ? "bg-[#006838]"
                    : "bg-gray-200"
                }`}
              />
            )}

            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                step.completed
                  ? "bg-[#006838] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.completed ? (
                <CheckCircleRoundedIcon
                  sx={{ fontSize: 17 }}
                />
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              )}
            </div>

            <div className="pb-6">
              <p
                className={`text-sm font-bold ${
                  step.completed
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            INFORMATION CARD                                */
/* -------------------------------------------------------------------------- */

const InfoCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
          {icon}
        </div>

        <h2 className="text-sm font-black text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                         TRANSACTION DETAILS                                */
/* -------------------------------------------------------------------------- */

const TransactionDetails = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const orderId = useMemo(() => {
    const queryId =
      searchParams.get("id");

    const routeId = Array.isArray(
      params?.orderId
    )
      ? params.orderId[0]
      : params?.orderId;

    return queryId || routeId || null;
  }, [params, searchParams]);

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [copied, setCopied] =
    useState("");

  /* ---------------------------------------------------------------------- */
  /*                              FETCH                                      */
  /* ---------------------------------------------------------------------- */

  const fetchOrder = useCallback(
    async (refresh = false) => {
      if (!orderId) {
        setLoading(false);
        setError(
          "This transaction could not be identified."
        );
        return;
      }

      const token =
        localStorage.getItem("userToken");

      if (!token) {
        router.replace("/auth/login");
        return;
      }

      try {
        if (refresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await axios.get(
          `/orders/${encodeURIComponent(
            String(orderId)
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        /*
         * IMPORTANT:
         *
         * API:
         *
         * {
         *   success: true,
         *   order: {...}
         * }
         */
        const fetchedOrder =
          response?.data?.order;

        if (!fetchedOrder) {
          throw new Error(
            "Order was not returned by the API."
          );
        }

        setOrder(fetchedOrder);
      } catch (error: any) {
        console.error(
          "Failed to fetch transaction:",
          error
        );

        const status =
          error?.response?.status;

        if (status === 401) {
          localStorage.removeItem(
            "userToken"
          );

          router.replace("/auth/login");
          return;
        }

        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load transaction details."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [orderId, router]
  );

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  /* ---------------------------------------------------------------------- */
  /*                          ROLE RESOLUTION                                */
  /* ---------------------------------------------------------------------- */

  /*
   * THIS is now the source of truth.
   *
   * No prop.
   * No default "buyer".
   * No default "seller".
   * No localStorage role.
   */
  const userRole = order?.userId?.accountType 
  console.log("User order:", order);

  const roleLoaded =
    userRole === "buyer" ||
    userRole === "seller";

  const isBuyer =
    roleLoaded && userRole === "buyer";

  const isSeller =
    roleLoaded && userRole === "seller";

  /* ---------------------------------------------------------------------- */
  /*                               COPY                                      */
  /* ---------------------------------------------------------------------- */

  const copyValue = async (
    value: string,
    key: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        value
      );

      setCopied(key);

      window.setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch (error) {
      console.error(
        "Failed to copy:",
        error
      );
    }
  };

  /* ---------------------------------------------------------------------- */
  /*                            DERIVED DATA                                  */
  /* ---------------------------------------------------------------------- */

  const status = useMemo(
    () =>
      getStatusConfig(order?.status),
    [order?.status]
  );

  const paymentStatus = useMemo(
    () =>
      getStatusConfig(
        order?.paymentStatus
      ),
    [order?.paymentStatus]
  );

  const subtotal =
    Number(order?.subTotal) || 0;

  const shippingTotal =
    Number(order?.shippingTotal) || 0;

  const deliveryFee =
    Number(
      order?.logistics?.deliveryFee
    ) || 0;

  const vatAmount =
    Number(
      order?.logistics?.vatAmount
    ) || 0;

  const grandTotal =
    Number(order?.grandTotal) || 0;

  const shippingAddress = getShippingAddress(
    order?.shippingAddress
  );

  const fallbackCustomerAddress =
    getCustomerAddress(
      order?.userId?.addresses
    );

  const customerName =
    getPersonName(order?.userId);

  const vendorName =
    getPersonName(order?.vendorId);

  const businessAddress =
    order?.businessId?.addresses;

  const businessAddressText = [
    businessAddress?.street,
    businessAddress?.town,
    businessAddress?.city,
    businessAddress?.state,
    businessAddress?.country,
  ]
    .filter(isValidValue)
    .join(", ");

  /* ---------------------------------------------------------------------- */
  /*                              LOADING                                    */
  /* ---------------------------------------------------------------------- */

  if (loading) {
    return <RoleLoadingState />;
  }

  /* ---------------------------------------------------------------------- */
  /*                               ERROR                                    */
  /* ---------------------------------------------------------------------- */

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
        <div className="mx-auto w-full max-w-4xl">
          <TagHeader title="Transaction Details" />

          <div className="mt-5 rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <ReceiptLongRoundedIcon
                sx={{ fontSize: 30 }}
              />
            </div>

            <h1 className="mt-5 text-xl font-black text-gray-900">
              Transaction unavailable
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {error ||
                "We couldn't find this transaction."}
            </p>

            <button
              type="button"
              onClick={() =>
                fetchOrder(true)
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white"
            >
              <RefreshRoundedIcon
                sx={{ fontSize: 18 }}
              />
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* ---------------------------------------------------------------------- */
  /*                      ROLE NOT AVAILABLE                                */
  /* ---------------------------------------------------------------------- */

  /*
   * This is VERY important.
   *
   * The page does not expose buyer or seller private
   * sections when userId.role is missing/invalid.
   */
  if (!roleLoaded) {
    return (
      <RoleResolutionError
        onRetry={() =>
          fetchOrder(true)
        }
      />
    );
  }

  /* ---------------------------------------------------------------------- */
  /*                                UI                                      */
  /* ---------------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <TagHeader title="Transaction Details" />

        {/* ================================================================ */}
        {/* TOP ACTIONS                                                      */}
        {/* ================================================================ */}

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            <ArrowBackRoundedIcon
              sx={{ fontSize: 18 }}
            />
            Back
          </button>

          <button
            type="button"
            onClick={() => fetchOrder(true)}
            disabled={refreshing}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:text-[#006838] disabled:opacity-50"
            aria-label="Refresh transaction"
          >
            <RefreshRoundedIcon
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
          </button>
        </div>

        {/* ================================================================ */}
        {/* HEADER                                                           */}
        {/* ================================================================ */}

        <section className="relative mt-4 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] p-5 shadow-[0_20px_60px_rgba(0,104,56,0.14)] sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-white/55">
                  <ReceiptLongRoundedIcon
                    sx={{ fontSize: 17 }}
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    {isSeller
                      ? "Seller order"
                      : "Your order"}
                  </span>
                </div>

                <h1 className="mt-2 break-all text-xl font-black text-white sm:text-3xl">
                  #
                  {order.orderReference ||
                    order._id.slice(-10)}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/55">
                  <span>
                    {formatDate(
                      order.createdAt
                    )}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-white/25" />

                  <span>
                    {formatTime(
                      order.createdAt
                    )}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide ring-1 ${status.className}`}
                >
                  {status.icon}
                  {status.label}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold capitalize ring-1 ${paymentStatus.className}`}
                >
                  <PaymentsRoundedIcon
                    sx={{ fontSize: 14 }}
                  />
                  {order.paymentStatus ||
                    "pending"}
                </span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Total
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  {formatCurrency(
                    grandTotal
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Items
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  {order.items?.length || 0}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Shipping
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  {formatCurrency(
                    shippingTotal
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Role
                </p>

                <p className="mt-1 text-lg font-black capitalize text-white">
                  {userRole}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CONTENT                                                          */}
        {/* ================================================================ */}

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-4">
            {/* ------------------------------------------------------------ */}
            {/* ITEMS                                                         */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#006838]">
                    Purchase
                  </p>

                  <h2 className="mt-1 text-xl font-black text-gray-900">
                    Order items
                  </h2>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                  {order.items?.length || 0}{" "}
                  {order.items?.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {order.items?.map(
                  (item, index) => {
                    const quantity =
                      Number(
                        item.quantity || 0
                      );

                    const unitPrice =
                      Number(
                        item.price ??
                          item.productId
                            ?.price ??
                          0
                      );

                    const lineTotal =
                      quantity * unitPrice;

                    const name =
                      item.productId?.name ||
                      "Product item";

                    return (
                      <div
                        key={
                          item._id ||
                          `${name}-${index}`
                        }
                        className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3 sm:gap-4 sm:p-4"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                          <Image
                            src={getProductImage(
                              item
                            )}
                            alt={name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-bold text-gray-900">
                            {name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Quantity:{" "}
                            {quantity}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {formatCurrency(
                              unitPrice
                            )}{" "}
                            each
                          </p>
                        </div>

                        <p className="shrink-0 self-center text-sm font-black text-gray-900">
                          {formatCurrency(
                            lineTotal
                          )}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Totals */}

              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="ml-auto max-w-md space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-700">
                      {formatCurrency(
                        subtotal
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-700">
                      {formatCurrency(
                        shippingTotal
                      )}
                    </span>
                  </div>

                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Delivery fee</span>
                      <span className="font-semibold text-gray-700">
                        {formatCurrency(
                          deliveryFee
                        )}
                      </span>
                    </div>
                  )}

                  {vatAmount > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>VAT</span>
                      <span className="font-semibold text-gray-700">
                        {formatCurrency(
                          vatAmount
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-gray-100 pt-3">
                    <span className="font-black text-gray-900">
                      Grand total
                    </span>

                    <span className="text-xl font-black text-[#006838]">
                      {formatCurrency(
                        grandTotal
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* SHIPPING                                                       */}
            {/* ------------------------------------------------------------ */}

            <InfoCard
              title="Shipping & delivery"
              icon={
                <LocalShippingRoundedIcon
                  sx={{ fontSize: 20 }}
                />
              }
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Destination
                  </p>

                  {shippingAddress.length > 0 ? (
                    <>
                      <p className="mt-2 text-sm font-bold text-gray-900">
                        {
                          order
                            .shippingAddress
                            ?.recipientName
                        }
                      </p>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {shippingAddress.join(
                          ", "
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-sm font-bold text-amber-700">
                        Shipping address unavailable
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        This order contains N/A
                        shipping information.
                      </p>
                    </>
                  )}
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Delivery
                  </p>

                  <p className="mt-2 text-sm font-bold text-gray-900">
                    {order.logistics
                      ?.status ||
                      "Awaiting processing"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-600">
                      {order.logistics
                        ?.isPickup
                        ? "Pickup"
                        : "Delivery"}
                    </span>

                    <span className="rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-600">
                      Waybill:{" "}
                      {order.logistics
                        ?.waybillNumber ||
                        "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buyer can see delivery contact.
                  Seller can also see it because it belongs to fulfillment. */}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {isValidValue(
                  order.shippingAddress
                    ?.recipientPhone
                ) && (
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <PhoneRoundedIcon
                        sx={{ fontSize: 16 }}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Recipient phone
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                      {
                        order
                          .shippingAddress
                          ?.recipientPhone
                      }
                    </p>
                  </div>
                )}

                {isValidValue(
                  order.shippingAddress
                    ?.recipientEmail
                ) && (
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MailOutlineRoundedIcon
                        sx={{ fontSize: 16 }}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Recipient email
                      </span>
                    </div>

                    <p className="mt-2 break-all text-sm font-bold text-gray-800">
                      {
                        order
                          .shippingAddress
                          ?.recipientEmail
                      }
                    </p>
                  </div>
                )}
              </div>
            </InfoCard>

            {/* ------------------------------------------------------------ */}
            {/* PAYMENT                                                       */}
            {/* ------------------------------------------------------------ */}

            <InfoCard
              title="Payment information"
              icon={
                <PaymentsRoundedIcon
                  sx={{ fontSize: 20 }}
                />
              }
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Payment reference
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <p className="min-w-0 flex-1 break-all text-sm font-bold text-gray-900">
                      {order.paymentReference ||
                        "Not available"}
                    </p>

                    {order.paymentReference && (
                      <button
                        type="button"
                        onClick={() =>
                          copyValue(
                            order.paymentReference!,
                            "payment"
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm hover:text-[#006838]"
                      >
                        {copied ===
                        "payment" ? (
                          <CheckCircleRoundedIcon
                            sx={{ fontSize: 16 }}
                          />
                        ) : (
                          <ContentCopyRoundedIcon
                            sx={{ fontSize: 15 }}
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Payment status
                  </p>

                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ${paymentStatus.className}`}
                  >
                    {paymentStatus.icon}
                    {order.paymentStatus ||
                      "Pending"}
                  </span>
                </div>
              </div>

              {order.logistics?.waybillNumber?.includes(
                "Pay on Delivery"
              ) && (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <Icon
                      icon="mdi:cash-clock"
                      className="mt-0.5 text-xl text-amber-600"
                    />

                    <div>
                      <p className="text-sm font-bold text-amber-900">
                        Pay on delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        This order is marked for
                        payment on delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </InfoCard>
          </div>

          {/* ============================================================ */}
          {/* RIGHT RAIL — ROLE CONTROLLED                                   */}
          {/* ============================================================ */}

          <aside className="space-y-4">
            {/* ---------------------------------------------------------- */}
            {/* TIMELINE — BOTH ROLES                                       */}
            {/* ---------------------------------------------------------- */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                  <ReceiptLongRoundedIcon
                    sx={{ fontSize: 19 }}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    Progress
                  </p>

                  <h2 className="text-sm font-black text-gray-900">
                    Order timeline
                  </h2>
                </div>
              </div>

              <div className="mt-6">
                <StatusTimeline order={order} />
              </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* BUYER ONLY: SELLER                                          */}
            {/* ---------------------------------------------------------- */}

            {isBuyer && (
              <>
                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                      <BusinessRoundedIcon
                        sx={{ fontSize: 19 }}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Seller
                      </p>

                      <h2 className="truncate text-sm font-black text-gray-900">
                        {order.businessId
                          ?.businessName ||
                          "Merchant"}
                      </h2>
                    </div>
                  </div>

                  {vendorName !==
                    "Not available" && (
                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                      <p className="text-sm font-bold text-gray-900">
                        {vendorName}
                      </p>

                      {/* {order.vendorId
                        ?.phone && (
                        <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <PhoneRoundedIcon
                            sx={{ fontSize: 14 }}
                          />
                          {order.vendorId.phone}
                        </p>
                      )} */}

                      {/* {order.vendorId
                        ?.email && (
                        <p className="mt-2 flex items-center gap-2 break-all text-xs text-gray-500">
                          <MailOutlineRoundedIcon
                            sx={{ fontSize: 14 }}
                          />
                          {order.vendorId.email}
                        </p>
                      )} */}
                    </div>
                  )}
                </section>

                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    Seller
                  </p>

                  <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#006838] py-3.5 text-sm font-bold text-[#006838] transition hover:bg-[#006838]/5"
                  >
                    <Icon
                      icon="solar:chat-round-dots-bold"
                      className="text-xl"
                    />

                    Contact Seller
                  </button>
                </section>
              </>
            )}

            {/* ---------------------------------------------------------- */}
            {/* SELLER ONLY: CUSTOMER                                       */}
            {/* ---------------------------------------------------------- */}

            {isSeller && (
              <>
                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                      <PersonRoundedIcon
                        sx={{ fontSize: 19 }}
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Customer
                      </p>

                      <h2 className="text-sm font-black text-gray-900">
                        {customerName}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                    {order.userId?.email && (
                      <p className="flex items-center gap-2 break-all text-xs text-gray-500">
                        <MailOutlineRoundedIcon
                          sx={{ fontSize: 14 }}
                        />
                        {order.userId.email}
                      </p>
                    )}

                    {order.userId?.phone && (
                      <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <PhoneRoundedIcon
                          sx={{ fontSize: 14 }}
                        />
                        {order.userId.phone}
                      </p>
                    )}

                    {fallbackCustomerAddress.length >
                      0 && (
                      <div className="mt-3 border-t border-gray-200 pt-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Account address
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {fallbackCustomerAddress.join(
                            ", "
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                      <BusinessRoundedIcon
                        sx={{ fontSize: 19 }}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Business
                      </p>

                      <h2 className="truncate text-sm font-black text-gray-900">
                        {order.businessId
                          ?.businessName ||
                          "Business"}
                      </h2>
                    </div>
                  </div>

                  {businessAddressText && (
                    <p className="mt-4 text-xs leading-5 text-gray-500">
                      {businessAddressText}
                    </p>
                  )}
                </section>

                {/* IMPORTANT:
                    Seller-only information.
                    A buyer must NEVER see this. */}

                {order.businessId
                  ?.paymentInfo && (
                  <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                        <AccountBalanceRoundedIcon
                          sx={{ fontSize: 19 }}
                        />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                          Seller only
                        </p>

                        <h2 className="text-sm font-black text-gray-900">
                          Settlement account
                        </h2>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                      <p className="text-sm font-bold text-gray-900">
                        {
                          order.businessId
                            .paymentInfo
                            .accountName
                        }
                      </p>

                      <p className="mt-2 text-xs text-gray-500">
                        {
                          order.businessId
                            .paymentInfo
                            .bankName
                        }{" "}
                        ·{" "}
                        {maskAccountNumber(
                          order.businessId
                            .paymentInfo
                            .accountNumber
                        )}
                      </p>

                      <span className="mt-3 inline-flex rounded-full bg-gray-200 px-2.5 py-1 text-[10px] font-bold uppercase text-gray-600">
                        Settlement:{" "}
                        {
                          order.vendorSettlementStatus
                        }
                      </span>
                    </div>
                  </section>
                )}

                <button
                  type="button"
                  disabled={
                    status.label ===
                    "Completed"
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#006838] py-4 text-sm font-bold text-white shadow-lg shadow-green-100 transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
                >
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 19 }}
                  />

                  {status.label ===
                  "Completed"
                    ? "Fulfillment Confirmed"
                    : "Confirm Fulfillment"}
                </button>
              </>
            )}

            {/* ---------------------------------------------------------- */}
            {/* REFERENCE — BOTH ROLES                                      */}
            {/* ---------------------------------------------------------- */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                Reference
              </p>

              <div className="mt-4">
                <p className="text-[10px] text-gray-400">
                  Order ID
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <p className="min-w-0 flex-1 break-all text-xs font-semibold text-gray-700">
                    {order._id}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      copyValue(
                        order._id,
                        "order"
                      )
                    }
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition hover:text-[#006838]"
                    aria-label="Copy order ID"
                  >
                    {copied === "order" ? (
                      <CheckCircleRoundedIcon
                        sx={{ fontSize: 16 }}
                      />
                    ) : (
                      <ContentCopyRoundedIcon
                        sx={{ fontSize: 15 }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default TransactionDetails;