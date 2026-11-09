// 'use client'
// import React, {useState, useEffect} from 'react'
// import ProductGrid, { ProductsPageGrid } from '@/components/Grid/ProductGrid';
// import { ProductT } from '@/types/Product.types';
// import axios from "@/utils/axios";
// import Swal from 'sweetalert2';
// import Header from '@/components/header/ProductHeader';
// import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import CircleLoader from '@/components/loader/loader';
// import { useRouter } from "next/navigation";

// const compareDate = (newProducts: string) => {
//     const DIFFERENCE_IN_DAYS = 7;
//     const today = new Date();
//     const productDate = new Date(newProducts);
//     const diffTime = Math.round((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
//     return diffTime <= DIFFERENCE_IN_DAYS;
// }

// const page = () => {
//     const [products, setProducts] = useState<ProductT[]>([]); // useState expects an array of Product
//     const [loading, setLoading] = useState(true);
//       const router = useRouter();

//       useEffect(() => {
//         // const userToken = localStorage.getItem("userToken") || "";
//         // const tr = JSON.parse(userToken);
//         setLoading(true)
//         axios({
//           method: "GET",
//           url: "products",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         })
//           .then((res) => {
//             console.log("res gtff", res);
//             setLoading(false)
//             setProducts(res.data.products);  // Set the products once
//           })
//           .catch((error) => {
//              if(error.response.data.message==="Unauthorized access"){
//                 Swal.fire({
//                   title: "Session Expired",
//                   text: "Your session has expired. Please log in again.",
//                   icon: "warning",
//                   confirmButtonText: "OK",
//                 }).then(() => {
//                   localStorage.clear();
//                   window.location.replace("/auth/login");
//                 });
//                 return;
//               }
//             console.log(error);
//           });
        
//         // Add an empty dependency array to ensure the effect only runs once
//       }, []);  // No products dependency here
      
//       const newArrivals = products.filter(productSingle => compareDate(productSingle.createdAt))
//   return (
//     <div className='px-5'>
//       <Header/>
//       <div className="flex items-center justify-between relative py-5">
//   {/* Back Arrow (left) */}
//   <button 
//     onClick={() => router.back()} 
//     className="absolute left-0 p-2"
//   >
//     <ArrowBackIosNewOutlinedIcon />
//   </button>

//   {/* Title (centered) */}
//   <h2 className="text-xl font-semibold mx-auto">New Arrivals</h2>
// </div>
//       {loading ? <CircleLoader isVisible={loading} /> : <> {newArrivals.length > 0 ? (
//             <ProductsPageGrid products={newArrivals} />
//         ) : (
//             <div className="p-4 flex flex-col gap-3">
//                 <p className="text-center">No new arrivals</p>
//             </div>
//         )}</> }
     
//     </div>
//   )
// }

// export default page
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProductT } from "@/types/Product.types";
import axios from "@/utils/axios";
import Swal from "sweetalert2";
import Header from "@/components/header/ProductHeader";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CircleLoader from "@/components/loader/loader";
import { ProductsPageGrid } from "@/components/Grid/ProductGrid";
import { useRouter } from "next/navigation";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SparklesRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Package2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const NEW_ARRIVAL_DAYS = 7;

/* -------------------------------------------------------------------------- */
/*                               DATE HELPERS                                 */
/* -------------------------------------------------------------------------- */

const compareDate = (
  dateString?: string,
  days = NEW_ARRIVAL_DAYS
): boolean => {
  if (!dateString) return false;

  const productDate = new Date(dateString);

  if (Number.isNaN(productDate.getTime())) {
    return false;
  }

  const now = new Date();

  // Do not treat future-dated products as new arrivals.
  if (productDate.getTime() > now.getTime()) {
    return false;
  }

  const differenceInDays =
    (now.getTime() - productDate.getTime()) /
    (1000 * 60 * 60 * 24);

  return differenceInDays >= 0 && differenceInDays <= days;
};

/* -------------------------------------------------------------------------- */
/*                              TYPE HELPERS                                  */
/* -------------------------------------------------------------------------- */

const getProductId = (product: ProductT) => {
  const item = product as ProductT & {
    _id?: string;
    id?: string;
  };

  return String(item._id ?? item.id ?? "");
};

const getProductName = (product: ProductT) => {
  const item = product as ProductT & {
    name?: string;
  };

  return item.name?.trim() || "Untitled Product";
};

