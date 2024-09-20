'use client';
import Image from "next/image"
import Apple from "@/assets/icons/Apple.svg"
import Andriod from '@/assets/icons/Andriod.svg'
import playBtn from '@/assets/icons/playBtn.svg'
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import useToggle from "@/hooks/useToggle";
import useForm from "@/hooks/useForm";
import { useRouter } from 'next/navigation'


const icon1Styles = "w-6 lg:w-[34.8px] h-6 lg:h-[34.8px] flex justify-center items-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]"

const eyeslash = 'heroicons:eye-slash-20-solid'
const eye = 'mdi:eye'

const LoginContent = () => {
  const router = useRouter();
  const [tpswd, tpswdFunc] = useToggle(false)
  const [emailState, setemail] = useForm('')
  const [pwdState, setpwd] = useForm('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validation
    if (!emailState || !pwdState) {
      alert('Please fill out all fields')
      return
    }
    // API call to login user with email and password
    //...
    // Redirect to user onboarding page
    router.push('/user/onboarding')
  }
  return (
    <section className='px-6 lg:px-16 py-8 lg:py-11 bg-[--foreground-light-green] rounded-[21px] lg:rounded-[18px]'>
      <div className="flex md:gap-[36.97px] justify-between md:justify-start mb-[25.57px] lg:mb-0">
        <h2 className="flex items-center gap-2 text-black text-xs lg:text-sm font-normal">Download App
          <span className={icon1Styles}><Image src={Apple} alt="apple icon" className="w-[19.58px] object-cover" /></span>
          <span className={icon1Styles}><Image src={Andriod} alt="andriod icon" className="w-[19.58px] object-cover" /></span>
        </h2>
        <h2 className="flex items-center gap-2 text-black text-xs lg:text-sm font-normal">
          <span><Image src={playBtn} alt="apple icon" className="w-[19.58px] object-cover" /></span>
          Watch Video
        </h2>
      </div>
      <h1 className="text-[#333333] text-[21px] lg:text-[28px] leading-normal font-medium mt-5 lg:mt-7 mb-5">
        Welcome Back!
      </h1>
      <form action="" className="text-[#666666]">
        <div className="email flex flex-col mb-[10px]">
          <label htmlFor="email" className='text-sm mb-1'>Email</label>
          <input type="text" id='email' onChange={e => setemail(e)} value={emailState} required className='w-full pl-7 pr-2 py-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' placeholder='i.e. john@mail.com' />
        </div>

        <div className="pswd flex flex-col mb-[10px]">
          <label htmlFor="pswd" className='text-sm mb-1 w-full flex justify-between items-center'>
            <span>Password</span>
            <span className="flex items-center gap-2 cursor-pointer" onClick={tpswdFunc}>
              <span><Icon icon={tpswd?eye:eyeslash} className="inline" /></span>
              <span className="leading-none">{tpswd?'Show':'Hide'}</span>
            </span>
          </label>
          <input type={tpswd?'text':'password'} id='pswd' onChange={e => setpwd(e)} value={pwdState} required className='w-full pl-7 pr-2 py-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' placeholder='*****' />
        </div>
        <p className="text-sm lg:text-base">Use 8 or more characters with a mix of letters, numbers & symbols</p>

        <div className="recognise-device flex my-6 gap-1">
          <input id="rgdvc" type="checkbox" className="accent-[--icon-light-green]" />
          <label htmlFor="rgdvc" className="text-sm lg:text-base">Recognize this device</label>
        </div>

        <div className="buttons">
          <input type="submit" value="Sign In" className="text-sm lg:text-lg py-[10px] lg:py-[14px] px-7 lg:px-10 rounded-[26.64px] text-white bg-[--foreground-green] cursor-pointer" onClick={handleSubmit} />
          <span className="ml-3 text-sm lg:text-base">Don&apos;t have an account? <Link href='./sign-up' className="underline">Sign up</Link></span>
        </div>

      </form>
    </section>
  )
}

export default LoginContent