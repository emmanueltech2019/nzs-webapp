import Link from 'next/link'

type btntype = {
    url: string
    classValue?: string
}

export default function GetStarted({url, classValue}:btntype) {
  return (
    <Link href={url} className={`text-[13.05px] leading-[19.58px] px-[22px] py-[13px] rounded-[19.94px] hover:shadow-lg ${classValue?classValue:'text-white bg-[--icon-green]'} transition-all duration-200`}>Get Started Now</Link>
  )
}
