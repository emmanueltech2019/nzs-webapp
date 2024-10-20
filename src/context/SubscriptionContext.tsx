import React, { createContext, useContext, useState } from "react";
// import loadingImg from '@/assets/images/loading-forever.gif'
import ourTeamBanner from "@/assets/images/our-team-banner.svg";

type contextType = {
  progressbar: number
  handleProgressbar: (progress: number) => void
  img: any
  handleImg: (img: any) => void
  func: {main: (...args: any[]) => any}
  handleFunc: (...args: any[]) => void
}

type contextProviderType = {
  children: React.ReactNode;
};

const subcontext = createContext({} as contextType);

const SubProvider = ({ children }: contextProviderType) => {
  const [img, setImg] = useState<any>(ourTeamBanner); // default image
  const [progressbar, setProgressbar] = useState<number>(0);
  const handleImg = (img: any) => {
    setImg(img);
  };
  const handleProgressbar = (progress: number) => {
    setProgressbar(progress);
  };

  const [func, setFunc] = useState({
    main: () => console.log('default')
  })
  const handleFunc = (f: ((...args: any[]) => any)) => {
    setFunc({
      main: f
    })
  }

  return (
    <subcontext.Provider value={{progressbar, handleProgressbar, img, handleImg, func, handleFunc
    }}>{children}</subcontext.Provider>
  );
};
export default SubProvider;

export const useContextStore = () => {
  return useContext(subcontext);
};

