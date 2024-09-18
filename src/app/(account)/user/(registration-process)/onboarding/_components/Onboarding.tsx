"use client";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useCallback } from "react";
import onboarding_image1 from "@/assets/images/onboarding-image1.svg";
import onboarding_image2 from "@/assets/images/onboarding-image2.svg";
import onboarding_image3 from "@/assets/images/onboarding-image3.svg";
import { CardItemtype } from "./onboarding.types";
import OnboardingCard from "./OnboardingCard";

const chart = "mage:chart-fill";
const delivery = "solar:delivery-bold";
const verified_user = "material-symbols:verified-user";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="flex flex-col-reverse lg:flex-row min-h-screen">
      <div className="col flex-[1.5] px-[--padding-x]">
        <div className="embla overflow-hidden lg:bg-[#EAF2FF]">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex gap-2">
              {cardContent.map(
                ({ icon, headText, paragraph }: CardItemtype) => (
                  <div className="embla__slide w-full md:w-2/5 lg:w-1/3">
                    <OnboardingCard
                      icon={icon}
                      headText={headText}
                      paragraph={paragraph}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col flex-1 image">col-2</div>
    </section>
  );
};

export default Onboarding;
