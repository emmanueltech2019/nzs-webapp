'use client'
import Image from "next/image"
import Apple from "@/assets/icons/Apple.svg"
import Andriod from '@/assets/icons/Andriod.svg'
import playBtn from '@/assets/icons/playBtn.svg'
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import useToggle from "@/hooks/useToggle"
import useForm from "@/hooks/useForm"
import { useRouter } from "next/navigation"
import axios from "axios"
import { showToast } from "@/utils/axios"

const icon1Styles = "w-6 lg:w-[34.8px] h-6 lg:h-[34.8px] flex justify-center items-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]"

const eyeslash = 'heroicons:eye-slash-20-solid'
const eye = 'mdi:eye'

type eventType = React.MouseEvent<HTMLInputElement, MouseEvent>

const SignupContent = () => {
  const [tpswd, tpswdFunc] = useToggle(false)
  const router = useRouter()

  const [fnameState, setfname] = useForm('')
  const [lnameState, setlname] = useForm('')
  const [emailState, setemail] = useForm('')
  const [phoneState, setphone] = useForm('')
  const [pwdState, setpwd] = useForm('')


   // Validate email format
   const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone number format (e.g., 10 digits)
  // const validatePhone = (phone: string) => {
  //   const phoneRegex = /^[0-9]{10}$/;
  //   return phoneRegex.test(phone);
  // };

  // const validatePhone = (phone: string) => {
  //   // Remove all non-numeric characters from the input
  //   const cleanedPhone = phone.replace(/\D/g, '');
  
  //   // Check if the cleaned phone number is exactly 10 digits long
  //   const phoneRegex = /^[0-9]{10}$/;
  //   return phoneRegex.test(cleanedPhone);
  // };
  

  // Validate password strength
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Validate form before submission
  const validateForm = () => {
    if (!fnameState || !lnameState || !emailState || !pwdState || !phoneState) {
      alert('Please fill in all required fields.');
      return false;
    }
    if (!validateEmail(emailState)) {
      alert('Invalid email format.');
      return false;
    }
    // if (!validatePhone(phoneState)) {
    //   alert('Invalid phone number format. Must be 10 digits.');
    //   return false;
    // }
    if (!validatePassword(pwdState)) {
      alert('Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.');
      return false;
    }
    // if (pwdState !== confirmPwdState) {
    //   alert('Passwords do not match.');
    //   return false;
    // }
    return true;
  };


  const handleSubmit = async (e: eventType) => {
    e.preventDefault()
    if (!validateForm()) return;

    // validate form inputs
    // if(!fnameState || !lnameState || !emailState || !pwdState || !phoneState) {
    //   alert('please input required')
    //   return
    // }
    try {
      const response = await axios.post('/api/signup', {
        firstName: fnameState,
        lastName: lnameState,
        email: emailState,
        password: pwdState,
        phone: phoneState,
        messageConsent:true, 
        termsConsent:true,
      });

      if (response.status === 201) {
        // On success, navigate to onboarding
        showToast("success", "Signup sucessfully")
        
        // router.push('/user/onboarding');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('There was an error processing your signup.');
    }
    // validate email format
    // validate phone number format
    // validate password strength
    // validate password confirmation

    // handle form submission
    // navigate to onboarding page after submission
    // router.push('/user/onboarding')
  }
  return (
    <section className='px-6 lg:px-16 py-8 lg:py-11 bg-[--foreground-light-green] rounded-[21px] lg:rounded-[18px]'>
      <div className="flex md:gap-[36.97px] justify-between md:justify-start mb-[25.57px] lg:mb-0">
        <h2 className="flex items-center gap-2 text-black text-xs lg:text-sm font-normal">Download App
          <span className={icon1Styles}><Image src={Apple} alt="apple icon" className="w-[19.58px] object-cover" /></span>
          <span className={icon1Styles}><Image src={Andriod} alt="andriod icon" className="w-[19.58px] object-cover" /></span>
        </h2>
        {/* <h2 className="flex items-center gap-2 text-black text-xs lg:text-sm font-normal">
          <span><Image src={playBtn} alt="apple icon" className="w-[19.58px] object-cover" /></span>
          Watch Video
        </h2> */}
      </div>
      <h1 className="text-[#333333] text-[21px] lg:text-[28px] leading-normal font-medium mt-5 lg:mt-7 mb-5">
        Sign up now
      </h1>
      <form action="" className="text-[#666666]">
        <div className="fname-lname flex gap-2">
          <div className="fname flex flex-col mb-[10px] flex-1">
            <label htmlFor="fname" className='text-sm mb-1'>First Name</label>
            <input type="text" id='fname' onChange={e => setfname(e)} value={fnameState} required className='w-full pl-3 pr-2 py-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' />
          </div>
          <div className="lname flex flex-col mb-[10px] flex-1">
            <label htmlFor="lname" className='text-sm mb-1'>Last Name</label>
            <input type="text" id='lname' onChange={e => setlname(e)} value={lnameState} required className='w-full pl-3 pr-2 py-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' />
          </div>
        </div>

        <div className="email flex flex-col mb-[10px]">
          <label htmlFor="email" className='text-sm mb-1'>Email</label>
          <input type="text" id='email' onChange={e => setemail(e)} value={emailState} required className='w-full pl-7 pr-2 py-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' placeholder='i.e. john@mail.com' />
        </div>

        <div className="phone flex flex-col mb-[10px]">
          <label htmlFor="phone" className='text-sm mb-1'>Phone Number</label>
          <input type="text" id='phone' onChange={e => setphone(e)} value={phoneState} required className='w-full pl-7 pr-2 py-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' placeholder='1234' />
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
        <p className="text-sm lg:text-base">Use 8 or more characters with a mix of letters, numbers & symbols</p>

        <div className="agree-1 flex my-6 gap-1 items-start">
          <input id="agree-1" type="checkbox" className="accent-[--icon-light-green] mt-1 outline-none" required />
          <label htmlFor="agree-1" className="text-sm lg:text-base">
            By creating an account, I agree to our Terms of use
            and Privacy Policy
          </label>
        </div>
        <div className="agree-2 flex my-6 gap-1 items-start">
          <input id="agree-2" type="checkbox" className="accent-[--icon-light-green] mt-1" required />
          <label htmlFor="agree-2" className="text-sm lg:text-base">
            By creating an account, I am also consenting to
            receive SMS messages and emails, including
            product new feature updates, events, and
            marketing promotions from Naijazone.
          </label>
        </div>

        <div className="buttons">
          <input type="submit" value="Sign In" className="text-sm lg:text-lg py-[10px] lg:py-[14px] px-7 lg:px-10 rounded-[26.64px] text-white bg-[--foreground-green] cursor-pointer" onClick={handleSubmit} />
          <span className="ml-3 text-sm lg:text-base">Already have an Account <Link href='./login' className="underline">Login</Link></span>
        </div>

      </form>
    </section>
  )
}

export default SignupContent