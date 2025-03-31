'use client';
import Image from "next/image"
import Apple from "@/assets/icons/Apple.svg"
import Andriod from '@/assets/icons/Andriod.svg'
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import useToggle from "@/hooks/useToggle";
import useForm from "@/hooks/useForm";
import { useRouter } from 'next/navigation'
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import { useState } from "react";
import CircleLoader from "@/components/loader/loader";


const icon1Styles = "w-6 lg:w-[34.8px] h-6 lg:h-[34.8px] flex justify-center items-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]"

const eyeslash = 'heroicons:eye-slash-20-solid'
const eye = 'mdi:eye'

type eventType = React.MouseEvent<HTMLInputElement, MouseEvent>

const LoginContent = () => {
  const router = useRouter();
  const [tpswd, tpswdFunc] = useToggle(false)
  const [emailState, setemail] = useForm('')
  const [pwdState, setpwd] = useForm('')
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: eventType) => {
    e.preventDefault()
    if (!emailState || !pwdState) {
      showToast('warning','Please fill out all fields')
      return
    }

    setLoading(true);

    // API call to login user with email and password
    try {
      const data = {
        email: emailState,
        password: pwdState
      } 
      const response = await axios.post(`/auth/login`, data)
      // Store user data in local storage - userToken
      localStorage.setItem('userToken', response.data.token)
      setLoading(false);
      showToast('success', 'User logged in successfully')


      let user = response.data.user
      if(user.emailVerified==false) {
        router.push('/user/verify-code')
      }else if(user.emailVerified==true){
        if(user.onboarding==false){
          router.push('/user/onboarding')
        }else if(user.accountType=="buyer"){
          router.push('/user/dashboard')
        }else if(user.accountType=="seller"){
          router.push('/user/dashboard/seller/transaction')
        }
        else{
          router.push('/user/interest') 
        }
      }
      
    } catch (error) {
      console.error(error)
      setLoading(false);
      showToast('error','Failed to login. Please check your email and password.')
    }
  }
  return (
    <section className='px-6 lg:px-16 py-8 lg:py-11 bg-[--foreground-light-green] rounded-[21px] lg:rounded-[18px] h-screen  justify-center items-center align-center'>
            <CircleLoader isVisible={loading} />

      <h1 className="text-[#333333] text-[21px] lg:text-[28px] leading-normal font-medium mt-5 lg:mt-7 mb-5 w-fit mx-auto">
        Welcome Back!
      </h1>
      <form action="" className="text-[#666666] md:w-[30vw] mx-auto">
        <div className="email flex flex-col mb-[10px]">
          <label htmlFor="email" className='text-sm mb-1'>Email</label>
          <input type="text" id='email' onChange={e => setemail(e)} value={emailState} required className='w-full pl-7 pr-2 py-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' placeholder='i.e. john@mail.com' />
        </div>

        <div className="pswd flex flex-col mb-[10px]">
          <label htmlFor="pswd" className='text-sm mb-1 w-full flex justify-between items-center'>
            <span>Password</span>
            <span className="flex items-center gap-2 cursor-pointer" onClick={tpswdFunc}>
              <span><Icon icon={tpswd ? eye : eyeslash} className="inline" /></span>
              <span className="leading-none">{tpswd ? 'Show' : 'Hide'}</span>
            </span>
          </label>
          <input type={tpswd ? 'text' : 'password'} id='pswd' onChange={e => setpwd(e)} value={pwdState} required className='w-full pl-7 pr-2 py-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' placeholder='*****' />
        </div>
        {/* <span className="text-[1px] lg:text-[12px]">Use 8 or more characters with a mix of letters, numbers & symbols</span> */}


        <div className="buttons">
          <input type="submit" value="Sign In" className="text-sm lg:text-lg py-[10px] lg:py-[14px] px-7 lg:px-10 rounded-[26.64px] text-white bg-[--foreground-green] cursor-pointer" onClick={handleSubmit} />
        </div>

      </form>
    </section>
  )
}

export default LoginContent