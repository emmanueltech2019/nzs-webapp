"use client";
import Image from "next/image";
import { useState } from "react";
import verifyCodeImage from "@/assets/images/verify-code-img.png";
import Box from "@/components/Box";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";




type eventType = React.MouseEvent<HTMLButtonElement, MouseEvent>

const Verification = () => {
  const router = useRouter();
  const [VCode, setVCode] = useState<number[]>(new Array(4).fill(""));

  const handleChange = (e: any, i: any) => {
    if (isNaN(e.target.value)) return false;
    setVCode([
      ...VCode.map((data, indx) => (indx === i ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) e.target.nextSibling.focus();
    if (!e.target.value && e.target.previousSibling)
      e.target.previousSibling.focus();
  };
  // Handle pasting OTP
  const handlePaste = (e: any) => {
    const pasteData = e.clipboardData.getData('text');
    const pasteValues = pasteData.split('').slice(0, 4);  // Limiting to 4 digits
    if (pasteValues.length === 4 && pasteValues.every((char: any) => !isNaN(char))) {
      setVCode(pasteValues);
    }
  };


  const handleSbmit = async (e: eventType) => {
    e.preventDefault();

    let result: string = "";
    VCode.forEach((a) => {
      if (!a) {
        console.log("Please fill all fields");
      } else {
        result += a;
      }
    });
    if (!result || result.length !== 4) {
      console.log("Please fill all fields");
      return;
    }
    let res: number = Number(result);

    // TODO: validate code and navigate to next page
    axios({
      method: "POST",
      url: `/auth/verify-email/`,
      data: {
        code: result
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      }
    }).then(response => {
      showToast('success', response.data.message)
      router.push("./onboarding");
    }).catch(err => {
      console.error(err);
      showToast('error', err.message)
    })

    // TODO: clear VCode state
    setVCode(new Array(4).fill(""));
  };


  const resendCode = async (e: eventType) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `/auth/resend-request/`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("userToken") }`
      }
    }).then(res => {
      showToast('info', res.data.message)
    }).catch(err => {
      showToast('error', err.message)
      console.log(err);
    })
  }

  return (
    <section className="flex flex-col lg:flex-row min-h-screen">
      <div className="col flex-[1.2] flex flex-col justify-evenly px-3 lg:ps-[150px]">
        {/* box */}
        <div className="hidden lg:block">
          <Box />
        </div>

        {/* main text */}
        <div className="">
          <h1 className="text-3xl md:text-[40px] font-extrabold pt-3 pb-6">
            Enter confirmation code
          </h1>
          <p className="text-[#71727A] text-lg">
            A 4-digit code was sent to lucasscott3@email.com
          </p>
        </div>

        {/* form for code */}
        <form action="">
          <div className="code-f flex justify-center items-center gap-2" onPaste={handlePaste}>
            {VCode.map((data, i) => (
              <input
                title={`OTP_Code_${i}`}
                key={"input_" + i}
                type="text"
                id="N1"
                value={data}
                maxLength={1}
                className="w-[48px] md:w-[69.68px] h-[48px] md:h-[69.68px] text-base text-center lg:text-lg rounded-[12px] md:rounded-[17.42px] border-[1.45px] border-[#C5C6CC] p-[12px] md:py-[17.42px] px-[18px] md:px-[23.23px] outline-[--foreground-green]"
                onInput={(e) => {
                  handleChange(e, i);
                }}
                onKeyDown={(e: any) => { if (e.key === 'Backspace' && !data && e.target.previousSibling) e.target.previousSibling.focus(); }}
              />
            ))}
          </div>

          {/* buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="w-full px-[10px]">
              <button
                onClick={resendCode}
                className="rounded-[12px] py-4 px-4 text-base font-semibold leading-[14.52px] text-center block w-full text-black scale-100 hover:scale-90 transition-all duration-500"
              >
                Resend
              </button>
            </div>
            <div className="w-full px-[10px]">
              <button
                onClick={handleSbmit}
                className="rounded-[12px] py-4 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-90 transition-all duration-500"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="col flex-1 hidden lg:block image overflow-hidden">
        <Image
          src={verifyCodeImage}
          alt="image-layer"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Verification;
