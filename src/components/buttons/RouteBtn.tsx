import Link from "next/link";

type routebtntype = {
  url: string
  classValue?: string
  text: string
};

export default function RouterBtn({ url, classValue, text }: routebtntype) {
  return (
      <Link
        href={url}
        className={`rounded-[12px] py-3 px-4 text-[#FFFFFF] text-xs font-semibold leading-[14.52px] text-center block w-full ${
          classValue ? classValue : "bg-[#006838] m-auto"
        }`}
      >
        {text}
      </Link>
  );
}
