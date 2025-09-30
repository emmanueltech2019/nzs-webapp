import Image from 'next/image';
import React from 'react';
import logoTitle from '@/assets/images/logoTitle.png';
import { ThreeDots } from 'react-loader-spinner';

interface CircleLoaderProps {
  isVisible: boolean; // To toggle the loader visibility
}

const logo =
  'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png';

const CircleLoader: React.FC<CircleLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column', // ✅ Stack logo and loader vertically
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
        zIndex: 1000000000,
      }}
    >
      {/* ✅ Logo on a separate line */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex gap-[8px] items-center justify-center">
          <div className="logo w-[35.05px] xl:w-[35.53px]">
            <Image src={logo} width={250} height={250} alt="logo-image" />
          </div>
          <div className="logo-title w-[122.94px] xl:w-[145.37px]">
            <Image src={logoTitle} width={100} height={100} alt="logoTitle" />
          </div>
        </div>
      </div>

      {/* ✅ Loader below logo */}
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default CircleLoader;
