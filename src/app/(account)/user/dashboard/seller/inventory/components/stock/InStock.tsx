import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductDetail from "./ProductDetails";
import { ProductT } from "@/types/Product.types";
import axios from "@/utils/axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import CircleLoader from "@/components/loader/loader";

interface InStockProps {
  products: ProductT[];
}

const InStock: React.FC<InStockProps> = ({ products }) => {
  const [productss, setProducts] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null
  );

  const handleExpandClick = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      console.error("User token is missing.");
      return;
    }

    const fetchProducts = async () => {
      try {
        let businessId = localStorage.getItem("activeBusiness");
        const response = await axios({
          url: `/products/vendor/?for=instock&page=1&limit=100&businessId=${businessId}`,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching products:",
            error.response?.data || error.message
          );
        } else {
          console.error("Error fetching products:", error);
        }
      }
    };

    axios({
      method: "GET",
      url: "/users/profile",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        if (res.data.businessId) {
          localStorage.setItem("businessId", res.data.businessId);
        }
        if (Array.isArray(res.data.products)) {
          fetchProducts();
        } else {
          console.error("Invalid product data format.");
        }
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized access") {
          Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "OK",
          }).then(() => {
            localStorage.clear();
            window.location.replace("/auth/login");
          });
          return;
        }
        console.error("Error fetching profile:", error);
      });
  }, []);

  return (
    <>
      {loading ? <CircleLoader isVisible={loading} />:<div className="w-full rounded-xl space-y-2 pb-40">
      <div className="flex items-center justify-between pb-3 py-3 px-2 bg-[#E0F4EA]">
        <h2 className="text-lg font-semibold text-gray-800">NEW PRODUCT</h2>
        <span className="text-green-600 px-3 py-1 rounded-full text-sm font-medium">
          <Link href="./add-product">
            <button className="bg-[#F8F9FE] text-[#C3CAD9] border border-[#C3CAD9] w-7 h-7 rounded-full text-lg">
              +
            </button>
          </Link>
        </span>
      </div>

      {productss.length !== 0 ? (
        productss.map((product) => (
          <div
            key={product?._id ?? Math.random()}
            className="rounded-lg p-2 bg-[#F8F9FE]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div>
                  <Icon
                    icon="lets-icons:close-round-fill"
                    className="text-[#C3CAD9] cursor-pointer"
                    width="30"
                    height="30"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="text-gray-900 font-medium text-[20px] min-w-[100px]">
                    <p>
                      {product?.name
                        ? product.name.length > 6
                          ? product.name.substring(0, 5) + "..."
                          : product.name
                        : "Unnamed"}
                    </p>
                  </div>
                  <div className="text-gray-500 min-w-[100px]">
                    ₦{product?.price ? product.price.toLocaleString() : "N/A"}
                  </div>
                  <div className="flex flex-col ms-2 min-w-[100px]">
                    <span className="text-gray-500 text-xs">
                      {product?.quantity ?? 0}/{product?.quantity ?? 0}
                    </span>
                    <span className="text-gray-500 text-xs">Cartons</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {product.completedStatus ? (
                  <Link href={`./edit-product/?id=${product?._id}`}> 
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    className="py-1 rounded-[4px] font-medium text-[10px] "
                  >
                    Edit Product
                  </Button></Link>
                 
                ) : (
                  <Link href={`./edit-product/?id=${product?._id}`}> 
                  <button className="bg-[#FFEFC5] text-black py-1 rounded-[4px] font-medium text-[10px] py-[5px] px-[4px]">
                    COMPLETE PRODUCT
                  </button>
                  </Link>
                )}

                <Icon
                  icon="bx:chevron-down"
                  className={`text-[#0C1F1F] cursor-pointer ${
                    expandedProductId === product?._id ? "rotate-180" : ""
                  } transition-transform duration-500`}
                  width="24"
                  height="24"
                  onClick={() => product?._id && handleExpandClick(product._id)}
                />
              </div>
            </div>

            {expandedProductId === product?._id && (
              <div className="mt-4">
                <ProductDetail
                  images={product?.images ?? []}
                  name={product?.name ?? "Unnamed"}
                  type={product?.type ?? "N/A"}
                  description={product?.description ?? ""}
                  createdAt={product?.createdAt ?? ""}
                  _id={product?._id ?? ""}
                  quantity={product?.quantity ?? 0}
                  price={product?.price ?? 0}
                  discount={product?.discount ?? 0}
                  completedStatus={product?.completedStatus ?? false}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No products uploaded</div>
      )}
    </div>}
    
    </>
    
  );
};

export default InStock;
