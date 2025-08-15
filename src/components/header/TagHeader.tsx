"use client";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useEffect, useState } from "react";
import axios from "@/utils/axios";

interface TagHeaderProps {
  title: string;
  rightData?: string | number; // Optional prop
}
const TagHeader = ({ title, rightData }: TagHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between py-7">
      <button onClick={router.back}>
        <ArrowBackIosNewOutlinedIcon className="text-2xl text-gray-600" />
      </button>
      <h2 className="font-semibold text-lg">{title}</h2>
      <div> 
        {rightData !== undefined && (
          <span className="text-lg font-medium text-gray-700 bolder">{rightData}</span>
        )}
        </div>
    </div>
  );
};
export default TagHeader;
