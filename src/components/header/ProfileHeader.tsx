import Image from 'next/image';
import RoomIcon from '@mui/icons-material/Room';
interface ProfileHeaderProps {
  title: string;
  location: string;
  address: string;
  distance: string;
  rating: number;
  imageUrl: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title, location, address, distance, rating, imageUrl }) => {
  return (
    <div className="bg-white">
      {/* Header Image */}
      {/* <div className="relative h-48 w-full">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div> */}

      {/* Profile Details */}   
      <div className="px-0 pb-4 py-4 flex justify-between w-full ">
        {/* <h2 className="text-2xl font-semibold">{title}</h2> */}
        <div className='flex'>
            <div className='text-[#C5C6CC] '>
                <RoomIcon fontSize='large' />
            </div>
            <div>

            </div>
            <div>
                <p className="text-sm text-gray-500 font-bold">{location}</p>
                <p className="text-sm text-gray-500">{address}</p>
            </div>
        </div>

        {/* Distance and Rating */}
        <div className="flex items-center mt-2">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg mr-2">{distance}</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg mr-2">Driving</span>
          {/* <span className="text-yellow-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.318 4.04a1 1 0 00.95.69h4.252c.969 0 1.371 1.24.588 1.81l-3.462 2.52a1 1 0 00-.364 1.118l1.317 4.04c.3.921-.755 1.688-1.539 1.118l-3.462-2.52a1 1 0 00-1.176 0l-3.462 2.52c-.784.57-1.838-.197-1.539-1.118l1.318-4.04a1 1 0 00-.364-1.118L2.83 9.467c-.783-.57-.381-1.81.588-1.81h4.252a1 1 0 00.95-.69l1.318-4.04z" />
            </svg>
            {rating}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
