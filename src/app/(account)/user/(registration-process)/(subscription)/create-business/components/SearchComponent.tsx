import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const places = [
  {
    id: 1,
    name: "James Bakery",
    address: "200 Victoria St, Port Harcourt",
    mode: "Driving",
    distance: "3 Km",
  },
  {
    id: 2,
    name: "Louis & Joe Fashion",
    address: "200 Victoria St, Port Harcourt",
    mode: "Walking",
    distance: "0.5 Km",
  },
];

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-[#c9c7c799] rounded-xl">
      {/* Search Bar */}
      <div className="flex items-center bg-[#F8F9FE] p-3 rounded-full">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Street Info"
          className="bg-transparent text-[14px] text-[#1F2024] font-normal outline-none ml-2 flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Search Results */}
      <div className="mt-4 bg-[#fff] rounded-lg px-2">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="flex justify-between items-center p-3 "
          >
            {/* Left Side: Location Info */}
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#C5C6CC]" />
              </div>
              <div>
                <span className="font-medium text-[#0C1F1F] text-[11px] ">
                  {place.name}
                </span>
                <p className="text-[#0C1F1F] text-[9px]">{place.address}</p>
              </div>
            </div>

            {/* Right Side: Distance and Mode */}
            <div className="flex gap-2">
              <span className="bg-[#0C1F1F0F] text-[#0C1F1F] px-2 py-1 rounded text-[9px]">
                {place.mode}
              </span>
              <span className="bg-[#0C1F1F0F] text-[#0C1F1F] px-2 py-1 rounded text-[9px]">
                {place.distance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
