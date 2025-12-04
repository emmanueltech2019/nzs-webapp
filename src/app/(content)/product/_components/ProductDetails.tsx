"use client";
import CarouselEmbla from "@/components/carousel/Carousel";
import { FC, useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";
import { showToast } from "@/utils/alert";
import Image from "next/image";
import CircleLoader from "@/components/loader/loader";
import { useLocalCart } from "@/hooks/useLocalCart";
import CartDrawer from "@/components/cartdrawer/CartDrawer";
import { useCartData } from "@/hooks/useCartData";

const ProductScreen: FC = () => {
  const { addLocalItem, updateItemQuantity, removeItem  } = useLocalCart();
  const { detailedCart } = useCartData();

  const [product, setProduct] = useState<ProductT>();
  const [selectedSize, setSelectedSize] = useState("none");
  const [selectedColor, setSelectedColor] = useState("none");
  const { localCart } = useLocalCart();
  const cartLength = localCart.length;
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  var id: any
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    id = urlParams.get("id");
  }

  const token = localStorage.getItem("userToken");
  const addToCart = async () => {
    if (!token) {
      addLocalItem({
        productId: id,
        quantity: 1,
        // color: selectedColor,
        size: selectedSize,
      });

      showToast("success", "Item added to basket.");
      // setCartLength((prev) => prev + 1);
      return;
    }
    try {
      await axios.post(
        "cart/add/",
        { productId: id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showToast("success", "Item added to basket");

      const cartRes = await axios.get("cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // setCartLength(cartRes.data.cart.items.length);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "cart",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // setCartLength(res.data.cart.items.length);
      })
      .catch((error) => {});
    if (typeof window !== "undefined") {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let id = urlParams.get("id");
      axios({
        method: "GET",
        url: "products/single2/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then((res) => {
          setLoading(false);
          console.log("New res", res.data);
          setColors(res.data.color || []);
          setProduct(res.data);
        })
        .catch((error) => {});
    }
  }, []);
  const [open, setOpen] = useState(false);
  return (
    <div className="md:w-[50%] mx-auto">
      {loading ? (
        <CircleLoader isVisible={loading} />
      ) : (
        <div className=" p-4  mx-auto bg-white rounded-lg mb-20 md:mb-0">
          <div className="flex justify-between">
            <button
              className=" text-3xl z-10  py-1 text-gray-500 my-1 "
              onClick={handleGoBack}
            >
              <ArrowBackOutlinedIcon fontSize={"large"} />
            </button>
            <CartDrawer
              isOpen={open}
              onClose={() => setOpen(false)}
              cartItems={detailedCart}
             updateItemQuantity={updateItemQuantity} 
              removeItem={removeItem}
            />
            <div onClick={() => setOpen(true)}>
              <div className="relative">
                <Image
                  src={
                    "https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
                  }
                  alt="cart icon"
                  height={300}
                  width={40}
                  className="text-2xl"
                />
                <span className="absolute top-2 right-3 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                  {cartLength}
                </span>
              </div>
            </div>
          </div>

          <CarouselEmbla images={product?.images ?? []} />

          <div className="mt-4">
            <span className="inline-block py-2 px-4 bg-[#EAF2FF] text-black rounded-lg mb-4 mt-2">
              Available
            </span>
            <h2 className="text-2xl font-bold">{product?.name}</h2>
            <p className="text-xl text-gray-700">
              ₦ {product?.price} / {product?.quantityInfo.quantity}{" "}
              {product?.quantityInfo.quantityUnit} - {product?.price} *{" "}
              {product?.quantityInfo.quantity}
            </p>
            <p className="mt-2 text-gray-500">{product?.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color ? "border-green-600" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></button>
              ))}
            </div>
          </div>

          <button
            className="mt-6 w-full py-3 bg-[#006838] text-white text-lg rounded-lg flex items-center justify-center"
            onClick={addToCart}
          >
            + Add to Basket
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
