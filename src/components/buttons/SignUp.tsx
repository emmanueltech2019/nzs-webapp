import Link from 'next/link'

type btntype = {
    url: string
}

export default function SignUp({url}:btntype) {
  return (
    <Link href={url} className='text-white text-[13.05px] leading-[19.58px] px-[22px] py-[13px] rounded-[23.56px]  bg-[--icon-green] hover:shadow-xl tranisition-all duration-300'>Sign Up</Link>
  )
}