// import * as motion from "framer-motion/client";
// import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Apple from "@/assets/icons/Apple.svg";
// import Andriod from "@/assets/icons/Andriod.svg";
// import nigeria from "@/assets/images/nigeria.svg";
// import iPhone16 from "@/assets/images/phone-hero.svg";
// import dashedArrow from "@/assets/images/dashedArrow.svg";
// import GetStarted from "@/components/buttons/GetStarted";
// import SignIn from "@/components/buttons/SignIn";
// import SignUp from "@/components/buttons/SignUp";

// // constant Styles
// const icon1Styles =
//   "w-[34.8px] h-[34.8px] flex justify-center items-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]";
// const bgImg = "bg-bgImage bg-cover bg-center h-full";

// const Home = () => {
//   return (
//     <div className={`${bgImg} relative overflow-x-hidden`}>
//       <Navbar>
//         {/* butttons */}
//         <div className={"flex gap-5"}>
//           <SignIn url={"/auth/login"} />
//           <SignUp url={"/auth/sign-up"} />
//         </div>
//       </Navbar>

//       <section className="hero-section pt-[83.57px] xl:pt-[96.43px] flex flex-col lg:flex-row gap-[34px] lg:items-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="hero-title pl-[--padding-x] pr-[--padding-x] flex-1"
//         >
//           <div className="flex md:gap-[36.97px] justify-between md:justify-start mb-[25.57px] lg:mb-0">
//             <h2 className="flex items-center gap-2 text-black text-sm font-normal">
//               Download App
//               <span className={icon1Styles}>
//                 <Image
//                   src={Apple}
//                   alt="apple icon"
//                   className="w-[19.58px] object-cover"
//                 />
//               </span>
//               <span className={icon1Styles}>
//                 <Image
//                   src={Andriod}
//                   alt="andriod icon"
//                   className="w-[19.58px] object-cover"
//                 />
//               </span>
//             </h2>
//           </div>

//           <div>
//             <h1 className="text-black text-[32px] lg:text-[45px] leading-[52.5px] lg:leading-[65px] font-semibold mb-5">
//               <div>
//                 Redefining
//                 <br />{" "}
//                 <span className="text-[--foreground-orange]">
//                   Access to Nigerian
//                 </span>
//               </div>
//               <div>Goods & Services </div>
//             </h1>

//             <p className="text-base lg:text-lg mb-8 max-w-[475.62px]">
//               Naijazone isn’t just another marketplace — it’s a movement to
//               transform how Nigerians buy, sell, and connect. We’ve reimagined
//               commerce with cutting-edge technology and a mission to empower
//               local creators, innovators, and service providers.
//             </p>

//             <GetStarted url="/shop" />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="hero-image xl:pr-[--padding-x] flex-[1.5]"
//         >
//           <div className="nigeria-img">
//             <Image
//               src={nigeria}
//               alt="nigeria"
//               className={`w-full object-cover`}
//             />
//           </div>
//           <div className="iPhone16-img -mt-[80%] lg:-mt-[50%] xl:-mt-[75%] overflow-hidden">
//             <Image
//               src={iPhone16}
//               className={`w-full object-cover h-full -mb-3`}
//               alt="iPhone16"
//             />
//           </div>
//         </motion.div>
//       </section>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="dashedArrow absolute -left-0 bottom-0 w-[128.68px] lg:w-[433.21px] -translate-x-1/3 md:-translate-x-0 lg:translate-x-[60%] -translate-y-full lg:-translate-y-1/2"
//       >
//         <Image
//           src={dashedArrow}
//           alt="dashed arrow"
//           className={`object-cover`}
//         />
//       </motion.div>
//     </div>
//   );
// };
// export default Home;
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Apple from "@/assets/icons/Apple.svg";
import Andriod from "@/assets/icons/Andriod.svg";
import nigeria from "@/assets/images/nigeria.svg";
import iPhone16 from "@/assets/images/phone-hero.svg";
import dashedArrow from "@/assets/images/dashedArrow.svg";
import GetStarted from "@/components/buttons/GetStarted";
import SignIn from "@/components/buttons/SignIn";
import SignUp from "@/components/buttons/SignUp";

const icon1Styles =
  "w-[34.8px] h-[34.8px] flex items-center justify-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]";

const bgImg = "bg-bgImage bg-cover bg-center h-full";

const Home = () => {
  return (
    <div className={`${bgImg} relative overflow-hidden`}>
      <Navbar>
        <div className="flex gap-5">
          <SignIn url="/auth/login" />
          <SignUp url="/auth/sign-up" />
        </div>
      </Navbar>

      <section className="hero-section flex flex-col gap-[34px] pt-[83.57px] lg:flex-row lg:items-center xl:pt-[96.43px]">
        {/* HERO CONTENT */}
        <div className="hero-title flex-1 animate-hero-left pl-[--padding-x] pr-[--padding-x]">
          <div className="mb-[25.57px] flex justify-between md:mb-0 md:justify-start">
            <h2 className="flex items-center gap-2 text-sm font-normal text-black">
              Download App

              <span className={icon1Styles}>
                <Image
                  src={Apple}
                  alt="Apple app"
                  width={19.58}
                  height={19.58}
                  loading="lazy"
                />
              </span>

              <span className={icon1Styles}>
                <Image
                  src={Andriod}
                  alt="Android app"
                  width={19.58}
                  height={19.58}
                  loading="lazy"
                />
              </span>
            </h2>
          </div>

          <div>
            <h1 className="mb-5 text-[32px] font-semibold leading-[52.5px] text-black lg:text-[45px] lg:leading-[65px]">
              <span className="block">
                Redefining
                <br />
                <span className="text-[--foreground-orange]">
                  Access to Nigerian
                </span>
              </span>

              <span className="block">Goods &amp; Services</span>
            </h1>

            <p className="mb-8 max-w-[475.62px] text-base text-black lg:text-lg">
              Naijazone isn’t just another marketplace — it’s a movement to
              transform how Nigerians buy, sell, and connect. We’ve reimagined
              commerce with cutting-edge technology and a mission to empower
              local creators, innovators, and service providers.
            </p>

            <GetStarted url="/shop" />
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="hero-image hero-image-enter flex-[1.5] xl:pr-[--padding-x]">
          <div className="nigeria-img">
            <Image
              src={nigeria}
              alt=""
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-auto w-full"
              aria-hidden="true"
            />
          </div>

          <div className="-mt-[80%] overflow-hidden lg:-mt-[50%] xl:-mt-[75%]">
            <Image
              src={iPhone16}
              alt="Naijazone marketplace on iPhone"
              width={900}
              height={1100}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="-mb-3 h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* DECORATIVE ARROW */}
      <div className="pointer-events-none absolute -bottom-0 -left-0 w-[128.68px] -translate-x-1/3 -translate-y-full animate-fade-in md:w-[433.21px] md:-translate-x-0 lg:translate-x-[60%] lg:-translate-y-1/2">
        <Image
          src={dashedArrow}
          alt=""
          width={433}
          height={180}
          sizes="(max-width: 1024px) 129px, 433px"
          className="h-auto w-full"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Home;