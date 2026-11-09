// "use client";
// import React, { useState, Suspense, useEffect } from "react";
// import Card from "@/components/cards/ProductCard";
// import Header from "@/components/header/ProductHeader";
// import Tabs from "@/components/tabs/ProductAndServiceTab";
// import FloatingButton from "@/components/buttons/FloatingButton";
// import Carousel from "@/components/carousel/Carousel";
// import SortFilter from "@/components/SortFilter/SortFilter";
// import ProductGrid from "@/components/Grid/ProductGrid";
// import { useRouter, useSearchParams } from "next/navigation";
// import Services from "./Services";
// import axios from "@/utils/axios";
// import { ProductT } from "@/types/Product.types";
// import Banner1 from '../../../../assets/images/banner-img/banner-img-1.jpg'
// import Banner2 from '../../../../assets/images/banner-img/banner-img-2.jpg'
// import Banner3 from '../../../../assets/images/banner-img/banner-img-3.jpg'
// import Banner4 from '../../../../assets/images/banner-img/banner-img-4.jpg'
// import Swal from "sweetalert2";
// import CircleLoader from "@/components/loader/loader";

// const compareDate = (dateString?: string) => {
//   if (!dateString) return false; // skip if no date
//   const DIFFERENCE_IN_DAYS = 7;
//   const today = new Date();
//   const productDate = new Date(dateString);

//   if (isNaN(productDate.getTime())) return false; // invalid date
//   const diffTime = Math.floor((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
//   return diffTime <= DIFFERENCE_IN_DAYS;
// };
// const Dashboard = () => {
//   const [products, setProducts] = useState<ProductT[]>([]); // useState expects an array of Product
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(true);

//   useEffect(() => {
//     setLoading(true)
//     axios({
//       method: "GET",
//       url: "products",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         console.log("res gtff", res.data);
//         setProducts(res.data.products);  // Set the products once
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.log(error)
//         if(error.response.data.message==="Unauthorized access"){
//           Swal.fire({
//             title: "Session Expired",
//             text: "Your session has expired. Please log in again.",
//             icon: "warning",
//             confirmButtonText: "OK",
//           }).then(() => {
//             localStorage.clear();
//             window.location.replace("/auth/login");
//           });
//           return;
//         }
//         console.log(error);
//       });
    
//   }, []);  // No products dependency here
  
//   // const newArrivals = products.filter(products => compareDate(products.createdAt))
// const newArrivals = products.filter(p => compareDate(p.createdAt)).slice(0, 3);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const main = searchParams.get("main") || "";
//   const [activeTab, setActiveTab] = useState(main || "products");
//   const imagesL = [Banner1, Banner2, Banner3, Banner4]
//   const imageSrcArray = imagesL.map((image) => image.src);
//   const [activeRouteProp, setActiveRouteProp] = useState('a-z');
//   const data = ['popular', 'cost effective', 'location'];

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//     <div className="min-h-screen">
//       {
//         loading ? <CircleLoader isVisible={loading} />:<div className="md:max-w-[85%] mx-auto">
//         <Header />
//         <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
//         {activeTab == "products" ? (
//           <div className="mb-24 md:mb-0">
//             <SortFilter sortFilterArray={data} activeTab={activeRouteProp} setActiveTab={setActiveRouteProp} />
//             <FloatingButton
//               color="bg-[#006838]"
//               onClick={() => {
//                 router.push("./dashboard/add-item");
//               }}
//             />
//             <Carousel images={['https://res.cloudinary.com/wise-solution-inc/image/upload/v1755239366/NZS_WEB_Banner_gh7lnp.png','https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.18_AM_s7elct.jpg', 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.19_AM_skokdz.jpg']}/>
//             {newArrivals.length > 0 ? (
//               <ProductGrid link="new-arrivals" title="New Arrivals" products={newArrivals} />
//             ) : (
//               <div className="p-4 flex flex-col gap-3">
//                 <h2 className="text-xl font-semibold">New Arrivals</h2>
//                 <p className="text-center">No new arrivals</p>
//               </div>
//             )}
//             {products.length > 0 ? (
//               <ProductGrid link="available-products" title="Available Products" products={products} />
//             ) : (
//               <div className="p-4 flex flex-col gap-3">
//                 <h2 className="text-xl font-semibold">Available Products</h2>
//                 <p className="text-center">No products available</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <FloatingButton />
//             <Services />
//           </>
//         )}

//       </div>
//       }
      
//     </div>
//     </Suspense>
//   );
// };

// const page = () => (
//   <Suspense fallback={<div>loading...</div>}>
//     <Dashboard />
//   </Suspense>
// );

// export default page;

// "use client";

// import React, { useState, Suspense, useEffect, useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Swal from "sweetalert2";

