"use client";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const TagHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between py-7">
      <button onClick={router.back}>
        <Icon icon="mdi:arrow-left" className="text-2xl text-gray-600" />
      </button>
      <h2 className="font-semibold text-lg">{title}</h2>
      <div></div>
    </div>
  );
};
export default TagHeader;
