'use client'
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";



const TagHeader = ({title}:{title:string}) => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center">
        <button onClick={router.back} className=" justify -self-start">
            <Icon icon='fluent:ios-arrow-24-filled' />
        </button>
        <h1 className="text-2xl font-bold text-center">{title}</h1>
    </div>
  );
};
export default TagHeader