const getCreatedAt = (product: ProductT) => {
  const item = product as ProductT & {
    createdAt?: string;
  };

  return item.createdAt;
};

/* -------------------------------------------------------------------------- */
/*                           SKELETON COMPONENT                               */
/* -------------------------------------------------------------------------- */

const NewArrivalsSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="h-52 animate-pulse bg-gray-100" />

          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

const Page = () => {
  const router = useRouter();

  const [products, setProducts] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                            FETCH PRODUCTS                                */
  /* ------------------------------------------------------------------------ */

  const fetchProducts = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const token = localStorage.getItem("userToken");

        const response = await axios.get("products", {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });

        const responseData = response?.data;

        let fetchedProducts: ProductT[] = [];

        /*
         * Your API currently returns:
         *
         * response.data.products
         *
         * The extra fallbacks keep this page safe if the
         * API response shape changes later.
         */
        if (Array.isArray(responseData)) {
          fetchedProducts = responseData;
        } else if (Array.isArray(responseData?.products)) {
          fetchedProducts = responseData.products;
        } else if (Array.isArray(responseData?.data)) {
          fetchedProducts = responseData.data;
        }

        /*
         * Keep only valid product objects.
         */
        const validProducts = fetchedProducts.filter(
          (product) =>
            product &&
            typeof product === "object"
        );

        setProducts(validProducts);

        if (!validProducts.length) {
          console.info(
            "No products returned from products API."
          );
        }
      } catch (error: unknown) {
        console.error(
          "Failed to fetch new arrivals:",
          error
        );

        const axiosError = error as {
          response?: {
            status?: number;
            data?: {
              message?: string;
            };
          };
        };

        const status = axiosError?.response?.status;
        const message =
          axiosError?.response?.data?.message;

        if (
          status === 401 ||
          message === "Unauthorized access"
        ) {
          const result = await Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "Log In",
            confirmButtonColor: "#006838",
            allowOutsideClick: false,
          });

          if (result.isConfirmed) {
            localStorage.removeItem("userToken");
            window.location.replace("/auth/login");
          }

          return;
        }

        setError(
          "We couldn't load the latest products right now. Please try again."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ------------------------------------------------------------------------ */
  /*                            NEW ARRIVALS                                  */
  /* ------------------------------------------------------------------------ */

  const newArrivals = useMemo(() => {
    return products
      .filter((product) =>
        compareDate(getCreatedAt(product))
      )
      .sort((a, b) => {
        const dateA = new Date(
          getCreatedAt(a) || 0
        ).getTime();

        const dateB = new Date(
          getCreatedAt(b) || 0
        ).getTime();

        return dateB - dateA;
      });
  }, [products]);

  /* ------------------------------------------------------------------------ */
  /*                             STATISTICS                                   */
  /* ------------------------------------------------------------------------ */

  const newestProduct = newArrivals[0];

  /* ------------------------------------------------------------------------ */
  /*                              RENDER                                      */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-[#f7f9f8]">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-4 md:px-6 lg:px-8">
        <Header />

        {/* ---------------------------------------------------------------- */}
        {/* TOP HEADER                                                       */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-5 overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] px-5 py-7 sm:px-8 sm:py-9">
            {/* Decorative shapes */}
            <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#58e99b]/10 blur-3xl" />

            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="relative mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <ArrowBackIosNewOutlinedIcon
                sx={{ fontSize: 18 }}
              />
            </button>

            <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur">
                  <SparklesRoundedIcon
                    sx={{ fontSize: 15 }}
                  />
                  Freshly added
                </div>

                <h1 className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                  New Arrivals
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                  Discover products that have recently
                  joined the NaijaZone marketplace.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="min-w-[130px] rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white/60">
                    <Package2OutlinedIcon
                      sx={{ fontSize: 17 }}
                    />

                    <span className="text-[11px] uppercase tracking-wider">
                      Products
                    </span>
                  </div>

                  <p className="mt-2 text-2xl font-black text-white">
                    {newArrivals.length}
                  </p>
                </div>

                <div className="min-w-[130px] rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white/60">
                    <SparklesRoundedIcon
                      sx={{ fontSize: 17 }}
                    />

                    <span className="text-[11px] uppercase tracking-wider">
                      Window
                    </span>
                  </div>

                  <p className="mt-2 text-2xl font-black text-white">
                    7 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* TOOLBAR                                                          */}
          {/* ---------------------------------------------------------------- */}

          <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Recently added to the marketplace
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Showing products added within the last{" "}
                {NEW_ARRIVAL_DAYS} days.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  router.push("/user/dashboard")
                }
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-[#006838]/20 hover:bg-[#006838]/5 hover:text-[#006838]"
              >
                <SearchRoundedIcon
                  sx={{ fontSize: 18 }}
                />
                Explore marketplace
              </button>

              <button
                type="button"
                onClick={() => fetchProducts(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-xl bg-[#006838] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshRoundedIcon
                  sx={{ fontSize: 18 }}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </button>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* MAIN CONTENT                                                     */}
        {/* ---------------------------------------------------------------- */}

        {loading ? (
          <div className="py-8">
            <div className="mb-5 flex justify-center">
              <CircleLoader isVisible={loading} />
            </div>

            <NewArrivalsSkeleton />
          </div>
        ) : error ? (
          <section className="mt-6 rounded-3xl border border-red-100 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <Package2OutlinedIcon
                sx={{
                  fontSize: 32,
                  color: "#ef4444",
                }}
              />
            </div>

            <h2 className="mt-5 text-xl font-black text-gray-900">
              Something went wrong
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => fetchProducts()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
            >
              <RefreshRoundedIcon
                sx={{ fontSize: 18 }}
              />
              Try again
            </button>
          </section>
        ) : newArrivals.length > 0 ? (
          <>
            {/* ------------------------------------------------------------ */}
            {/* FEATURED NEW ARRIVAL                                         */}
            {/* ------------------------------------------------------------ */}

            {newestProduct && (
              <section className="mt-6 rounded-3xl border border-[#006838]/10 bg-[#effaf4] p-4 sm:p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#006838]/10">
                      <SparklesRoundedIcon
                        sx={{
                          fontSize: 23,
                          color: "#006838",
                        }}
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#006838]">
                        Latest addition
                      </p>

                      <h2 className="mt-1 text-base font-bold text-gray-900">
                        {getProductName(
                          newestProduct
                        )}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        The newest product in this
                        collection.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const id =
                        getProductId(newestProduct);

                      if (!id) return;

                      router.push(
                        `./Product?id=${encodeURIComponent(
                          id
                        )}`
                      );
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#006838] shadow-sm ring-1 ring-[#006838]/10 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    View latest product
                    <ArrowForwardRoundedIcon
                      sx={{ fontSize: 18 }}
                    />
                  </button>
                </div>
              </section>
            )}

            {/* ------------------------------------------------------------ */}
            {/* PRODUCTS                                                      */}
            {/* ------------------------------------------------------------ */}

            <section className="mt-7 pb-16">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#006838]">
                    Latest products
                  </p>

                  <h2 className="mt-1 text-xl font-black tracking-tight text-gray-900 md:text-2xl">
                    Explore New Arrivals
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {newArrivals.length}{" "}
                    {newArrivals.length === 1
                      ? "product"
                      : "products"}{" "}
                    added recently
                  </p>
                </div>

                <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-gray-500 shadow-sm ring-1 ring-gray-200 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-[#006838]" />
                  Updated automatically
                </div>
              </div>

              <ProductsPageGrid products={newArrivals} />
            </section>
          </>
        ) : (
          /* -------------------------------------------------------------- */
          /* EMPTY STATE                                                     */
          /* -------------------------------------------------------------- */

          <section className="mt-6 overflow-hidden rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-24 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#006838]/10">
              <SparklesRoundedIcon
                sx={{
                  fontSize: 38,
                  color: "#006838",
                }}
              />
            </div>

            <h2 className="mt-6 text-2xl font-black tracking-tight text-gray-900">
              No new arrivals yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              There haven&apos;t been any products added
              within the last {NEW_ARRIVAL_DAYS} days.
              Explore the marketplace to discover
              products that are already available.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  router.push("/user/dashboard")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
              >
                Explore marketplace
                <ArrowForwardRoundedIcon
                  sx={{ fontSize: 18 }}
                />
              </button>

              <button
                type="button"
                onClick={() => fetchProducts(true)}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshRoundedIcon
                  sx={{ fontSize: 18 }}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                Check again
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Page;