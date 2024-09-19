import Image from "next/image";
import verifyCodeImage from "@/assets/images/verify-code-img.png";
import Box from "@/components/Box";

const Verification = () => {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen">
      <div className="col flex-[1.2] flex flex-col justify-evenly px-3 md:ps-[150px]">
        {/* box */}
        <div className="hidden lg:block">
          <Box />
        </div>

        {/* main text */}
        <div className="">
          <h1 className="text-3xl md:text-[40px] font-extrabold pt-3 pb-6">
            Enter confirmation code
          </h1>
          <p className="text-[#71727A] text-lg">A 4-digit code was sent to lucasscott3@email.com</p>
        </div>

        {/* form for code */}
        <form action=""></form>
      </div>



      <div className="col flex-1 hidden lg:block image h-full">
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
