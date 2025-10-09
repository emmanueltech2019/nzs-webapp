import React, { useState } from "react";
import Image from "next/image";
import img1 from "./img/image.png";
import img2 from "./img/image copy.png";
import userimg1 from "./img/image copy 2.png";
import userimg2 from "./img/image copy 3.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Rubik } from "next/font/google";
import Comments from "./components/Comments";
import { motion, AnimatePresence } from "framer-motion";

const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

interface Counts {
  likes: number;
  comments: number;
}
interface Review {
  productImage: string;
  title: string;
  price: string;
  userProfile: string;
  username: string;
  rating: string;
  time: string;
  review: string;
  id: number
}
const Read: React.FC = () => {
  const [commentCount, setCommentCount] = useState(0);
  const [viewComments, setViewComments] = useState<{ [key: number]: boolean }>(
    {}
  );
const reviews: Review[] = []

  const reviews2 = [
    {
      id: 1,
      productImage: img1,
      title: "Amazing Shoe",
      price: "₦ 12.00",
      userProfile: userimg2,
      username: "Monye Fubara",
      rating: "4.8",
      time: "1 hr ago",
      review:
        "Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are.",
    },
    {
      id: 2,
      productImage: img2,
      title: "Amazing Shoe",
      price: "₦ 12.00",
      userProfile: userimg1,
      username: "Kolawole Folarin",
      rating: "4.8",
      time: "1 hr ago",
      review:
        "Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are.",
    },
    {
      id: 3,
      productImage: img1,
      title: "Amazing Shoe",
      price: "₦ 12.00",
      userProfile: userimg2,
      username: "Monye Fubara",
      rating: "4.8",
      time: "1 hr ago",
      review:
        "Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are.",
    },
  ];
  const handleViewComments = (index: number) => {
    setViewComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [counts, setCounts] = useState<Counts[]>(
    reviews.map(() => ({ likes: 0, comments: 0 }))
  );

  const handleCountChange = (index: number, type: keyof Counts) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];

      newCounts[index] = {
        ...newCounts[index],
        [type]: newCounts[index][type] + 1,
      };

      return newCounts;
    });
  };

  const [expanded, setExpanded] = useState(Array(reviews.length).fill(false));

  const toggleExpand = (index: any) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index]; // Toggle the expand state for the specific review
    setExpanded(newExpanded);
  };

  return (
    <div className="md:max-w-[90%] m-auto">
      <div className="grid gap-10">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="bg-[#EAF2FF] py-[10px] px-3 rounded-2xl transition-all duration-500"
          >
            {/* Product Image */}
            <div>
              <Image
                src={review.productImage}
                className="rounded-lg h-[124px] md:h-[186px] object-cover"
                alt="product image"
              />
            </div>

            {/* Review Card Header */}
            <div className="flex justify-between items-center p-[5px]">
              <div className="font-sans text-[#1F2024]">
                <p className="text-[12px] font-normal">{review.title}</p>
                <h2 className="font-extrabold text-[14px]">{review.price}</h2>
              </div>

              {/* View More Button */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleExpand(index)}
                  className={`${
                    expanded[index]
                      ? "bg-[#006838] text-[#EAF2FF]"
                      : "bg-[#EBEDEB] text-[#0C1F1F]"
                  } font-sans text-[9px] font-normal py-1 px-4 rounded-[15px] transition-all duration-500 ease-in-out`}
                >
                  {expanded[index] ? "Show less" : "View more"}
                </button>
                <Icon
                  icon={"tabler:chevron-down"}
                  className={`text-[#0C1F1F80] text-[14px] cursor-pointer transition-transform duration-500 ease-in-out ${
                    expanded[index] ? "" : "rotate-180"
                  }`}
                />
              </div>
            </div>

            {/* Review Content */}
            <div className="flex justify-start gap-3 md:gap-4 p-[5px]">
              {/* Profile Image */}
              <div className="py-2 block justify-center items-center w-[40px] h-[50px]">
                <Image
                  src={review.userProfile}
                  className="h-full w-full rounded-full"
                  alt="user profile"
                />
              </div>

              {/* Review Text */}
              <div className="w-full">
                <div className="flex items-center md:justify-between w-[100%] gap-4 my-1">
                  <div className="flex items-center gap-1">
                    <h3 className="text-sm text-[#573926] font-medium">
                      {review.username}
                    </h3>
                    <Icon
                      icon="ph:dot-bold"
                      className="text-[#707070] text-[20px]"
                    ></Icon>
                    <p className="text-xs text-[#707070] font-normal">
                      {review.time}
                    </p>
                  </div>
                  <span className="text-xs text-[#707070] font-normal flex items-center gap-1">
                    <Icon
                      icon="iconamoon:star-fill"
                      className="text-[#FFBB5B] text-[12px]"
                    ></Icon>
                    {review.rating}
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    expanded[index] ? "h-[120px]" : "h-[35px]"
                  }`}
                >
                  <p
                    className={`text-[13px] transition-all duration-500 ease-in-out text-[#573926] font-normal w-full ${rubik.className} antialiased md:w-full`}
                  >
                    {expanded[index]
                      ? review.review
                      : `${review.review.substring(0, 78)}...`}
                  </p>
                </div>

                {/* Like, Comment, and Share Icons */}
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 ms-1">
              <div className="flex items-center gap-4">
                <div className="flex items-center cursor-pointer w-[40px]">
                  <Icon
                    icon="ant-design:like-outlined"
                    className="text-[#D6CCC6] text-[23px]"
                    onClick={() => handleCountChange(index, "likes")}
                  />
                  <span
                    className={`ml-1 text-[#707070] text-[11.33px] ${rubik.className} antialiased`}
                  >
                    {counts[index].likes}
                  </span>
                </div>
                <div className="flex items-center cursor-pointer w-[40px] text-[#006838]">
                  {viewComments[review.id] ? (
                    <Icon
                      icon="fluent:comment-48-filled"
                      width="24"
                      height="24"
                      onClick={() => handleViewComments(review.id)}
                    />
                  ) : (
                    <Icon
                      icon="hugeicons:comment-02"
                      className={` text-[23px] text-[#D6CCC6]`}
                      onClick={() => handleViewComments(review.id)}
                    />
                  )}
                  <span
                    className={`ml-1 text-[#707070] text-[11.33px] ${rubik.className} antialiased`}
                  >
                    {commentCount}
                  </span>
                </div>
              </div>

              {/* Share Icon */}
              <div>
                {/* <Icon icon="ph:share-fat" className="text-[#D6CCC6] text-[23px] cursor-pointer" /> */}
              </div>
            </div>

            <AnimatePresence>
              {viewComments[review.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className="m-3"
                >
                  <Comments updateCommentCounts={setCommentCount} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
