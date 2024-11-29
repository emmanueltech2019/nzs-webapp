import React from 'react';
import { Circle } from 'react-preloaders';

interface CircleLoaderProps {
  isVisible: boolean; // To toggle the loader visibility
}

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
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent overlay
        backdropFilter: 'blur(10px)', // Blur effect
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.2,
        zIndex: 1000000000, // Ensure it appears above other content
      }}
    >
      <Circle color="#006838"/>
    </div>
  );
};

export default CircleLoader;