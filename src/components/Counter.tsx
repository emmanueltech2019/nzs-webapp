"use client";

import React, {ChangeEvent,useCallback,useDeferredValue,useEffect,useMemo,useRef,useState} from "react";
import FloatingButton from "@/components/buttons/FloatingButton";
import Carousel from "@/components/carousel/Carousel2";
import ProductGrid from "@/components/Grid/ProductGrid2";
import { useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";
import CircleLoader from "@/components/loader/loader";
import ProductFilterSidebar from "./SideFileter";
import Image from "next/image";
import Tape from "./tape/Tape";
import CartDrawer from "./cartdrawer/CartDrawer";
import { FaSearch, FaFilter, FaTimes, FaSortAmountDown } from "react-icons/fa";
import { useLocalCart } from "@/hooks/useLocalCart";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 8;
const CACHE_TTL = 30_000;

const HERO_IMAGES = [
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1755239366/NZS_WEB_Banner_gh7lnp.png",
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.18_AM_s7elct.jpg",
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.19_AM_skokdz.jpg",
];

const CART_IMAGE =
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png";

const iconButtonStyles =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:shadow-md";

const compareDate = (dateString?: string) => {
  if (!dateString) return false;

  const productDate = new Date(dateString);

  if (Number.isNaN(productDate.getTime())) return false;

  const today = new Date();

  // Prevent future-dated products from being treated as "new arrivals".
  if (productDate.getTime() > today.getTime()) return false;

  const differenceInDays =
    (today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24);

  return differenceInDays <= 7;
};

type ProductCacheEntry = {
  products: ProductT[];
  expiresAt: number;
};

const productCache = new Map<string, ProductCacheEntry>();

/**
 * Normalize text for search.
 *
 * Examples:
 * "Women's Gown" -> "womens gown"
 * "GOWNS!!!"     -> "gowns"
 */
const normalizeSearchText = (value: unknown): string => {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Break text into searchable words.
 */
const tokenizeSearchText = (value: unknown): string[] => {
  const normalized = normalizeSearchText(value);

  if (!normalized) return [];

  return normalized.split(" ").filter(Boolean);
};

/**
 * Damerau-Levenshtein distance.
 *
 * Unlike basic Levenshtein, this also understands
 * common character swaps such as:
 *
 * "gwon" -> "gown"
 */
const damerauLevenshteinDistance = (
  source: string,
  target: string,
): number => {
  const sourceLength = source.length;
  const targetLength = target.length;

  if (source === target) return 0;

  if (sourceLength === 0) return targetLength;
  if (targetLength === 0) return sourceLength;

  const matrix: number[][] = Array.from(
    { length: sourceLength + 1 },
    () => Array(targetLength + 1).fill(0),
  );

  for (let i = 0; i <= sourceLength; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= targetLength; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= sourceLength; i++) {
    for (let j = 1; j <= targetLength; j++) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        // Deletion
        matrix[i - 1][j] + 1,

        // Insertion
        matrix[i][j - 1] + 1,

        // Substitution
        matrix[i - 1][j - 1] + cost,
      );

      // Transposition
      if (
        i > 1 &&
        j > 1 &&
        source[i - 1] === target[j - 2] &&
        source[i - 2] === target[j - 1]
      ) {
        matrix[i][j] = Math.min(
          matrix[i][j],
          matrix[i - 2][j - 2] + cost,
        );
      }
    }
  }

  return matrix[sourceLength][targetLength];
};

/**
 * Determines how many spelling mistakes we are willing
 * to tolerate based on the word length.
 *
 * This keeps short searches from becoming too fuzzy.
 */
const getAllowedTypoDistance = (word: string): number => {
  const length = word.length;

  if (length <= 3) return 0;
  if (length <= 6) return 1;

  return 2;
};

/**
 * Compare one search word against one product word.
 */