// // Components
// import Header from "@/components/header/ProductHeader";
// import Tabs from "@/components/tabs/ProductAndServiceTab";
// import FloatingButton from "@/components/buttons/FloatingButton";
// import Carousel from "@/components/carousel/Carousel";
// import SortFilter from "@/components/SortFilter/SortFilter";
// import ProductGrid from "@/components/Grid/ProductGrid";
// import CircleLoader from "@/components/loader/loader";
// import Services from "./Services";

// // Utils & Types
// import axios from "@/utils/axios";
// import { ProductT } from "@/types/Product.types";

// // Constants
// const CAROUSEL_IMAGES = [
//   "https://res.cloudinary.com/wise-solution-inc/image/upload/v1755239366/NZS_WEB_Banner_gh7lnp.png",
//   "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.18_AM_s7elct.jpg",
//   "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.19_AM_skokdz.jpg",
// ];

// const SORT_OPTIONS = ["popular", "cost effective", "location"];

// /**
//  * Checks if a product was created within the last 7 days.
//  */
// const compareDate = (dateString?: string) => {
//   if (!dateString) return false;
  
//   const DIFFERENCE_IN_DAYS = 7;
//   const today = new Date();
//   const productDate = new Date(dateString);

//   if (isNaN(productDate.getTime())) return false;
  
//   const diffTime = Math.floor((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
//   return diffTime <= DIFFERENCE_IN_DAYS;
// };

// const Dashboard = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   // States
//   const mainTab = searchParams.get("main") || "products";
//   const [activeTab, setActiveTab] = useState(mainTab);
//   const [activeRouteProp, setActiveRouteProp] = useState("a-z");
//   const [products, setProducts] = useState<ProductT[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("products", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         });
//         setProducts(res.data?.products || []);
//       } catch (error: any) {
//         console.error("Failed to fetch products:", error);
        
//         // Handle Unauthorized / Session Expiry safely
//         if (error?.response?.data?.message === "Unauthorized access") {
//           Swal.fire({
//             title: "Session Expired",
//             text: "Your session has expired. Please log in again.",
//             icon: "warning",
//             confirmButtonText: "OK",
//             confirmButtonColor: "#006838",
//           }).then(() => {
//             localStorage.clear();
//             window.location.replace("/auth/login");
//           });
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Memoized New Arrivals to prevent expensive recalculations on re-renders
//   const newArrivals = useMemo(() => {
//     return products.filter((p) => compareDate(p.createdAt)).slice(0, 4); // Capped at 4 for better grid balance
//   }, [products]);

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="md:max-w-[85%] mx-auto px-4 md:px-0 py-4">
//         {/* Shell remains visible while loading to prevent UI jumping */}
//         <Header />
//         <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

//         {loading ? (
//           <div className="flex justify-center items-center py-32">
//             <CircleLoader isVisible={loading} />
//           </div>
//         ) : (
//           <div className="animate-in fade-in duration-500">
//             {activeTab === "products" ? (
//               <div className="mb-24 md:mb-0 space-y-8 mt-6">

                
//                 <FloatingButton
//                   color="bg-[#006838]"
//                   onClick={() => router.push("./dashboard/add-item")}
//                 />
                
//                 <Carousel images={CAROUSEL_IMAGES} />

//                 {/* New Arrivals Section */}
//                 <section>
//                   {newArrivals.length > 0 ? (
//                     <ProductGrid link="new-arrivals" title="New Arrivals" products={newArrivals} />
//                   ) : (
//                     <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 border border-gray-100">
//                       <h2 className="text-xl font-semibold text-gray-800">New Arrivals</h2>
//                       <p className="text-sm text-gray-500">No new arrivals in the last 7 days.</p>
//                     </div>
//                   )}
//                 </section>

