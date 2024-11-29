import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';

type FloatingButtonPropsTypes = {
  onClick?: () => void,
  color?: string
}

const FloatingButton: FC<FloatingButtonPropsTypes> = ({onClick, color}) => {
  return (
    <div className=''>
    <button onClick={onClick}  className={`fixed md:bottom-10 bottom-28 md:right-96 right-3 text-white p-4 rounded-full shadow-lg z-[100] ${color}`} >
      <FiPlus className="text-3xl" />
    </button>
    </div>
  );
};

export default FloatingButton;
