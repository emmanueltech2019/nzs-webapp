'use client'
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";



const TagHeader = ({title}:{title:string}) => {
  const router = useRouter()
  return (
    <div className="flex py-4">
        <button onClick={router.back} className="">
            <Icon icon='fluent:ios-arrow-24-filled' className="text-[--foreground-green] text-xl font-bold" />
        </button>
        <h1 className="font-extrabold text-center w-full">{title}</h1>
    </div>
  );
};
export default TagHeader