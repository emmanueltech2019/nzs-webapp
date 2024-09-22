import React, { createContext, useContext, useState } from "react";
import ourTeamBanner from "@/assets/images/our-team-banner.svg"

type contextType = {
  progressbar: number
  handleProgressbar: (progress: number) => void
  img: any
  handleImg: (img: any) => void
}
const subcontext = createContext({} as contextType);

type contextProviderType = {
  children: React.ReactNode;
};

const SubProvider = ({ children }: contextProviderType) => {
  const [img, setImg] = useState<any>(); // default image
  const [progressbar, setProgressbar] = useState<number>(0);
  const handleImg = (img: any) => {
    setImg(img);
  };
  const handleProgressbar = (progress: number) => {
    setProgressbar(progress);
  };

  return (
    <subcontext.Provider value={{progressbar, handleProgressbar, img, handleImg}}>{children}</subcontext.Provider>
  );
};
export default SubProvider;

export const useContextStore = () => {
  return useContext(subcontext);
};

