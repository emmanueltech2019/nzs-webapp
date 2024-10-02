import jumoTestimonial from '@/assets/images/jumo-testimonial.svg'
import Image from 'next/image';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
interface ReviewProps {
    name: string;
    time: string;
    reviewText: string;
  }
  
  const Review: React.FC<ReviewProps> = ({ name, time, reviewText }) => {
    return (
      <div className="p-4 bg-white rounded-lg mb-4 shadow-md">
        <div className="flex items-center mb-2">
          <Image src={jumoTestimonial} alt="Profile" className="h-8 w-8 rounded-full mr-2" />
          <div className='flex space-x-2'>
            <p className="text-sm font-bold">{name}</p>{` `}
            <div>-</div>{` `}
            <p className="text-sm text-gray-500">{time}</p>
          </div>
        </div>
        <p className="text-sm">{reviewText}</p>
        <div className='flex space-x-3 py-2 text-[#707070]'>
            <div className='flex'>
                <ThumbUpOutlinedIcon />
                <span>10</span>
            </div>
            <div className='flex'>
                <ChatBubbleOutlineOutlinedIcon />
                <span>10</span>
            </div>
        </div>
      </div>
    );
  };
  
  export default Review;
  