//                 {/* All Products Section */}
//                 <section>
//                   {products.length > 0 ? (
//                     <ProductGrid link="available-products" title="Available Products" products={products} />
//                   ) : (
//                     <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 border border-gray-100">
//                       <h2 className="text-xl font-semibold text-gray-800">Available Products</h2>
//                       <p className="text-sm text-gray-500">No products are currently available.</p>
//                     </div>
//                   )}
//                 </section>
//               </div>
//             ) : (
//               <div className="mt-6">
//                 <FloatingButton />
//                 <Services />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Next.js requires useSearchParams to be wrapped in a Suspense boundary at the page level
// const Page = () => (
//   <Suspense fallback={
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-8 h-8 border-4 border-[#006838] border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   }>
//     <Dashboard />
//   </Suspense>
// );

// export default Page;

"use client";

import React, {
  ChangeEvent,
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

// Components
import Header from "@/components/header/ProductHeader";
import Tabs from "@/components/tabs/ProductAndServiceTab";
import FloatingButton from "@/components/buttons/FloatingButton";
import ProductGrid from "@/components/Grid/ProductGrid";
import CircleLoader from "@/components/loader/loader";
import Services from "./Services";

// Utils & Types
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

type DashboardProduct = ProductT & {
  name?: string;
  description?: string;
  price?: number | string;
  createdAt?: string;

  category?:
    | string
    | {
        name?: string;
        title?: string;
      };

  images?: unknown;
  image?: unknown;
  imageUrl?: unknown;
  thumbnail?: unknown;
  productImages?: unknown;

  status?: boolean;
};

type SortOption =
  | "recommended"
  | "newest"
  | "price-low"
  | "price-high"
  | "name";

const MAX_SPOTLIGHT_PRODUCTS = 5;
const SPOTLIGHT_INTERVAL = 7000;
const INITIAL_PRODUCT_LIMIT = 12;
const LOAD_MORE_COUNT = 12;

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

const getDashboardProduct = (
  product: ProductT
): DashboardProduct => {
  return product as DashboardProduct;
};

const compareDate = (dateString?: string) => {
  if (!dateString) {
    return false;
  }

  const productDate = new Date(dateString);

  if (Number.isNaN(productDate.getTime())) {
    return false;
  }

  const now = new Date();

  const differenceInDays =
    (now.getTime() - productDate.getTime()) /
    (1000 * 60 * 60 * 24);

  return differenceInDays >= 0 && differenceInDays <= 7;
};

const getProductCategory = (
  product: ProductT
): string => {
  const item = getDashboardProduct(product);

  if (typeof item.category === "string") {
    return item.category.trim();
  }

  if (
    item.category &&
    typeof item.category === "object"
  ) {
    return (
      item.category.name ||
      item.category.title ||
      ""
    ).trim();
  }

  return "";
};

const getImageFromValue = (
  value: unknown
): string | null => {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value.trim() || null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const image = getImageFromValue(item);

      if (image) {
        return image;
      }
    }

    return null;
  }

  if (typeof value === "object") {
    const imageObject = value as Record<string, unknown>;

    const possibleUrls = [
      imageObject.secure_url,
      imageObject.url,
      imageObject.src,
      imageObject.path,
    ];

    for (const possibleUrl of possibleUrls) {
      if (
        typeof possibleUrl === "string" &&
        possibleUrl.trim()
      ) {
        return possibleUrl.trim();
      }
    }
  }

  return null;
};

const getProductImage = (
  product: ProductT
): string | null => {
  const item = getDashboardProduct(product);

  const imageSources = [
    item.images,
    item.productImages,
    item.image,
    item.imageUrl,
    item.thumbnail,
  ];

  for (const source of imageSources) {
    const image = getImageFromValue(source);

    if (image) {
      return image;
    }
  }

  return null;
};

const formatPrice = (price: unknown) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return String(price ?? "");
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(numericPrice);
};

const normalizeSearchText = (value: string) => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const normalizeText = (value?: string | null) => {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

const shuffleProducts = (
  products: ProductT[]
): ProductT[] => {
  const copied = [...products];

  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copied[i], copied[j]] = [
      copied[j],
      copied[i],
    ];
  }

  return copied;
};

const getProductId = (product: ProductT) => {
  const item = product as ProductT & {
    _id?: string;
    id?: string;
  };

  return String(item._id ?? item.id ?? "");
};

/* -------------------------------------------------------------------------- */
/*                         SPOTLIGHT PRODUCT CARD                             */
/* -------------------------------------------------------------------------- */

interface SpotlightProps {
  products: ProductT[];
  activeIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
  onOpenProduct: (product: ProductT) => void;
}

