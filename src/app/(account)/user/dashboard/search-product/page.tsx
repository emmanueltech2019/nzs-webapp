// 'use client'
// import React, { useEffect, useState } from 'react';
// import { Icon } from '@iconify/react';
// import { ProductT } from '@/types/Product.types';
// import axios from "@/utils/axios";
// import Link from 'next/link';

// const page = () => {

//     const [products, setProducts] = useState<ProductT[]>([]);
//     // State to hold the user's search query
//     const [searchQuery, setSearchQuery] = useState('');
//     // State for loading status
//     const [loading, setLoading] = useState(true);
//     // State for error handling
//     const [error, setError] = useState<string>('');
//     const [collectedProducts, setCollectedProducts] = useState<ProductT[]>([]);

//     const [recentSearched, setRecentSearched] = useState<string[]>([]);

//     // Fetch all products when the component mounts
//     useEffect(() => {
//         axios({
//             method: "GET",
//             url: "products",
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             },
//         })
//         .then((res) => {
//             setProducts(res.data);
//             setLoading(false);
//         })
//         .catch((err) => {
//             console.error("Error fetching products:", err);
//             setError("Failed to load products. Please try again later.");
//             setLoading(false);
//         });

//         const storedSearches = localStorage.getItem('recentlySearched');
//         if(storedSearches) {
//             setRecentSearched(JSON.parse(storedSearches))
//         }
//     }, []);

//     useEffect(() => {
//         if(recentSearched.length > 0) {
//             localStorage.setItem('recentlySearched', JSON.stringify(recentSearched))
//         }
//     }, [recentSearched])

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(e.target.value);
//     }

//     const handleSearchTrigger = () => {
//         const filteredProducts = products.filter(product =>
//             product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setCollectedProducts(filteredProducts);
//         setRecentSearched(prev => [...prev.filter(items => items !== searchQuery), searchQuery]);
//         setSearchQuery('')
//     }

//     const handleDeleteSearch = (query: string) => {
//         setRecentSearched(search => search.filter((item) => item !== query));
//         setSearchQuery('')
//         setCollectedProducts([])
//     }

//     const handleSearchedItemClick = (save: string) => {
//         setSearchQuery(save)
//         const filteredProducts = products.filter(product => product.name.toLowerCase().includes(save.toLowerCase()));
//         setRecentSearched(prev => [...prev.filter(items => items !== save), save])
//         setCollectedProducts(filteredProducts)
//     }
    
//   return (
//     <div className='md:p-10 p-5 flex justify-center items-center flex-col gap-2'>
//         <div className="flex items-center gap-3 w-full">
//             <label htmlFor="search" className='sr-only'>Search Products</label>
//             <input onKeyDown={(e) => { if (e.key === 'Enter') handleSearchTrigger(); }} onChange={handleInputChange} type="search" id="search" placeholder='Search Products...' className='border border-gray-300 rounded-md p-2 w-full outline-none' value={searchQuery} />
//             <button onClick={handleSearchTrigger} className="bg-[#006838] text-white rounded-md p-2">Search</button>
//         </div>
//         <div className="w-full overflow-x-auto py-2 px-3">
//             {recentSearched.length > 0 && (
//                 <ul className='flex gap-3'>
//                     {recentSearched.map((query, index) => (
//                         <li onClick={() => handleSearchedItemClick(query)} key={index} className="py-1 bg-white flex gap-2 items-center shadow px-3 text-[12px] rounded-xl">{query} <Icon icon="mdi:times" className="cursor-pointer" style={{color: 'red',}} onClick={(e) =>{e.stopPropagation();  handleDeleteSearch(query)}} /></li>
//                     ))}
//                 </ul>
//             )}
//         </div>

//         {loading ? (
//             <p>Loading products...</p>
//         ) : error ? (
//             <p className="text-red-500">{error}</p>
//         ) : collectedProducts.length > 0 ? (
//             <div className='mt-5 grid grid-cols-1 md:grid-cols-3 gap-4'>
//                 {collectedProducts.map(product => (
//                     <Link href={`../dashboard/Product?id=${product._id}`}>
//                         <div key={product._id} className='border p-4 rounded-md'>
//                             <h2 className='text-lg font-semibold'>{product.name}</h2>
//                             <p>{product.description}</p>
//                             <p className='text-green-600'>${product.price}</p>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         ) : (
//             <p>No products found.</p>
//         )}
                        
