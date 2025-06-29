import Link from "next/link";
import React, { useEffect, useState } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ProductDetail from "./ProductDetails";
import { ProductT } from "@/types/Product.types";
import axios from "@/utils/axios";
import { Icon } from "@iconify/react/dist/iconify.js";

interface InStockProps {
  products: ProductT[];
}

const InStock: React.FC<InStockProps> = ({ products }) => {
  const [productss, setProducts] = useState<ProductT[]>([]); // Corrected to an array
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
<<<<<<< HEAD
        const response = await axios({
            url:`/products/vendor/?for=instock&page=1&limit=10&businessId=67ee82b16479c4778127b209`,
            data: {businessId: "67ee82b16479c4778127b209"},
=======
        const response = await axios(
          {
            url: "/products/vendor",
            method: "GET",
            data: {
              businessId: "67ee82b16479c4778127b209",
            },
>>>>>>> 3083f36f74b26d4c4aa8a52295cb32bba8e46369
            headers: {
              Authorization: `Bearer ${userToken}`, // Ensure userToken is set
            }
        })
    
        console.log("Products Response:", response.data);
        setProducts(response.data.products || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching products:", error.response?.data || error.message);
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
          setProducts(res.data.products);
          fetchProducts();
        } else {
          console.error("Invalid product data format.");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  //

  return (
    <div className="w-full rounded-xl space-y-2 pb-40">
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
          <div key={product._id} className="rounded-lg p-2 bg-[#F8F9FE]">
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
                  <div className="text-gray-900 font-medium">
                    <p className="">
                      {product.name.length > 6
                        ? product.name.substring(0, 5) + "..."
                        : product.name}
                    </p>
                  </div>
                  <div className="text-gray-500">
                    ₦{product.price.toLocaleString()}
                  </div>
                  <div className="flex flex-col ms-2">
                    <span className="text-gray-500 text-xs">
                      {product.quantity}/{product.quantity}
                    </span>
                    <span className="text-gray-500 text-xs">Cartons</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-[#FFEFC5] text-black py-1 rounded-[4px] font-medium text-[10px] w-[65px]">
                  COMPLETE PRODUCT
                </button>
                <Icon
                  icon="bx:chevron-down"
                  className={`text-[#0C1F1F] cursor-pointer ${
                    expandedProductId === product._id ? "rotate-180" : ""
                  } transition-transform duration-500`}
                  width="24"
                  height="24"
                  onClick={() => handleExpandClick(product._id)}
                />
              </div>
            </div>

            {/* Conditionally render the expanded product details */}
            {expandedProductId === product._id && (
              <div className="mt-4">
                <ProductDetail
                  images={product.images}
                  name={product.name}
                  type={product.type}
                  description={product.description}
                  createdAt={product.createdAt}
                  _id={product._id}
                  quantity={product.quantity}
                  price={product.price}
                  discount={product.discount}
                  // stockSold={product.stockSold}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No products uploaded</div>
      )}
    </div>
  );
};

export default InStock;
