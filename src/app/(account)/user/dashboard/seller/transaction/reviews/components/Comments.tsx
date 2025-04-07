"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Rubik } from "next/font/google";

interface CommentType {
  id: number;
  text: string;
  timeStamp: number;
}

const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

interface Counts {
  likes: number;
}

interface CommentProps {
  updateCommentCounts: (counts: number) => void;
}

const Comments: React.FC<CommentProps> = ({updateCommentCounts}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [counts, setCounts] = useState<Counts[]>([]);

  const handleLike = (index: number) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = { likes: newCounts[index].likes + 1 };
      return newCounts;
    });
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment: CommentType = {
      id: comments.length + 1,
      text: commentText,
      timeStamp: Date.now(),
    };

    setComments((prevComments) => {
      const updatedComments = [...prevComments, newComment];
      updateCommentCounts(updatedComments.length);
      return updatedComments
    })
    setCounts((prevCounts) => [...prevCounts, { likes: 0 }]);
    setCommentText("");
  };

  const getTimeAgo = (timeStamp: number) => {
    const secondsAgo = Math.floor((Date.now() - timeStamp) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(secondsAgo / 3600);
    const daysAgo = Math.floor(secondsAgo / 86400);
    const weeksAgo = Math.floor(secondsAgo / 604800);

    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (minutesAgo < 60) return `${minutesAgo}min ago`;
    if (hoursAgo < 24) return `${hoursAgo}h ago`;
    if (daysAgo < 7) return `${daysAgo}d ago`;
    return `${weeksAgo}w ago`;
  };

  return (
    <div>
      <section>
        <div className="bg-[#fff] p-3 rounded-lg">
          {/* comments list */}
          <div className="overflow-y-auto max-h-[200px]">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-[11px]">say something...</p>
            ) : (
              comments.map((comment, index) => (
                <div key={comment.id} className="p-3 ">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-[30px] w-[30px] rounded-full bg-[#EAF2FF]"></div>
                      <p className="text-[12px] text-[#0C1F1F] font-medium">
                        Princewill
                      </p>
                    </div>
                    <span className="text-[10px] text-[#0C1F1F] bg-[#0C1F1F0F] rounded-s py-1 px-2">
                      {getTimeAgo(comment.timeStamp)}
                    </span>
                  </div>
                  <div className="ms-9 flex justify-between">
                    <p className="text-gray-800 text-[12px]">{comment.text}</p>
                    <div className="flex flex-col justify-between gap-5">
                      <div className="flex items-center cursor-pointer w-[40px] mt-2">
                        <Icon
                          icon="ant-design:like-outlined"
                          className="text-[#D6CCC6] text-[23px]"
                          onClick={() => handleLike(index)} // Use the index to update likes for this comment
                        />
                        <span
                          className={`ml-1 text-[#707070] text-[11.33px] ${rubik.className} antialiased`}
                        >
                          {counts[index]?.likes || 0}{" "}
                          {/* Display the like count */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* input Section */}
          <div className="bg-[#F8F9FE] py-0 ps-3 rounded-full mt-4 flex items-center justify-betwee45gap-2">
            <textarea
              className="border-0 text-[13px] outline-0 w-[90%] px-4 py-4 h-[50px] max-h-[200px] bg-transparent rounded-full"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>

            <Icon
              icon="famicons:paper-plane"
              className="bg-[#006838] text-[#fff] rounded-full p-2 cursor-pointer hover:scale-[93%] transition-all duration-300 ease-in-out"
              onClick={handleAddComment}
              width="44"
              height="41"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comments;