//     </div>
//   )
// }

// export default page
// "use client";

// import React, {
//   ChangeEvent,
//   KeyboardEvent,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { Icon } from "@iconify/react";
// import Link from "next/link";
// import { ProductT } from "@/types/Product.types";
// import axios from "@/utils/axios";

// const RECENT_SEARCH_KEY = "recentlySearched";
// const MAX_RECENT_SEARCHES = 8;

// const normalizeText = (value: string): string => {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^\w\s]/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();
// };

// const normalizeToken = (value: string): string => {
//   const token = normalizeText(value);

//   // Helps match:
//   // gown -> gowns
//   // shoe -> shoes
//   // bag -> bags
//   if (token.length > 3 && token.endsWith("s")) {
//     return token.slice(0, -1);
//   }

//   return token;
// };

// const levenshteinDistance = (a: string, b: string): number => {
//   if (a === b) return 0;
//   if (!a.length) return b.length;
//   if (!b.length) return a.length;

//   const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
//     Array(b.length + 1).fill(0)
//   );

//   for (let i = 0; i <= a.length; i++) {
//     matrix[i][0] = i;
//   }

//   for (let j = 0; j <= b.length; j++) {
//     matrix[0][j] = j;
//   }

//   for (let i = 1; i <= a.length; i++) {
//     for (let j = 1; j <= b.length; j++) {
//       const cost = a[i - 1] === b[j - 1] ? 0 : 1;

//       matrix[i][j] = Math.min(
//         matrix[i - 1][j] + 1,
//         matrix[i][j - 1] + 1,
//         matrix[i - 1][j - 1] + cost
//       );
//     }
//   }

//   return matrix[a.length][b.length];
// };

// const getProductSearchScore = (
//   product: ProductT,
//   query: string
// ): number => {
//   const normalizedQuery = normalizeText(query);

//   if (!normalizedQuery) return 0;

//   const rawName = String(product.name ?? "");
//   const rawDescription = String(product.description ?? "");

//   const name = normalizeText(rawName);
//   const description = normalizeText(rawDescription);

//   const combinedText = `${name} ${description}`;

//   // Strongest match: exact phrase.
//   if (name === normalizedQuery) {
//     return 1000;
//   }

//   if (name.startsWith(normalizedQuery)) {
//     return 900;
//   }

//   if (name.includes(normalizedQuery)) {
//     return 800;
//   }

//   if (combinedText.includes(normalizedQuery)) {
//     return 700;
//   }

//   const queryTokens = normalizedQuery
//     .split(" ")
//     .map(normalizeToken)
//     .filter(Boolean);

//   const searchableTokens = combinedText
//     .split(" ")
//     .map(normalizeToken)
//     .filter(Boolean);

//   if (!queryTokens.length || !searchableTokens.length) {
//     return 0;
//   }

//   let matchedTokens = 0;
//   let score = 0;

//   for (const queryToken of queryTokens) {
//     let bestTokenScore = 0;

//     for (const productToken of searchableTokens) {
//       if (productToken === queryToken) {
//         bestTokenScore = Math.max(bestTokenScore, 500);
//         continue;
//       }

//       if (
//         productToken.startsWith(queryToken) ||
//         queryToken.startsWith(productToken)
//       ) {
//         bestTokenScore = Math.max(bestTokenScore, 400);
//         continue;
//       }

//       if (
//         productToken.includes(queryToken) ||
//         queryToken.includes(productToken)
//       ) {
//         bestTokenScore = Math.max(bestTokenScore, 300);
//         continue;
//       }

//       const distance = levenshteinDistance(queryToken, productToken);

//       // Allow minor spelling mistakes.
//       const maxDistance =
//         queryToken.length <= 4 ? 1 : queryToken.length <= 7 ? 2 : 3;

//       if (distance <= maxDistance) {
//         bestTokenScore = Math.max(
//           bestTokenScore,
//           250 - distance * 25
//         );
//       }
//     }

//     if (bestTokenScore > 0) {
//       matchedTokens += 1;
//       score += bestTokenScore;
//     }
//   }

//   // Prefer products that match every search term.
//   if (matchedTokens === queryTokens.length) {
//     score += 150;
//   }

//   return score;
// };

// const SearchPage = () => {
//   const [products, setProducts] = useState<ProductT[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [recentSearched, setRecentSearched] = useState<string[]>([]);
//   const [isFocused, setIsFocused] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const token = localStorage.getItem("userToken");

