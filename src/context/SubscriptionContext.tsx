import React, { createContext, useContext, useState } from "react";
// import loadingImg from '@/assets/images/loading-forever.gif'
import ourTeamBanner from "@/assets/images/our-team-banner.svg";

type contextType = {
  progressbar: number
  handleProgressbar: (progress: number) => void
  img: any
  handleImg: (img: any) => void

  next: string,
  handleNext: (r: string) => void
  isActive: boolean,
  handleActive: (a: boolean) => void
  message: string,
  handleMessage: (m: string) => void
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


  const [next, setNext] = useState(''),
  [isActive, setActive] = useState(false),
  [message, setMessage] = useState('')

  const handleNext = (r:string) => {setNext(r)}, 
  handleActive = (a: boolean) => {setActive(a)},
  handleMessage = (m: string) => {setMessage(m)}

  const obj = {next, handleNext, isActive, handleActive, message, handleMessage}

  return (
    <subcontext.Provider value={{progressbar, handleProgressbar, img, handleImg, ...obj}}>{children}</subcontext.Provider>
  );
};
export default SubProvider;

export const useContextStore = () => {
  return useContext(subcontext);
};