const ProductSpotlight = ({
  products,
  activeIndex,
  onNext,
  onPrevious,
  onSelect,
  onOpenProduct,
}: SpotlightProps) => {
  if (!products.length) {
    return null;
  }

  const product =
    products[activeIndex] ?? products[0];

  const category = getProductCategory(product);
  const image = getProductImage(product);
  const item = getDashboardProduct(product);

  return (
<section
  className="
    relative
    isolate
    h-[540px]
    overflow-hidden
    rounded-[28px]
    border
    border-gray-200
    bg-[#062d1c]
    shadow-[0_20px_70px_rgba(0,104,56,0.14)]
    sm:h-[520px]
    lg:h-[400px]
    xl:h-[420px]
  "
>
  {/* ------------------------------------------------------------------ */}
  {/* BACKGROUND DECORATION                                              */}
  {/* ------------------------------------------------------------------ */}

  <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#00a85a]/20 blur-3xl" />

  <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#006838]/30 blur-3xl" />

  {/* ------------------------------------------------------------------ */}
  {/* MAIN GRID                                                          */}
  {/* ------------------------------------------------------------------ */}

  <div className="relative grid h-full min-h-0 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
    {/* ================================================================ */}
    {/* LEFT / INFORMATION                                               */}
    {/* ================================================================ */}

    <div
      className="
        grid
        h-full
        min-h-0
        grid-rows-[auto_minmax(0,1fr)_auto_auto]
        overflow-hidden
        p-6
        sm:p-8
        md:p-10
      "
    >
      {/* -------------------------------------------------------------- */}
      {/* TOP                                                              */}
      {/* -------------------------------------------------------------- */}

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7CFFB2]" />

            Featured Product
          </span>

          {category && (
            <span className="max-w-[160px] truncate rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/70">
              {category}
            </span>
          )}
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CFFB2]">
          Discover something worth buying
        </p>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* CONTENT                                                         */}
      {/* -------------------------------------------------------------- */}

      <div className="flex min-h-0 flex-col justify-center overflow-hidden pr-1">
        <h2
          className="
            line-clamp-2
            overflow-hidden
            text-3xl
            font-black
            leading-[1.05]
            tracking-tight
            text-white
            sm:text-4xl
            md:text-5xl
          "
        >
          {item.name || "Featured Product"}
        </h2>

        {/* {item.description && (
          <p
            className="
              mt-4
              line-clamp-2
              max-w-2xl
              overflow-hidden
              text-sm
              leading-6
              text-white/65
              sm:text-base
            "
          >
            {item.description}
          </p>
        )} */}
      </div>

      {/* -------------------------------------------------------------- */}
      {/* PRICE + CTA                                                     */}
      {/* -------------------------------------------------------------- */}

      <div className="flex shrink-0 flex-wrap items-center gap-3 pt-2">
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.08]
            px-4
            py-1
            backdrop-blur-md
          "
        >
          {/* <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
            Price
          </p> */}

          <p className="mt-1 whitespace-nowrap text-lg font-bold text-white sm:text-xl">
            {formatPrice(item.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenProduct(product)}
          className="
            inline-flex
            h-[40px]
            items-center
            gap-2
            rounded-2xl
            bg-white
            px-5
            text-sm
            font-bold
            text-[#006838]
            shadow-lg
            transition
            hover:-translate-y-0.5
            hover:bg-[#f5fff9]
            hover:shadow-xl
          "
        >
          View product

          <Icon
            icon="mdi:arrow-top-right"
            className="text-lg"
          />
        </button>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* CONTROLS                                                        */}
      {/* -------------------------------------------------------------- */}

      <div className="flex items-center justify-between pt-2">
        {/* Dots */}

        <div className="flex items-center gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show featured product ${index + 1}`}
              aria-current={
                index === activeIndex
                  ? "true"
                  : undefined
              }
              onClick={() => onSelect(index)}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  index === activeIndex
                    ? "w-8 bg-[#7CFFB2]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }
              `}
            />
          ))}
        </div>

        {/* Previous / Next */}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous featured product"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/10
              text-white
              backdrop-blur
              transition
              hover:bg-white/20
            "
          >
            <Icon icon="mdi:arrow-left" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next featured product"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/10
              text-white
              backdrop-blur
              transition
              hover:bg-white/20
            "
          >
            <Icon icon="mdi:arrow-right" />
          </button>
        </div>
      </div>
    </div>

    {/* ================================================================ */}
    {/* RIGHT / IMAGE                                                     */}
    {/* ================================================================ */}

    <div
      className="
        relative
        hidden
        h-full
        min-h-0
        overflow-hidden
        border-l
        border-white/10
        lg:block
      "
    >
      {/* Image */}
      {image ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        >
          {/* Left blend */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#062d1c] via-[#062d1c]/45 to-transparent" />

          {/* Bottom blend */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#062d1c]/80 via-transparent to-transparent" />

          {/* Overall subtle tint */}
          <div className="absolute inset-0 bg-[#006838]/5" />
        </div>
      ) : (
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-[#0d4d31]
            via-[#006838]
            to-[#003d21]
          "
        >
          <div className="flex h-32 w-32 items-center justify-center rounded-[32px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
            <Icon
              icon="mdi:shopping-outline"
              className="text-6xl text-white/80"
            />
          </div>
        </div>
      )}

      {/* Spotlight counter */}

      <div
        className="
          absolute
          bottom-5
          right-5
          rounded-2xl
          border
          border-white/10
          bg-black/20
          px-4
          py-3
          backdrop-blur-xl
        "
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">
          Spotlight
        </p>

        <p className="mt-1 text-sm font-bold text-white">
          {activeIndex + 1} / {products.length}
        </p>
      </div>
    </div>
  </div>
</section>
  );
};

/* -------------------------------------------------------------------------- */
/*                              QUICK STAT CARD                               */
/* -------------------------------------------------------------------------- */

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  helper: string;
}

const StatCard = ({
  icon,
  label,
  value,
  helper,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-gray-500">
            {label}
          </p>

          <p className="mt-1 text-2xl font-black tracking-tight text-gray-900">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-gray-400">
            {helper}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10">
          <Icon
            icon={icon}
            className="text-xl text-[#006838]"
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                             LOADING SKELETON                               */
/* -------------------------------------------------------------------------- */

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-[340px] animate-pulse rounded-[28px] bg-gray-100" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
          >
            <div className="h-48 animate-pulse bg-gray-100" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-8 w-1/2 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN DASHBOARD                               */
/* -------------------------------------------------------------------------- */

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mainTab = searchParams.get("main") || "products";

  const [activeTab, setActiveTab] =
    useState(mainTab);

  const [products, setProducts] = useState<ProductT[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [searchQuery, setSearchQuery] =
    useState("");

  const deferredSearchQuery =
    useDeferredValue(searchQuery);

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [sortOption, setSortOption] =
    useState<SortOption>("recommended");

  const [visibleCount, setVisibleCount] = useState(
    INITIAL_PRODUCT_LIMIT
  );

  const [spotlightProducts, setSpotlightProducts] =
    useState<ProductT[]>([]);

  const [spotlightIndex, setSpotlightIndex] =
    useState(0);

  const [isSpotlightPaused, setIsSpotlightPaused] =
    useState(false);

  const searchInputRef =
    useRef<HTMLInputElement>(null);

  /* ------------------------------------------------------------------------ */
  /*                              TAB SYNC                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    setActiveTab(mainTab);
  }, [mainTab]);

  /* ------------------------------------------------------------------------ */
  /*                           FETCH PRODUCTS                                 */
  /* ------------------------------------------------------------------------ */

  const fetchProducts = useCallback(
    async (showRefreshing = false) => {
      try {
        if (showRefreshing) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setFetchError("");

        const token =
          localStorage.getItem("userToken");

        const response = await axios.get("products", {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });

        const responseData = response?.data;

        let fetchedProducts: ProductT[] = [];

        if (Array.isArray(responseData)) {
          fetchedProducts = responseData;
        } else if (
          Array.isArray(responseData?.products)
        ) {
          fetchedProducts = responseData.products;
        } else if (
          Array.isArray(responseData?.data)
        ) {
          fetchedProducts = responseData.data;
        }

        setProducts(fetchedProducts);

        /* Randomly select products for the spotlight */
        const randomProducts = shuffleProducts(
          fetchedProducts
        ).slice(0, MAX_SPOTLIGHT_PRODUCTS);

        setSpotlightProducts(randomProducts);
        setSpotlightIndex(0);
      } catch (error) {
        console.error(
          "Failed to fetch products:",
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

        const status =
          axiosError?.response?.status;

        const message =
          axiosError?.response?.data?.message;

        if (
          status === 401 ||
          message === "Unauthorized access"
        ) {
          await Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "Log In",
            confirmButtonColor: "#006838",
          });

          localStorage.removeItem("userToken");
          window.location.replace(
            "/auth/login"
          );

          return;
        }

        setFetchError(
          "We couldn't load the marketplace right now. Please try again."
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
  /*                         KEYBOARD SEARCH SHORTCUT                         */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target =
        event.target as HTMLElement | null;

      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (
        event.key === "/" &&
        !isTyping
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (
        event.key === "Escape" &&
        document.activeElement ===
          searchInputRef.current
      ) {
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener(
      "keydown",
      handleShortcut
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleShortcut
      );
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                         SPOTLIGHT AUTO ROTATION                          */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (
      spotlightProducts.length <= 1 ||
      isSpotlightPaused
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setSpotlightIndex((current) =>
        current + 1 >= spotlightProducts.length
          ? 0
          : current + 1
      );
    }, SPOTLIGHT_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    spotlightProducts.length,
    isSpotlightPaused,
  ]);

  /* ------------------------------------------------------------------------ */
  /*                              NEW ARRIVALS                                */
  /* ------------------------------------------------------------------------ */

  const newArrivals = useMemo(() => {
    return [...products]
      .filter((product) =>
        compareDate(
          getDashboardProduct(product).createdAt
        )
      )
      .sort((a, b) => {
        const dateA = new Date(
          getDashboardProduct(a).createdAt || 0
        ).getTime();

        const dateB = new Date(
          getDashboardProduct(b).createdAt || 0
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 8);
  }, [products]);

  /* ------------------------------------------------------------------------ */
  /*                              CATEGORIES                                  */
  /* ------------------------------------------------------------------------ */

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    products.forEach((product) => {
      const category =
        getProductCategory(product);

      if (!category) {
        return;
      }

      const normalized = category.trim();

      counts.set(
        normalized,
        (counts.get(normalized) || 0) + 1
      );
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [products]);

  /* ------------------------------------------------------------------------ */
  /*                           LIVE PRODUCT FILTER                            */
  /* ------------------------------------------------------------------------ */

  const filteredProducts = useMemo(() => {
    const query =
      normalizeSearchText(
        deferredSearchQuery
      );

    let results = [...products];

    /* Search */
    if (query) {
      results = results.filter((product) => {
        const item =
          getDashboardProduct(product);

        const name = normalizeSearchText(
          String(item.name || "")
        );

        const description =
          normalizeSearchText(
            String(item.description || "")
          );

        const category =
          normalizeSearchText(
            getProductCategory(product)
          );

        const searchableText =
          `${name} ${description} ${category}`;

        return searchableText.includes(query);
      });
    }

    /* Category */
    if (selectedCategory !== "all") {
      results = results.filter((product) => {
        return (
          normalizeText(
            getProductCategory(product)
          ) ===
          normalizeText(selectedCategory)
        );
      });
    }

    /* Sort */
    switch (sortOption) {
      case "newest":
        results.sort((a, b) => {
          const dateA = new Date(
            getDashboardProduct(a)
              .createdAt || 0
          ).getTime();

          const dateB = new Date(
            getDashboardProduct(b)
              .createdAt || 0
          ).getTime();

          return dateB - dateA;
        });
        break;

      case "price-low":
        results.sort((a, b) => {
          return (
            Number(
              getDashboardProduct(a).price || 0
            ) -
            Number(
              getDashboardProduct(b).price || 0
            )
          );
        });
        break;

      case "price-high":
        results.sort((a, b) => {
          return (
            Number(
              getDashboardProduct(b).price || 0
            ) -
            Number(
              getDashboardProduct(a).price || 0
            )
          );
        });
        break;

      case "name":
        results.sort((a, b) =>
          String(
            getDashboardProduct(a).name || ""
          ).localeCompare(
            String(
              getDashboardProduct(b).name || ""
            )
          )
        );
        break;

      case "recommended":
      default:
        break;
    }

    return results;
  }, [
    products,
    deferredSearchQuery,
    selectedCategory,
    sortOption,
  ]);

  /* ------------------------------------------------------------------------ */
  /*                              STATS                                       */
  /* ------------------------------------------------------------------------ */

  const marketplaceStats = useMemo(() => {
    const totalCategories = new Set(
      products
        .map((product) =>
          getProductCategory(product)
        )
        .filter(Boolean)
        .map((category) =>
          normalizeText(category)
        )
    ).size;

    return {
      products: products.length,
      newArrivals: newArrivals.length,
      categories: totalCategories,
      searchable: filteredProducts.length,
    };
  }, [
    products,
    newArrivals,
    filteredProducts.length,
  ]);

  /* ------------------------------------------------------------------------ */
  /*                          VISIBLE PRODUCTS                                */
  /* ------------------------------------------------------------------------ */

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(
      0,
      visibleCount
    );
  }, [filteredProducts, visibleCount]);

  useEffect(() => {
    setVisibleCount(INITIAL_PRODUCT_LIMIT);
  }, [
    deferredSearchQuery,
    selectedCategory,
    sortOption,
  ]);

  /* ------------------------------------------------------------------------ */
  /*                         SPOTLIGHT CONTROLS                               */
  /* ------------------------------------------------------------------------ */

  const handleSpotlightNext = () => {
    setSpotlightIndex((current) =>
      current + 1 >= spotlightProducts.length
        ? 0
        : current + 1
    );
  };

  const handleSpotlightPrevious = () => {
    setSpotlightIndex((current) =>
      current - 1 < 0
        ? spotlightProducts.length - 1
        : current - 1
    );
  };

  const openProduct = (product: ProductT) => {
    const id = getProductId(product);

    if (!id) {
      return;
    }

    router.push(
      `/dashboard/Product?id=${encodeURIComponent(id)}`
    );
  };

  /* ------------------------------------------------------------------------ */
  /*                             CLEAR SEARCH                                 */
  /* ------------------------------------------------------------------------ */

  const clearDiscoveryFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortOption("recommended");
  };

  /* ------------------------------------------------------------------------ */
  /*                                RENDER                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-[#f7f9f8]">
      {/* ------------------------------------------------------------------ */}
      {/* GLOBAL SHELL                                                      */}
      {/* ------------------------------------------------------------------ */}

      <div className="mx-auto w-full max-w-[1500px] px-4 py-4 md:px-6 lg:px-8">
        <Header />

        <div className="mt-4">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT                                                          */}
        {/* ---------------------------------------------------------------- */}

        {loading ? (
          <div className="py-8">
            <DashboardSkeleton />
          </div>
        ) : activeTab === "products" ? (
          <div className="mt-6 space-y-8 pb-24">
            {/* ------------------------------------------------------------ */}
            {/* SPOTLIGHT                                                     */}
            {/* ------------------------------------------------------------ */}

            {spotlightProducts.length > 0 && (
              <div
                onMouseEnter={() =>
                  setIsSpotlightPaused(true)
                }
                onMouseLeave={() =>
                  setIsSpotlightPaused(false)
                }
              >
                <ProductSpotlight
                  products={spotlightProducts}
                  activeIndex={spotlightIndex}
                  onNext={handleSpotlightNext}
                  onPrevious={
                    handleSpotlightPrevious
                  }
                  onSelect={(index) =>
                    setSpotlightIndex(index)
                  }
                  onOpenProduct={openProduct}
                />
              </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* WELCOME / ACTION BAR                                          */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#006838]" />

                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#006838]">
                      Explore NaijaZone
                    </p>
                  </div>

                  <h2 className="mt-2 text-xl font-black tracking-tight text-gray-900 md:text-2xl">
                    Discover products from local
                    businesses
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Search, filter and discover
                    products available from verified
                    businesses across the marketplace.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "./dashboard/search-product"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#006838]/30 hover:bg-[#006838]/5 hover:text-[#006838]"
                  >
                    <Icon
                      icon="mdi:magnify"
                      className="text-lg"
                    />
                    Advanced search
                  </button>

                  {/* <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "./dashboard/add-item"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-[#006838] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00542d]"
                  >
                    <Icon
                      icon="mdi:plus"
                      className="text-lg"
                    />
                    Add item
                  </button> */}
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* MARKETPLACE STATS                                             */}
            {/* ------------------------------------------------------------ */}

            <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              <StatCard
                icon="mdi:package-variant-closed"
                label="Available products"
                value={marketplaceStats.products}
                helper="Currently discoverable"
              />

              <StatCard
                icon="mdi:sparkles"
                label="New this week"
                value={
                  marketplaceStats.newArrivals
                }
                helper="Added within 7 days"
              />

              {/* <StatCard
                icon="mdi:shape-outline"
                label="Categories"
                value={
                  marketplaceStats.categories
                }
                helper="Product categories"
              /> */}

              <StatCard
                icon="mdi:filter-outline"
                label="Matches"
                value={
                  deferredSearchQuery ||
                  selectedCategory !== "all"
                    ? marketplaceStats.searchable
                    : marketplaceStats.products
                }
                helper="Current discovery results"
              />
            </section>

            {/* ------------------------------------------------------------ */}
            {/* DISCOVERY SEARCH                                              */}
            {/* ------------------------------------------------------------ */}

            <section className="sticky top-2 z-20 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg shadow-gray-200/30 backdrop-blur md:p-4">
              <div className="flex flex-col gap-3 xl:flex-row">
                <div className="relative flex-1">
                  <Icon
                    icon="mdi:magnify"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400"
                  />

                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement>
                    ) =>
                      setSearchQuery(
                        event.target.value
                      )
                    }
                    placeholder="Search products, descriptions or categories..."
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#006838] focus:bg-white focus:ring-4 focus:ring-[#006838]/5"
                    autoComplete="off"
                  />

                  <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-semibold text-gray-400 sm:block">
                    /
                  </span>

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() =>
                        setSearchQuery("")
                      }
                      className="absolute right-12 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                      aria-label="Clear search"
                    >
                      <Icon icon="mdi:close" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    value={sortOption}
                    onChange={(event) =>
                      setSortOption(
                        event.target
                          .value as SortOption
                      )
                    }
                    className="h-12 min-w-[180px] rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-[#006838] focus:bg-white"
                  >
                    <option value="recommended">
                      Recommended
                    </option>

                    <option value="newest">
                      Newest first
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="name">
                      Name: A-Z
                    </option>
                  </select>

                  {(searchQuery ||
                    selectedCategory !==
                      "all") && (
                    <button
                      type="button"
                      onClick={
                        clearDiscoveryFilters
                      }
                      className="h-12 rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="mt-3 overflow-x-auto">
                  <div className="flex min-w-max gap-2 pb-1">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCategory(
                          "all"
                        )
                      }
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        selectedCategory ===
                        "all"
                          ? "bg-[#006838] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      All products
                    </button>

                    {categories.map(
                      ([category, count]) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() =>
                            setSelectedCategory(
                              category
                            )
                          }
                          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                            normalizeText(
                              selectedCategory
                            ) ===
                            normalizeText(category)
                              ? "bg-[#006838] text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                          <span className="ml-1 opacity-60">
                            {count}
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* ------------------------------------------------------------ */}
            {/* NEW ARRIVALS                                                  */}
            {/* ------------------------------------------------------------ */}

            {!searchQuery &&
              selectedCategory === "all" &&
              newArrivals.length > 0 && (
                <section>
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="mdi:sparkles"
                          className="text-lg text-[#006838]"
                        />

                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#006838]">
                          Fresh picks
                        </p>
                      </div>

                      <h2 className="mt-1 text-xl font-black text-gray-900 md:text-2xl">
                        New Arrivals
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Products added to the
                        marketplace recently.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSortOption("newest")
                      }
                      className="hidden items-center gap-1 text-sm font-semibold text-[#006838] sm:flex"
                    >
                      View newest
                      <Icon icon="mdi:arrow-right" />
                    </button>
                  </div>

                  <ProductGrid
                    link="new-arrivals"
                    title=""
                    products={newArrivals}
                  />
                </section>
              )}

            {/* ------------------------------------------------------------ */}
            {/* ALL PRODUCTS / SEARCH RESULTS                                 */}
            {/* ------------------------------------------------------------ */}

            <section id="available-products">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={
                        searchQuery ||
                        selectedCategory !==
                          "all"
                          ? "mdi:filter-check-outline"
                          : "mdi:storefront-outline"
                      }
                      className="text-lg text-[#006838]"
                    />

                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#006838]">
                      {searchQuery ||
                      selectedCategory !==
                        "all"
                        ? "Filtered discovery"
                        : "Marketplace"}
                    </p>
                  </div>

                  <h2 className="mt-1 text-xl font-black text-gray-900 md:text-2xl">
                    {searchQuery
                      ? `Results for "${searchQuery}"`
                      : selectedCategory !==
                        "all"
                      ? selectedCategory
                      : "Available Products"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}{" "}
                    available
                  </p>
                </div>

                {filteredProducts.length >
                  visibleProducts.length && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount(
                        (current) =>
                          current +
                          LOAD_MORE_COUNT
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#006838]/20 bg-[#006838]/5 px-4 py-2.5 text-sm font-semibold text-[#006838] transition hover:bg-[#006838]/10"
                  >
                    Load more
                    <Icon icon="mdi:chevron-down" />
                  </button>
                )}
              </div>

              {fetchError && !products.length ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-red-100 bg-red-50 px-6 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <Icon
                      icon="mdi:cloud-alert-outline"
                      className="text-3xl text-red-500"
                    />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    Marketplace unavailable
                  </h3>

                  <p className="mt-2 max-w-md text-sm text-gray-500">
                    {fetchError}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      fetchProducts()
                    }
                    className="mt-5 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
                  >
                    Try again
                  </button>
                </div>
              ) : filteredProducts.length >
                0 ? (
                <>
                  <ProductGrid
                    link="available-products"
                    title=""
                    products={visibleProducts}
                  />

                  {filteredProducts.length >
                    visibleProducts.length && (
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCount(
                            (current) =>
                              current +
                              LOAD_MORE_COUNT
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-[#006838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
                      >
                        Load more products
                        <Icon icon="mdi:arrow-down" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                    <Icon
                      icon={
                        searchQuery
                          ? "mdi:magnify-close"
                          : "mdi:package-variant-remove"
                      }
                      className="text-4xl text-gray-400"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-gray-900">
                    {searchQuery
                      ? "No matching products"
                      : "No products available"}
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                    {searchQuery
                      ? `We couldn't find any products matching "${searchQuery}". Try another keyword or browse all categories.`
                      : "There are currently no products available in the marketplace."}
                  </p>

                  {(searchQuery ||
                    selectedCategory !==
                      "all") && (
                    <button
                      type="button"
                      onClick={
                        clearDiscoveryFilters
                      }
                      className="mt-5 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
                    >
                      Browse all products
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* ------------------------------------------------------------ */}
            {/* REFRESH                                                      */}
            {/* ------------------------------------------------------------ */}

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() =>
                  fetchProducts(true)
                }
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-[#006838]/20 hover:text-[#006838] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon
                  icon="mdi:refresh"
                  className={`text-lg ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }`}
                />

                {refreshing
                  ? "Refreshing..."
                  : "Refresh marketplace"}
              </button>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* FLOATING ACTION                                              */}
            {/* ------------------------------------------------------------ */}

            {/* <FloatingButton
              color="bg-[#006838]"
              onClick={() =>
                router.push(
                  "./dashboard/add-item"
                )
              }
            /> */}
          </div>
        ) : (
          <div className="mt-6 pb-24">
            {/* <FloatingButton /> */}
            <Services />
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               PAGE WRAPPER                                 */
/* -------------------------------------------------------------------------- */

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f9f8]">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#006838]/10">
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#006838] border-t-transparent" />
            </div>

            <p className="text-sm font-medium text-gray-500">
              Loading marketplace...
            </p>
          </div>
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
};

export default Page;