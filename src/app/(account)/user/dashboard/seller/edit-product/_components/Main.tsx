"use client";
import TagHeader from "@/components/header/TagHeader";
import openSansFont from "@/fonts/OpenSans";
import useToggle from "@/hooks/useToggle";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Suspense, useEffect, useState } from "react";
import Circle from "@/components/Circle";
import ProductInfo from "./ProductInfo";
import ProductSpec from "./ProductSpec";
import Pricing from "./Pricing";
// import Preview from './Preview'

const initialState = [
  {
    id: 1,
    title: (
      <>
        Product
        <br /> Info
      </>
    ),
    done: false,
  },
  {
    id: 2,
    title: (
      <>
        Quantity
        <br />
      </>
    ),
    done: false,
  },
  {
    id: 3,
    title: (
      <>
        Pricing
        <br />
      </>
    ),
    done: false,
  },
 
];

export const ProfileInfo = () => {
  const [pTab, pTabFunc] = useToggle(false);
  return (
    <div className="py-[18px] px-4 rounded-2xl bg-[#EBEDEB] mt-6">
      <button
        className="w-full flex justify-between items-center"
        onClick={pTabFunc}
      >
        <h1 className={`text-lg font-semibold text-[#0C1F1F]`}>PROFILE INFO</h1>
        <Icon
          icon={`bi:chevron-down`}
          className={`font-extrabold text-[#0C1F1F80] transition-all duration-200 ${
            pTab ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`content overflow-hidden transition-all duration-200 ${
          pTab ? "max-h-[1000px]" : "max-h-0"
        }`}
      ></div>
    </div>
  );
};

const Main = () => {
  const [section, setSection] = useState<1 | 2 | 3 | "done">(1);
  // (typeof section == 'number' && section > id
  const [tab, setTab] = useState(initialState);
  useEffect(() => {
    setTab((prev) =>
      prev.map(({ id, title, done }) => ({
        id,
        title,
        done: typeof section == "number" && section > id,
      }))
    );
  }, [section]);
  const [count, setCount] = useState(0);
  const [btnFunc, setBtnFunc] = useState({
    func: () => console.log("default"),
  });
  const handleBtnFunc = (param: (...args: any[]) => any) =>
    setBtnFunc({ func: param });
  const [displayCircle, setDisplayCircle] = useState(true);
  const [btnText, setBtnText] = useState("");

  return (
    <div className="h-10">  
      <TagHeader title="Edit Product" />
      <div className="row flex items-start justify-between gap-5 pb-3">
        {tab.map(({ id, title, done }) => (
          <div key={id} className="col flex items-center flex-col gap-[9px]">
            <div
              className={`flex items-center justify-center leading-0 rounded-full w-6 h-6 text-[10px] font-semibold ${openSansFont} ${
                section == id
                  ? "text-white bg-[--foreground-green]"
                  : done
                  ? "bg-[#1FCB2B]"
                  : "text-[#8F9098] bg-[#F8F9FE]"
              }`}
            >
              {done ? (
                <Icon
                  icon="fa6-solid:check"
                  className="text-[--foreground-green] font-bold"
                />
              ) : (
                id
              )}
            </div>
            <p
              className={`text-center font-bold text-sm ${openSansFont} ${
                section == id ? "text-[#1F2024]" : "text-[#8F9098]"
              }`}
            >
              {title}
            </p>
          </div>
        ))}
      </div>
      {section === 1 && (
        <ProductInfo
          setCount={setCount}
          handleBtnFunc={handleBtnFunc}
          setSection={setSection}
        />
      )}
      {section === 2 && (
        <ProductSpec
          setCount={setCount}
          handleBtnFunc={handleBtnFunc}
          setSection={setSection}
        />
      )}
      {section === 3 && (
        <Pricing
          setCount={setCount}
          handleBtnFunc={handleBtnFunc}
          setSection={setSection}
          setDisplayCircle={setDisplayCircle}
          setBtnText={setBtnText}
        />
      )}

      {/* <div className="flex items-center justify-center pt-3 pb-40 gap-6 w-full">
        <button
          onClick={btnFunc.func}
          className="rounded-[12px] py-5 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-90 transition-all duration-500"
        >
          {btnText || "NEXT"}
        </button>
        <div>
          {displayCircle ? (
            <Circle count={count} size={48}>
              <Icon
                icon="akar-icons:arrow-right"
                className="text-xl text-[--foreground-green] font-extrabold"
              ></Icon>
            </Circle>
          ) : (
            ""
          )}
        </div>
      </div> */}
      
    </div>
  );
};
const EditProductPage = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Main />
  </Suspense>
)
export default EditProductPage;
