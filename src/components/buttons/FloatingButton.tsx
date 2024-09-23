import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';

const FloatingButton: FC = () => {
  return (
    <div className=''>
    <button className="fixed bottom-10 md:right-96 right-5 bg-[#006838] text-white p-4 rounded-full shadow-lg z-[100]">
      <FiPlus className="text-3xl" />
    </button>
    </div>
  );
};

export default FloatingButton;