const fuzzyWordMatch = (
  searchWord: string,
  productWord: string,
): boolean => {
  if (!searchWord || !productWord) return false;

  // Exact match
  if (searchWord === productWord) {
    return true;
  }

  // Partial match
  if (
    productWord.includes(searchWord) ||
    searchWord.includes(productWord)
  ) {
    return true;
  }

  // Singular/plural handling.
  //
  // gown <-> gowns
  // shoe <-> shoes
  // bag <-> bags
  const singularSearch =
    searchWord.length > 3 && searchWord.endsWith("s")
      ? searchWord.slice(0, -1)
      : searchWord;

  const singularProduct =
    productWord.length > 3 && productWord.endsWith("s")
      ? productWord.slice(0, -1)
      : productWord;

  if (singularSearch === singularProduct) {
    return true;
  }

  if (
    singularSearch.includes(singularProduct) ||
    singularProduct.includes(singularSearch)
  ) {
    return true;
  }

  // Typo detection
  const allowedDistance = getAllowedTypoDistance(searchWord);

  if (allowedDistance === 0) {
    return false;
  }

  const distance = damerauLevenshteinDistance(
    searchWord,
    productWord,
  );

  return distance <= allowedDistance;
};

const ProductsView = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { localCart, updateItemQuantity, removeItem } = useLocalCart();

  const cartLength = localCart.length;

  // Search / filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortBy, setSortBy] = useState("default");

  // UI states
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // URL params
  const searchParams = useSearchParams();

  const industry = searchParams.get("industry") || "";
  const category = searchParams.get("category") || "";
  const sub = searchParams.get("sub") || "";
  const main = searchParams.get("main") || "products";

  const [activeTab, setActiveTab] = useState(main);

  // Intersection observer
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false);

  // Prevent setting state from obsolete requests.
  const requestIdRef = useRef(0);

  // Smooth typing on slower devices with large product lists.
  const deferredSearchQuery = useDeferredValue(searchQuery);

  /**
   * Keep active tab synchronized with the URL.
   */
  useEffect(() => {
    setActiveTab(main);
  }, [main]);

  /**
   * Fetch products safely.
   *
   * Improvements:
   * - Aborts obsolete requests.
   * - Uses a short in-memory cache.
   * - Doesn't let older responses overwrite newer ones.
   * - Preserves useful error handling.
   */
  const fetchProducts = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    const params = new URLSearchParams();

    if (industry) params.set("industry", industry);
    if (category) params.set("category", category);
    if (sub) params.set("sub", sub);

    const queryString = params.toString();
    const cacheKey = queryString || "all-products";

    const cached = productCache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      setProducts(cached.products);
      setLoading(false);
      setFetching(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    setFetching(true);
    setError(null);

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("userToken")
          : null;

      const response = await axios.get(
        `/products/2${queryString ? `?${queryString}` : ""}`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
          signal: controller.signal,
          timeout: 15_000,
        },
      );

      // Ignore stale responses.
      if (requestId !== requestIdRef.current) return;

      const nextProducts: ProductT[] = response.data?.products || [];

      productCache.set(cacheKey, {
        products: nextProducts,
        expiresAt: Date.now() + CACHE_TTL,
      });

      setProducts(nextProducts);
      setError(null);
    } catch (requestError: unknown) {
      // Ignore cancelled requests.
      if (
        requestError &&
        typeof requestError === "object" &&
        "code" in requestError &&
        requestError.code === "ERR_CANCELED"
      ) {
        return;
      }

      if (requestError instanceof DOMException) {
        if (requestError.name === "AbortError") return;
      }

      console.error("Error fetching products:", requestError);

      if (requestId === requestIdRef.current) {
        setError(
          "We couldn't load the products right now. Please check your connection and try again.",
        );
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        setFetching(false);
      }
    }

    return () => {
      controller.abort();
    };
  }, [industry, category, sub]);

  /**
   * Fetch whenever category/filter URL params change.
   */
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (cancelled) return;
      await fetchProducts();
    };

    run();

    return () => {
      cancelled = true;
      requestIdRef.current += 1;
    };
  }, [fetchProducts]);

  /**
   * Search + price filtering + sorting.
   */
  // const filteredProducts = useMemo(() => {
  //   const normalizedSearch = deferredSearchQuery.trim().toLowerCase();

  //   // Gracefully handle accidentally reversed min/max values.
  //   const min =
  //     minPrice === ""
  //       ? null
  //       : Math.min(
  //           Number(minPrice),
  //           Number(maxPrice === "" ? minPrice : maxPrice),
  //         );

  //   const max =
  //     maxPrice === ""
  //       ? null
  //       : Math.max(
  //           Number(maxPrice),
  //           Number(minPrice === "" ? maxPrice : minPrice),
  //         );

  //   const result = products.filter((product) => {
  //     const name = product.name?.toLowerCase() || "";

  //     const matchesSearch =
  //       normalizedSearch.length === 0 || name.includes(normalizedSearch);

  //     const price = Number(product.price ?? 0);

  //     const matchesMin = min === null || price >= min;
  //     const matchesMax = max === null || price <= max;

  //     return matchesSearch && matchesMin && matchesMax;
  //   });

  //   if (sortBy === "price-low") {
  //     result.sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
  //   } else if (sortBy === "price-high") {
  //     result.sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
  //   } else if (sortBy === "newest") {
  //     result.sort((a, b) => {
  //       const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;

  //       const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

  //       return dateB - dateA;
  //     });
  //   }

  //   return result;
  // }, [products, deferredSearchQuery, minPrice, maxPrice, sortBy]);
