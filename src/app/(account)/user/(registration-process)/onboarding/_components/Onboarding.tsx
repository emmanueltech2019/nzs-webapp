"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useCallback } from "react";
import onboarding_image1 from "@/assets/images/onboarding-image1.svg";
import onboarding_image2 from "@/assets/images/onboarding-image2.svg";
import onboarding_image3 from "@/assets/images/onboarding-image3.svg";
import { CardItemtype } from "./onboarding.types";
import OnboardingCard from "./OnboardingCard";
import FuncRouteBtn from "@/components/buttons/FuncRouteBtn";
import Box from "@/components/Box";

const chart = "mage:chart-fill";
const delivery = "solar:delivery-bold";
const verified_user = "material-symbols:verified-user";

const images = [onboarding_image1, onboarding_image2, onboarding_image3];

export const cardContent: CardItemtype[] = [
  {
    icon: chart,
    headText: "Streaming Your Business Sales and Purchases",
    paragraph:
      "Enjoy these pre-made components and worry only about creating the best products ever.",
  },
  {
    icon: delivery,
    headText: "Quotes, Orders and Delivery. All Simplified for you!",
    paragraph:
      "Enjoy these pre-made components and worry only about creating the best products ever.",
  },
  {
    icon: verified_user,
    headText:
      "Welcome to Efficiency... Create a Profile and get verified quickly",
    paragraph:
      "Enjoy these pre-made components and worry only about creating the best products ever.",
  },
];

const Onboarding = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    watchDrag: false,
  });
  const [imageRef, imageApi] = useEmblaCarousel({
    loop: false,
    watchDrag: false,
  });
  useEffect(() => {
    if (emblaApi) console.log(emblaApi.slideNodes()); // Access API
    if (imageApi) console.log(imageApi.slideNodes()); // Access API
  }, [emblaApi, imageApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    if (imageApi) imageApi.scrollNext();
  }, [emblaApi, imageApi]);

  return (
    <section className="flex flex-col-reverse lg:flex-row min-h-screen">
      <div className="col flex-[1.5] px-3">
        {/* box */}
        <div className="hidden lg:block">
          <Box />
        </div>

        {/* pagination */}
        <div className="pagination"></div>

        {/* Welcome text */}
        <h1 className="text-3xl md:text-[40px] font-extrabold pt-3 pb-6">
          Welcome!
        </h1>

        {/* embla carousel for cards */}
        <div className="embla overflow-hidden">
          <div className="embla__viewport lg:w-9/12" ref={emblaRef}>
            <div className="embla__container flex gap-[10.47px] justify-between lg:bg-[#EAF2FF] lg:rounded-[21px] lg:p-[8.6px]">
              {cardContent.map(
                ({ icon, headText, paragraph }: CardItemtype, i) => (
                  <div
                    className="embla__slide onboarding__slide rounded-[21px] bg-[--foreground-green]"
                    key={i}
                    aria-index={`onboarding__slide_${i}`}
                  >
                    <OnboardingCard
                      icon={icon}
                      headText={headText}
                      paragraph={paragraph}
                    />
                  </div>
                )
              )}
            </div>
            <div className="px-[10px] lg:w-[130px]">
              <FuncRouteBtn text="Next" classValue="my-6" func={scrollNext} />
            </div>
          </div>
        </div>
      </div>

      <div className="col flex-1 image">
        {/* embla carousel for images */}
        <div className="embla overflow-hidden h-full">
          <div className="embla__viewport h-full" ref={imageRef}>
            <div className="embla__container flex h-full gap-[1px]">
              {images.map((img) => (
                <div className="embla__slide w-full">
                  <Image
                    src={img}
                    alt="onBoarding image-1"
                    className="w-full object-cover h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
