import Link from 'next/link'

type btntype = {
    url: string
}

export default function SignIn({url}:btntype) {
  return (
    <Link href={url} className='text-black text-[13.05px] leading-[19.58px] px-[22px] py-[13px] rounded-[23.56px]  bg-none border-[0.36px] border-black hover:border-white hover:shadow-lg tranisition-all duration-300'>Sign In</Link>
  )
}