//         const response = await axios.get("products", {
//           headers: token
//             ? {
//                 Authorization: `Bearer ${token}`,
//               }
//             : undefined,
//         });
//         console.log("response.data.products", response.data.products);
//         const fetchedProducts = Array.isArray(response.data.products)
//           ? response.data
//           : [];

//         setProducts(fetchedProducts);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError(
//           "We couldn't load the products right now. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();

//     try {
//       const storedSearches =
//         localStorage.getItem(RECENT_SEARCH_KEY);

//       if (storedSearches) {
//         const parsed = JSON.parse(storedSearches);

//         if (Array.isArray(parsed)) {
//           setRecentSearched(
//             parsed
//               .filter(
//                 (item): item is string =>
//                   typeof item === "string" && item.trim().length > 0
//               )
//               .slice(0, MAX_RECENT_SEARCHES)
//           );
//         }
//       }
//     } catch (err) {
//       console.error("Failed to read recent searches:", err);
//       localStorage.removeItem(RECENT_SEARCH_KEY);
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       if (recentSearched.length > 0) {
//         localStorage.setItem(
//           RECENT_SEARCH_KEY,
//           JSON.stringify(recentSearched)
//         );
//       } else {
//         localStorage.removeItem(RECENT_SEARCH_KEY);
//       }
//     } catch (err) {
//       console.error("Failed to save recent searches:", err);
//     }
//   }, [recentSearched]);

//   /**
//    * LIVE SEARCH
//    *
//    * Every time searchQuery changes, filteredProducts
//    * recalculates automatically.
//    */
//   const filteredProducts = useMemo(() => {
//     const query = searchQuery.trim();

//     if (!query) {
//       return [];
//     }
//     console.log("products", products);
//     return products
//       .map((product) => ({
//         product,
//         score: getProductSearchScore(product, query),
//       }))
//       .filter((item) => item.score > 0)
//       .sort((a, b) => {
//         if (b.score !== a.score) {
//           return b.score - a.score;
//         }

//         return String(a.product.name ?? "").localeCompare(
//           String(b.product.name ?? "")
//         );
//       })
//       .map((item) => item.product);
//   }, [products, searchQuery]);

//   const addToRecentSearches = (query: string) => {
//     const cleanedQuery = query.trim();

//     if (!cleanedQuery) return;

//     setRecentSearched((previous) => {
//       const updated = [
//         cleanedQuery,
//         ...previous.filter(
//           (item) =>
//             normalizeText(item) !== normalizeText(cleanedQuery)
//         ),
//       ];

//       return updated.slice(0, MAX_RECENT_SEARCHES);
//     });
//   };

//   const handleInputChange = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//   };

//   const handleSearchSubmit = () => {
//     if (!searchQuery.trim()) return;

//     addToRecentSearches(searchQuery);
//   };

//   const handleInputKeyDown = (
//     event: KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       handleSearchSubmit();
//     }

//     if (event.key === "Escape") {
//       handleClearSearch();
//     }
//   };

//   const handleRecentSearchClick = (query: string) => {
//     setSearchQuery(query);
//     addToRecentSearches(query);
//   };

//   const handleDeleteSearch = (
//     event: React.MouseEvent,
//     query: string
//   ) => {
//     event.stopPropagation();

//     setRecentSearched((previous) =>
//       previous.filter(
//         (item) =>
//           normalizeText(item) !== normalizeText(query)
//       )
//     );
//   };

//   const handleClearRecentSearches = () => {
//     setRecentSearched([]);
//   };

//   const formatPrice = (price: unknown) => {
//     const numericPrice = Number(price);

//     if (Number.isNaN(numericPrice)) {
//       return String(price ?? "");
//     }

//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       maximumFractionDigits: 2,
//     }).format(numericPrice);
//   };

//   return (
//     <main className="min-h-screen bg-[#f7f9f8] px-4 py-6 md:px-8 md:py-10">
//       <div className="mx-auto w-full max-w-6xl">
//         {/* Header */}
//         <div className="mb-7">
//           <div className="mb-2 flex items-center gap-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10">
//               <Icon
//                 icon="mdi:magnify"
//                 className="text-2xl text-[#006838]"
//               />
//             </div>

//             <p className="text-sm font-semibold uppercase tracking-wider text-[#006838]">
//               Product Search
//             </p>
//           </div>

//           <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
//             Find exactly what you&apos;re looking for
//           </h1>

//           <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
//             Search by product name or description. Results update
//             automatically as you type.
//           </p>
//         </div>

//         {/* Search Box */}
//         <div
//           className={`rounded-2xl border bg-white p-3 shadow-sm transition-all ${
//             isFocused
//               ? "border-[#006838] shadow-[0_0_0_4px_rgba(0,104,56,0.08)]"
//               : "border-gray-200"
//           }`}
//         >
//           <div className="flex flex-col gap-3 sm:flex-row">
//             <div className="relative flex-1">
//               <Icon
//                 icon="mdi:magnify"
//                 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400"
//               />

//               <label htmlFor="product-search" className="sr-only">
//                 Search Products
//               </label>

//               <input
//                 id="product-search"
//                 type="search"
//                 value={searchQuery}
//                 onChange={handleInputChange}
//                 onKeyDown={handleInputKeyDown}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 placeholder="Search products, e.g. gown, shoes, phone..."
//                 autoComplete="off"
//                 spellCheck
//                 className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white"
//               />

//               {searchQuery && (
//                 <button
//                   type="button"
//                   onClick={handleClearSearch}
//                   aria-label="Clear search"
//                   className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
//                 >
//                   <Icon
//                     icon="mdi:close"
//                     className="text-lg"
//                   />
//                 </button>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={handleSearchSubmit}
//               disabled={!searchQuery.trim()}
//               className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#006838] px-6 text-sm font-semibold text-white transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               <Icon
//                 icon="mdi:magnify"
//                 className="text-xl"
//               />
//               Search
//             </button>
//           </div>

//           {/* Live search indicator */}
//           <div className="mt-3 flex items-center justify-between px-1">
//             <div className="flex items-center gap-2 text-xs text-gray-500">
//               <span
//                 className={`h-2 w-2 rounded-full ${
//                   searchQuery
//                     ? "bg-[#006838]"
//                     : "bg-gray-300"
//                 }`}
//               />
//               {searchQuery
//                 ? "Searching as you type..."
//                 : "Start typing to search"}
//             </div>

//             {searchQuery.trim() && !loading && (
//               <span className="text-xs font-medium text-gray-500">
//                 {filteredProducts.length}{" "}
//                 {filteredProducts.length === 1
//                   ? "result"
//                   : "results"}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Recent Searches */}
//         {recentSearched.length > 0 && (
//           <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
//             <div className="mb-4 flex items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-900">
//                   Recent searches
//                 </h2>

//                 <p className="mt-1 text-xs text-gray-500">
//                   Quickly return to something you searched before.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleClearRecentSearches}
//                 className="text-xs font-medium text-red-500 transition hover:text-red-600"
//               >
//                 Clear all
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {recentSearched.map((query) => (
//                 <button
//                   key={query}
//                   type="button"
//                   onClick={() =>
//                     handleRecentSearchClick(query)
//                   }
//                   className="group flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-[#006838]/30 hover:bg-[#006838]/5 hover:text-[#006838]"
//                 >
//                   <Icon
//                     icon="mdi:history"
//                     className="text-base text-gray-400 group-hover:text-[#006838]"
//                   />

//                   <span>{query}</span>

//                   <span
//                     role="button"
//                     tabIndex={0}
//                     aria-label={`Delete recent search ${query}`}
//                     onClick={(event) => {
//                       handleDeleteSearch(event, query);
//                     }}
//                     onKeyDown={(event) => {
//                       if (
//                         event.key === "Enter" ||
//                         event.key === " "
//                       ) {
//                         event.preventDefault();

//                         handleDeleteSearch(
//                           event as unknown as React.MouseEvent,
//                           query
//                         );
//                       }
//                     }}
//                     className="ml-1 rounded-full p-0.5 text-gray-400 transition hover:bg-red-100 hover:text-red-500"
//                   >
//                     <Icon
//                       icon="mdi:close"
//                       className="text-sm"
//                     />
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Content */}
//         <section className="mt-7">
//           {/* Loading */}
//           {loading && (
//             <div>
//               <div className="mb-4 h-5 w-32 animate-pulse rounded bg-gray-200" />

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {Array.from({ length: 8 }).map((_, index) => (
//                   <div
//                     key={index}
//                     className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
//                   >
//                     <div className="h-36 animate-pulse bg-gray-200" />

//                     <div className="space-y-3 p-4">
//                       <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
//                       <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
//                       <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Error */}
//           {!loading && error && (
//             <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-16 text-center">
//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
//                 <Icon
//                   icon="mdi:alert-circle-outline"
//                   className="text-3xl text-red-500"
//                 />
//               </div>

//               <h2 className="text-lg font-semibold text-gray-900">
//                 Something went wrong
//               </h2>

//               <p className="mt-2 max-w-md text-sm text-gray-500">
//                 {error}
//               </p>
//             </div>
//           )}

//           {/* Initial Empty State */}
//           {!loading && !error && !searchQuery.trim() && (
//             <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
//               <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#006838]/10">
//                 <Icon
//                   icon="mdi:text-search"
//                   className="text-4xl text-[#006838]"
//                 />
//               </div>

//               <h2 className="text-xl font-bold text-gray-900">
//                 What are you looking for?
//               </h2>

//               <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
//                 Start typing a product name or keyword above.
//                 The results will appear immediately.
//               </p>
//             </div>
//           )}

//           {/* No Results */}
//           {!loading &&
//             !error &&
//             searchQuery.trim() &&
//             filteredProducts.length === 0 && (
//               <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">
//                 <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
//                   <Icon
//                     icon="mdi:magnify-close"
//                     className="text-4xl text-gray-400"
//                   />
//                 </div>

//                 <h2 className="text-xl font-bold text-gray-900">
//                   No products found
//                 </h2>

//                 <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
//                   We couldn&apos;t find a product matching{" "}
//                   <span className="font-semibold text-gray-700">
//                     &quot;{searchQuery}&quot;
//                   </span>
//                   .
//                 </p>

//                 <button
//                   type="button"
//                   onClick={handleClearSearch}
//                   className="mt-6 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
//                 >
//                   Clear search
//                 </button>
//               </div>
//             )}

//           {/* Results */}
//           {!loading &&
//             !error &&
//             searchQuery.trim() &&
//             filteredProducts.length > 0 && (
//               <div>
//                 <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
//                   <div>
//                     <p className="text-sm font-semibold text-gray-900">
//                       Search results
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       Showing matches for &quot;
//                       {searchQuery}&quot;
//                     </p>
//                   </div>

//                   <p className="text-xs font-medium text-gray-500">
//                     {filteredProducts.length}{" "}
//                     {filteredProducts.length === 1
//                       ? "product"
//                       : "products"}{" "}
//                     found
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                   {filteredProducts.map((product) => (
//                     <Link
//                       key={product._id}
//                       href={`/dashboard/Product?id=${encodeURIComponent(
//                         String(product._id)
//                       )}`}
//                       onClick={() =>
//                         addToRecentSearches(searchQuery)
//                       }
//                       className="group block"
//                     >
//                       <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#006838]/20 hover:shadow-lg">
//                         {/* Product Placeholder */}
//                         <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-[#006838]/10 via-white to-gray-100">
//                           <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
//                             <Icon
//                               icon="mdi:shopping-outline"
//                               className="text-3xl text-[#006838]"
//                             />
//                           </div>

//                           <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#006838] shadow-sm">
//                             Product
//                           </div>
//                         </div>

//                         <div className="p-4">
//                           <div className="mb-2 flex items-start justify-between gap-3">
//                             <h3 className="line-clamp-2 text-base font-bold leading-6 text-gray-900 transition group-hover:text-[#006838]">
//                               {product.name}
//                             </h3>

//                             <Icon
//                               icon="mdi:arrow-top-right"
//                               className="shrink-0 text-lg text-gray-300 transition group-hover:text-[#006838]"
//                             />
//                           </div>

//                           {product.description && (
//                             <p className="line-clamp-2 text-sm leading-5 text-gray-500">
//                               {product.description}
//                             </p>
//                           )}

//                           <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
//                             <div>
//                               <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
//                                 Price
//                               </p>

//                               <p className="mt-0.5 text-lg font-bold text-[#006838]">
//                                 {formatPrice(product.price)}
//                               </p>
//                             </div>

//                             <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006838]/10 transition group-hover:bg-[#006838]">
//                               <Icon
//                                 icon="mdi:arrow-right"
//                                 className="text-lg text-[#006838] transition group-hover:text-white"
//                               />
//                             </span>
//                           </div>
//                         </div>
//                       </article>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default SearchPage;
"use client";

import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ProductT } from "@/types/Product.types";
import axios from "@/utils/axios";

const RECENT_SEARCH_KEY = "recentlySearched";
const MAX_RECENT_SEARCHES = 8;

/* -------------------------------------------------------------------------- */
/*                               SEARCH HELPERS                               */
/* -------------------------------------------------------------------------- */

const normalizeText = (value: string): string => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const normalizeToken = (value: string): string => {
  const token = normalizeText(value);

  if (token.length > 3 && token.endsWith("s")) {
    return token.slice(0, -1);
  }

  return token;
};

const levenshteinDistance = (a: string, b: string): number => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix: number[][] = Array.from(
    { length: a.length + 1 },
    () => Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

const getProductSearchScore = (
  product: ProductT,
  query: string
): number => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const rawName = String(product.name ?? "");
  const rawDescription = String(product.description ?? "");

  const name = normalizeText(rawName);
  const description = normalizeText(rawDescription);

  const combinedText = `${name} ${description}`;

  /* --------------------------- Exact name match -------------------------- */

  if (name === normalizedQuery) {
    return 1000;
  }

  /* ---------------------------- Name priority ---------------------------- */

  if (name.startsWith(normalizedQuery)) {
    return 900;
  }

  if (name.includes(normalizedQuery)) {
    return 800;
  }

  /* ------------------------- Description matching ------------------------ */

  if (combinedText.includes(normalizedQuery)) {
    return 700;
  }

  /* ----------------------------- Token search ---------------------------- */

  const queryTokens = normalizedQuery
    .split(" ")
    .map(normalizeToken)
    .filter(Boolean);

  const searchableTokens = combinedText
    .split(" ")
    .map(normalizeToken)
    .filter(Boolean);

  if (!queryTokens.length || !searchableTokens.length) {
    return 0;
  }

  let matchedTokens = 0;
  let score = 0;

  for (const queryToken of queryTokens) {
    let bestTokenScore = 0;

    for (const productToken of searchableTokens) {
      /* Exact token */
      if (productToken === queryToken) {
        bestTokenScore = Math.max(bestTokenScore, 500);
        continue;
      }

      /* Prefix matching */
      if (
        productToken.startsWith(queryToken) ||
        queryToken.startsWith(productToken)
      ) {
        bestTokenScore = Math.max(bestTokenScore, 400);
        continue;
      }

      /* Partial matching */
      if (
        productToken.includes(queryToken) ||
        queryToken.includes(productToken)
      ) {
        bestTokenScore = Math.max(bestTokenScore, 300);
        continue;
      }

      /* Small spelling mistakes */
      const distance = levenshteinDistance(
        queryToken,
        productToken
      );

      const maxDistance =
        queryToken.length <= 4
          ? 1
          : queryToken.length <= 7
          ? 2
          : 3;

      if (distance <= maxDistance) {
        bestTokenScore = Math.max(
          bestTokenScore,
          250 - distance * 25
        );
      }
    }

    if (bestTokenScore > 0) {
      matchedTokens += 1;
      score += bestTokenScore;
    }
  }

  /* Every search word matched */
  if (matchedTokens === queryTokens.length) {
    score += 150;
  }

  return score;
};

/* -------------------------------------------------------------------------- */
/*                               SEARCH PAGE                                  */
/* -------------------------------------------------------------------------- */

const SearchPage = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentSearched, setRecentSearched] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  /* ------------------------------------------------------------------------ */
  /*                              FETCH PRODUCTS                              */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("userToken");

        const response = await axios.get("products", {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });

        /**
         * Your API response shown in the console is:
         *
         * {
         *   products: [...]
         * }
         *
         * So we MUST use response.data.products.
         *
         * The additional checks make this safer if your API later
         * returns the array directly or wraps it differently.
         */

        const responseData = response?.data;

        let fetchedProducts: ProductT[] = [];

        if (Array.isArray(responseData)) {
          fetchedProducts = responseData;
        } else if (Array.isArray(responseData?.products)) {
          fetchedProducts = responseData.products;
        } else if (Array.isArray(responseData?.data)) {
          fetchedProducts = responseData.data;
        }

        if (isMounted) {
          setProducts(fetchedProducts);

          if (!fetchedProducts.length) {
            console.warn(
              "Products API returned no products.",
              responseData
            );
          }
        }
      } catch (err) {
        console.error("Error fetching products:", err);

        if (isMounted) {
          setError(
            "We couldn't load the products right now. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    /* -------------------------- Recent searches -------------------------- */

    try {
      const storedSearches =
        localStorage.getItem(RECENT_SEARCH_KEY);

      if (storedSearches) {
        const parsed = JSON.parse(storedSearches);

        if (Array.isArray(parsed)) {
          const validSearches = parsed
            .filter(
              (item): item is string =>
                typeof item === "string" &&
                item.trim().length > 0
            )
            .slice(0, MAX_RECENT_SEARCHES);

          if (isMounted) {
            setRecentSearched(validSearches);
          }
        }
      }
    } catch (err) {
      console.error(
        "Failed to read recent searches:",
        err
      );

      localStorage.removeItem(RECENT_SEARCH_KEY);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                          SAVE RECENT SEARCHES                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    try {
      if (recentSearched.length > 0) {
        localStorage.setItem(
          RECENT_SEARCH_KEY,
          JSON.stringify(recentSearched)
        );
      } else {
        localStorage.removeItem(RECENT_SEARCH_KEY);
      }
    } catch (err) {
      console.error(
        "Failed to save recent searches:",
        err
      );
    }
  }, [recentSearched]);

  /* ------------------------------------------------------------------------ */
  /*                              LIVE SEARCH                                 */
  /* ------------------------------------------------------------------------ */

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim();

    if (!query) {
      return [];
    }

    return products
      .map((product) => ({
        product,
        score: getProductSearchScore(product, query),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return String(a.product.name ?? "").localeCompare(
          String(b.product.name ?? "")
        );
      })
      .map((item) => item.product);
  }, [products, searchQuery]);

  /* ------------------------------------------------------------------------ */
  /*                           RECENT SEARCH LOGIC                            */
  /* ------------------------------------------------------------------------ */

  const addToRecentSearches = (query: string) => {
    const cleanedQuery = query.trim();

    if (!cleanedQuery) {
      return;
    }

    setRecentSearched((previous) => {
      const updated = [
        cleanedQuery,
        ...previous.filter(
          (item) =>
            normalizeText(item) !==
            normalizeText(cleanedQuery)
        ),
      ];

      return updated.slice(0, MAX_RECENT_SEARCHES);
    });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchSubmit = () => {
    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    addToRecentSearches(query);
  };

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      handleClearSearch();
    }
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    addToRecentSearches(query);
  };

  const handleDeleteSearch = (
    event: React.MouseEvent<HTMLButtonElement>,
    query: string
  ) => {
    event.stopPropagation();

    setRecentSearched((previous) =>
      previous.filter(
        (item) =>
          normalizeText(item) !==
          normalizeText(query)
      )
    );
  };

  const handleClearRecentSearches = () => {
    setRecentSearched([]);
  };

  /* ------------------------------------------------------------------------ */
  /*                               PRICE FORMAT                               */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /*                                  UI                                      */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-[#f7f9f8] px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10">
              <Icon
                icon="mdi:magnify"
                className="text-2xl text-[#006838]"
              />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-[#006838]">
              Product Search
            </p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Find exactly what you&apos;re looking for
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
            Search by product name or description. Results
            update automatically as you type.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* SEARCH BOX                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div
          className={`rounded-2xl border bg-white p-3 shadow-sm transition-all ${
            isFocused
              ? "border-[#006838] shadow-[0_0_0_4px_rgba(0,104,56,0.08)]"
              : "border-gray-200"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Icon
                icon="mdi:magnify"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400"
              />

              <label
                htmlFor="product-search"
                className="sr-only"
              >
                Search Products
              </label>

              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search products, e.g. gown, shoes, phone..."
                autoComplete="off"
                spellCheck
                className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                >
                  <Icon
                    icon="mdi:close"
                    className="text-lg"
                  />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleSearchSubmit}
              disabled={!searchQuery.trim()}
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#006838] px-6 text-sm font-semibold text-white transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon
                icon="mdi:magnify"
                className="text-xl"
              />

              Search
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span
                className={`h-2 w-2 rounded-full ${
                  searchQuery
                    ? "bg-[#006838]"
                    : "bg-gray-300"
                }`}
              />

              {searchQuery
                ? "Searching as you type..."
                : "Start typing to search"}
            </div>

            {searchQuery.trim() && !loading && (
              <span className="text-xs font-medium text-gray-500">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "result"
                  : "results"}
              </span>
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RECENT SEARCHES                                                 */}
        {/* ---------------------------------------------------------------- */}

        {recentSearched.length > 0 && (
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Recent searches
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Quickly return to something you searched
                  before.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClearRecentSearches}
                className="text-xs font-medium text-red-500 transition hover:text-red-600"
              >
                Clear all
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {recentSearched.map((query) => (
                <div
                  key={query}
                  className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 text-xs font-medium text-gray-700"
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleRecentSearchClick(query)
                    }
                    className="group flex items-center gap-2 px-3 py-2 transition hover:bg-[#006838]/5 hover:text-[#006838]"
                  >
                    <Icon
                      icon="mdi:history"
                      className="text-base text-gray-400 group-hover:text-[#006838]"
                    />

                    <span>{query}</span>
                  </button>

                  <button
                    type="button"
                    aria-label={`Delete recent search ${query}`}
                    onClick={(event) =>
                      handleDeleteSearch(event, query)
                    }
                    className="border-l border-gray-200 px-2.5 py-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Icon
                      icon="mdi:close"
                      className="text-sm"
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT                                                         */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-7">
          {/* Loading */}
          {loading && (
            <div>
              <div className="mb-4 h-5 w-32 animate-pulse rounded bg-gray-200" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                    >
                      <div className="h-36 animate-pulse bg-gray-200" />

                      <div className="space-y-3 p-4">
                        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <Icon
                  icon="mdi:alert-circle-outline"
                  className="text-3xl text-red-500"
                />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                Something went wrong
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                {error}
              </p>
            </div>
          )}

          {/* Initial State */}
          {!loading &&
            !error &&
            !searchQuery.trim() && (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#006838]/10">
                  <Icon
                    icon="mdi:text-search"
                    className="text-4xl text-[#006838]"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  What are you looking for?
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Start typing a product name or keyword
                  above. The results will appear
                  immediately.
                </p>
              </div>
            )}

          {/* No Results */}
          {!loading &&
            !error &&
            searchQuery.trim() &&
            filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <Icon
                    icon="mdi:magnify-close"
                    className="text-4xl text-gray-400"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  No products found
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  We couldn&apos;t find a product matching{" "}
                  <span className="font-semibold text-gray-700">
                    &quot;{searchQuery}&quot;
                  </span>
                  .
                </p>

                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="mt-6 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
                >
                  Clear search
                </button>
              </div>
            )}

          {/* Results */}
          {!loading &&
            !error &&
            searchQuery.trim() &&
            filteredProducts.length > 0 && (
              <div>
                <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Search results
                    </p>

                    <p className="text-xs text-gray-500">
                      Showing matches for &quot;
                      {searchQuery}&quot;
                    </p>
                  </div>

                  <p className="text-xs font-medium text-gray-500">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}{" "}
                    found
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product._id}
                      href={`./Product?id=${encodeURIComponent(
                        String(product._id)
                      )}`}
                      onClick={() =>
                        addToRecentSearches(searchQuery)
                      }
                      className="group block"
                    >
                      <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#006838]/20 hover:shadow-lg">
                        {/* Product Placeholder */}
                        <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-[#006838]/10 via-white to-gray-100">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                            <Icon
                              icon="mdi:shopping-outline"
                              className="text-3xl text-[#006838]"
                            />
                          </div>

                          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#006838] shadow-sm">
                            Product
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <h3 className="line-clamp-2 text-base font-bold leading-6 text-gray-900 transition group-hover:text-[#006838]">
                              {product.name}
                            </h3>

                            <Icon
                              icon="mdi:arrow-top-right"
                              className="shrink-0 text-lg text-gray-300 transition group-hover:text-[#006838]"
                            />
                          </div>

                          {product.description && (
                            <p className="line-clamp-2 text-sm leading-5 text-gray-500">
                              {product.description}
                            </p>
                          )}

                          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                                Price
                              </p>

                              <p className="mt-0.5 text-lg font-bold text-[#006838]">
                                {formatPrice(product.price)}
                              </p>
                            </div>

                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006838]/10 transition group-hover:bg-[#006838]">
                              <Icon
                                icon="mdi:arrow-right"
                                className="text-lg text-[#006838] transition group-hover:text-white"
                              />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </section>
      </div>
    </main>
  );
};

export default SearchPage;