const filteredProducts = useMemo(() => {
  const normalizedSearch = normalizeSearchText(
    deferredSearchQuery,
  );

  /**
   * Convert search into individual words.
   *
   * Example:
   * "red gown" -> ["red", "gown"]
   */
  const searchWords = tokenizeSearchText(normalizedSearch);

  const min =
    minPrice === ""
      ? null
      : minPrice !== "" && maxPrice !== ""
        ? Math.min(Number(minPrice), Number(maxPrice))
        : Number(minPrice);

  const max =
    maxPrice === ""
      ? null
      : minPrice !== "" && maxPrice !== ""
        ? Math.max(Number(minPrice), Number(maxPrice))
        : Number(maxPrice);

  const result = products.filter((product) => {
    /**
     * Product name
     */
    const productName = normalizeSearchText(product?.name);

    /**
     * Business name
     */
    const businessName = normalizeSearchText(
      product?.businessId?.businessName,
    );

    /**
     * Everything searchable.
     *
     * This is especially useful because a seller may have
     * useful words in their business name.
     */
    const searchableText = `${productName} ${businessName}`;

    const productWords = tokenizeSearchText(searchableText);

    /**
     * SEARCH
     *
     * Every word typed by the customer must find
     * a matching word in the product.
     *
     * Examples:
     *
     * "gown"
     * "gowns"
     * "gwon"
     * "long gown"
     * "long gawn"
     */
    const matchesSearch =
      searchWords.length === 0 ||
      searchWords.every((searchWord) =>
        productWords.some((productWord) =>
          fuzzyWordMatch(searchWord, productWord),
        ),
      );

    /**
     * PRICE
     */
    const price = Number(product?.price ?? 0);

    const matchesMin =
      min === null || price >= min;

    const matchesMax =
      max === null || price <= max;

    return (
      matchesSearch &&
      matchesMin &&
      matchesMax
    );
  });

  /**
   * SORTING
   */
  if (sortBy === "price-low") {
    result.sort(
      (a, b) =>
        Number(a?.price ?? 0) -
        Number(b?.price ?? 0),
    );
  } else if (sortBy === "price-high") {
    result.sort(
      (a, b) =>
        Number(b?.price ?? 0) -
        Number(a?.price ?? 0),
    );
  } else if (sortBy === "newest") {
    result.sort((a, b) => {
      const dateA = a?.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const dateB = b?.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return dateB - dateA;
    });
  }

  return result;
}, [
  products,
  deferredSearchQuery,
  minPrice,
  maxPrice,
  sortBy,
]);
  /**
   * New arrivals.
   */
  const newArrivals = useMemo(() => {
    return products
      .filter((product) => compareDate(product.createdAt))
      .slice(0, 3);
  }, [products]);

  /**
   * Visible products.
   */
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMoreProducts = visibleCount < filteredProducts.length;

  /**
   * Reset pagination whenever any local filter changes.
   *
   * This fixes the bug where changing price/sort could leave the user
   * halfway through the previous result set.
   */
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [searchQuery, minPrice, maxPrice, sortBy]);

  /**
   * Infinite scroll.
   *
   * Improvements:
   * - No setTimeout to leak after unmount.
   * - Uses rootMargin to preload slightly before the user reaches the bottom.
   * - Prevents multiple simultaneous increments.
   */
  useEffect(() => {
    const target = observerTarget.current;

    if (!target || !hasMoreProducts) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          !loadingMoreRef.current &&
          visibleCount < filteredProducts.length
        ) {
          loadingMoreRef.current = true;

          setVisibleCount((current) =>
            Math.min(current + LOAD_MORE_COUNT, filteredProducts.length),
          );

          // Release lock on the next frame.
          requestAnimationFrame(() => {
            loadingMoreRef.current = false;
          });
        }
      },
      {
        root: null,
        rootMargin: "250px 0px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      loadingMoreRef.current = false;
    };
  }, [visibleCount, filteredProducts.length, hasMoreProducts]);

  /**
   * Search input.
   */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  /**
   * Reset all local filters.
   */
  const handleResetFilters = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

  /**
   * Close mobile filter drawer after selecting something.
   * Safe to use even if the sidebar handles its own navigation.
   */
  const closeMobileFilter = () => {
    setMobileFilterOpen(false);
  };

  /**
   * Cart product lookup optimized from repeated .find()
   * to a single Map construction.
   */
  const productMap = useMemo(() => {
    const map = new Map<string, ProductT>();

    for (const product of products) {
      map.set(String(product._id), product);
    }

    return map;
  }, [products]);

  const displayCartItems = useMemo(() => {
    return localCart.map((cartItem) => {
      const details = productMap.get(String(cartItem.productId));

      return {
        _id: cartItem.productId,
        productId: cartItem.productId,
        name: details?.name || "Loading...",
        price: details?.price || 0,
        image: details?.images?.[0] || "",
        size: cartItem.size,
        quantity: cartItem.quantity,
      };
    });
  }, [localCart, productMap]);

  /**
   * Reset stale pagination when the product source itself changes.
   */
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [industry, category, sub]);

  /**
   * Close mobile drawer when body/viewport changes are no longer needed.
   */
  useEffect(() => {
    if (!mobileFilterOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileFilterOpen]);

  return (
    <>
      <CartDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        cartItems={displayCartItems}
      />

      <div className="flex w-full flex-col items-center">
        {loading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <CircleLoader isVisible={loading} />
          </div>
        ) : (
          <>
            {activeTab === "products" ? (
              <div className="mb-24 w-full max-w-7xl px-4 md:px-6">
                {/* Hero Banner Carousel */}
                <div className="mb-6 w-full">
                  <Carousel images={HERO_IMAGES} />
                </div>

                {/* Top Toolbar */}
                <div className="my-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                  {/* Search */}
                  <div className="relative w-full md:w-1/2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <FaSearch />
                    </div>

                    <input
                      type="search"
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#006838]"
                      placeholder="Search across all products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      aria-label="Search products"
                    />
                  </div>

                  {/* Tape + Cart */}
                  <div className="flex w-full items-center justify-between gap-4 md:w-1/2">
                    <div className="min-w-0 flex-1">
                      <Tape />
                    </div>

                    <button
                      type="button"
                      className={iconButtonStyles}
                      onClick={() => setOpen(true)}
                      aria-label={`Open cart${
                        cartLength > 0 ? ` with ${cartLength} items` : ""
                      }`}
                    >
                      <Image
                        src={CART_IMAGE}
                        alt=""
                        width={24}
                        height={24}
                        sizes="24px"
                        className="object-contain"
                      />

                      {cartLength > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#006838] text-[10px] font-bold text-white">
                          {cartLength}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Refetch indicator for slow networks */}
                {fetching && !loading && (
                  <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-[#006838]" />
                    Updating products…
                  </div>
                )}

                {/* Mobile Filter / Sort */}
                <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3 md:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(true)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#006838]"
                  >
                    <FaFilter />
                    Filters & Categories
                  </button>

                  <div className="flex items-center gap-2">
                    <FaSortAmountDown className="text-xs text-gray-500" />

                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="bg-transparent text-xs font-medium text-gray-700 focus:outline-none"
                      aria-label="Sort products"
                    >
                      <option value="default">Sort: Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>

                {/* Main Layout */}
                <div className="flex flex-col items-start gap-8 md:flex-row">
                  {/* Sidebar / Mobile Drawer */}
                  <aside
                    className={`fixed inset-0 z-50 overflow-y-auto border-gray-100 bg-white p-6 transition-transform duration-300 md:static md:z-0 md:block md:w-1/4 md:translate-x-0 md:border-r-0 md:bg-transparent md:p-0 lg:w-1/5 ${
                      mobileFilterOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }`}
                    aria-label="Product filters"
                  >
                    <div className="mb-6 flex items-center justify-between border-b pb-3 md:hidden">
                      <h3 className="text-lg font-bold text-gray-800">
                        Filters
                      </h3>

                      <button
                        type="button"
                        onClick={closeMobileFilter}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                        aria-label="Close filters"
                      >
                        <FaTimes className="text-lg" />
                      </button>
                    </div>

                    <div className="sticky top-4 space-y-6">
                      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <ProductFilterSidebar />
                      </div>

                      {/* Price Filter */}
                      <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <h4 className="text-sm font-semibold text-gray-800">
                          Price Range
                        </h4>

                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            inputMode="numeric"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(event) =>
                              setMinPrice(
                                event.target.value
                                  ? Math.max(0, Number(event.target.value))
                                  : "",
                              )
                            }
                            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-[#006838] focus:outline-none"
                            aria-label="Minimum price"
                          />

                          <span className="text-xs text-gray-400">-</span>

                          <input
                            type="number"
                            min="0"
                            inputMode="numeric"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(event) =>
                              setMaxPrice(
                                event.target.value
                                  ? Math.max(0, Number(event.target.value))
                                  : "",
                              )
                            }
                            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-[#006838] focus:outline-none"
                            aria-label="Maximum price"
                          />
                        </div>

                        {/* Quick Prices */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setMinPrice(0);
                              setMaxPrice(10000);
                              closeMobileFilter();
                            }}
                            className="rounded bg-gray-100 px-2 py-1 text-[11px] text-gray-600 transition hover:bg-[#006838] hover:text-white"
                          >
                            Under ₦10,000
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setMinPrice(20000);
                              setMaxPrice(70000);
                              closeMobileFilter();
                            }}
                            className="rounded bg-gray-100 px-2 py-1 text-[11px] text-gray-600 transition hover:bg-[#006838] hover:text-white"
                          >
                            ₦20,000 - ₦70,000
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setMinPrice(100000);
                              setMaxPrice("");
                              closeMobileFilter();
                            }}
                            className="rounded bg-gray-100 px-2 py-1 text-[11px] text-gray-600 transition hover:bg-[#006838] hover:text-white"
                          >
                            ₦100,000+
                          </button>
                        </div>
                      </div>

                      {(minPrice !== "" ||
                        maxPrice !== "" ||
                        searchQuery !== "" ||
                        sortBy !== "default") && (
                        <button
                          type="button"
                          onClick={() => {
                            handleResetFilters();
                            closeMobileFilter();
                          }}
                          className="w-full rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </aside>

                  {/* Mobile Backdrop */}
                  {mobileFilterOpen && (
                    <button
                      type="button"
                      aria-label="Close filters"
                      onClick={closeMobileFilter}
                      className="fixed inset-0 z-40 cursor-default bg-black/40 md:hidden"
                    />
                  )}

                  {/* Product Area */}
                  <main className="flex w-full flex-col gap-6 md:w-3/4 lg:w-4/5">
                    {/* Desktop Sort */}
                    <div className="hidden items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 md:flex">
                      <p className="text-xs font-medium text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-800">
                          {visibleProducts.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-800">
                          {filteredProducts.length}
                        </span>{" "}
                        products
                      </p>

                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="desktop-sort"
                          className="text-xs font-medium text-gray-500"
                        >
                          Sort By:
                        </label>

                        <select
                          id="desktop-sort"
                          value={sortBy}
                          onChange={(event) => setSortBy(event.target.value)}
                          className="cursor-pointer border-none bg-transparent text-xs font-semibold text-gray-700 focus:outline-none"
                        >
                          <option value="default">Featured / Default</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="newest">Newest Arrivals</option>
                        </select>
                      </div>
                    </div>

                    {/* New Arrivals */}
                    {newArrivals.length > 0 &&
                      !deferredSearchQuery.trim() &&
                      minPrice === "" &&
                      maxPrice === "" && (
                        <div className="w-full">
                          <ProductGrid
                            link="new-arrivals"
                            title="New Arrivals"
                            products={newArrivals}
                          />
                        </div>
                      )}

                    {/* Filtered Products */}
                    <div className="w-full">
                      {visibleProducts.length > 0 ? (
                        <>
                          <ProductGrid
                            link="available-products"
                            title={
                              deferredSearchQuery.trim()
                                ? `Results for "${deferredSearchQuery.trim()}"`
                                : "Available Products"
                            }
                            products={visibleProducts}
                          />

                          {/* Infinite Scroll Sentinel */}
                          <div
                            ref={observerTarget}
                            className="mt-6 flex h-20 w-full items-center justify-center"
                            aria-live="polite"
                          >
                            {hasMoreProducts && (
                              <div className="flex flex-col items-center gap-2">
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#006838]" />

                                <span className="text-xs text-gray-500">
                                  Loading more products...
                                </span>
                              </div>
                            )}
                          </div>
                        </>
                      ) : error ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-6 py-16 text-center">
                          <FaSearch className="mb-3 text-4xl text-gray-300" />

                          <h3 className="text-lg font-bold text-gray-800">
                            Unable to load products
                          </h3>

                          <p className="mt-1 max-w-md text-sm text-gray-500">
                            {error}
                          </p>

                          <button
                            type="button"
                            onClick={fetchProducts}
                            className="mt-4 rounded-full bg-[#006838] px-5 py-2 text-xs font-semibold text-white shadow transition hover:bg-green-800"
                          >
                            Try Again
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-6 py-16 text-center">
                          <FaSearch className="mb-3 text-4xl text-gray-300" />

                          <h3 className="text-lg font-bold text-gray-800">
                            No products match your criteria
                          </h3>

                          <p className="mt-1 max-w-md text-sm text-gray-500">
                            Try broadening your price range, clearing search
                            terms, or picking a different category.
                          </p>

                          <button
                            type="button"
                            onClick={handleResetFilters}
                            className="mt-4 rounded-full bg-[#006838] px-5 py-2 text-xs font-semibold text-white shadow transition hover:bg-green-800"
                          >
                            Reset Filters
                          </button>
                        </div>
                      )}
                    </div>
                  </main>
                </div>
              </div>
            ) : (
              <FloatingButton />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductsView;