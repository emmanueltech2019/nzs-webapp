// import React, { useState, useCallback, useMemo, useEffect } from 'react';

// // --- MOCK DATA ---
// const CATEGORIES = [
//   { name: 'Musical Instruments', subcategories: ['Amplifiers & Effects', 'Band & Orchestra', 'Bass Guitars'] },
//   { name: 'Drums & Percussion', subcategories: [] },
//   { name: 'Electronic Music, DJ & Karaoke', subcategories: [] },
//   { name: 'Guitars', subcategories: [] },
//   { name: 'Instrument Accessories', subcategories: [] },
//   { name: 'Keyboards & MIDI', subcategories: [] },
//   { name: 'Live Sound & Stage', subcategories: [] },
//   { name: 'Microphones & Accessories', subcategories: [] },
//   { name: 'Studio Recording Equipment', subcategories: [] },
// ];

// const BRANDS = ['Adam', 'Ahuja', 'AILIPU', 'AKAI', 'AKG', 'Allen & Heath', 'Alpine', 'Ampeg'];

// const DISCOUNTS = [50, 40, 30, 20, 10]; // Percentage
// const SELLER_SCORES = [80, 60, 40, 20]; // Percentage

// // --- HELPER COMPONENTS ---

// /**
//  * Renders the section title and provides a separator.
//  * @param {object} props - Component props.
//  * @param {string} props.title - The title of the filter section.
//  */
// const FilterSectionTitle = ({ title }:any) => (
//   <h3 className="py-3 px-1 text-sm font-semibold tracking-wide text-gray-700 uppercase border-b border-gray-100">
//     {title}
//   </h3>
// );

// /**
//  * Renders a single radio button option with label.
//  * @param {object} props - Component props.
//  * @param {string} props.id - Unique ID for the input.
//  * @param {string} props.label - Text label for the option.
//  * @param {string} props.name - Name attribute for the radio group.
//  * @param {string} props.value - Value of the radio button.
//  * @param {string} props.selectedValue - The currently selected value.
//  * @param {function} props.onChange - Handler for radio selection change.
//  */
// const RadioOption = ({ id, label, name, value, selectedValue, onChange }:any) => (
//   <div className="flex items-center space-x-2 py-1">
//     <input
//       type="radio"
//       id={id}
//       name={name}
//       value={value}
//       checked={selectedValue === value}
//       onChange={onChange}
//       className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500 rounded-full cursor-pointer"
//     />
//     <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
//       {label}
//     </label>
//   </div>
// );

// /**
//  * Renders the Product Rating filter section.
//  * @param {object} props - Component props.
//  * @param {string} props.selectedRating - Currently selected rating.
//  * @param {function} props.setSelectedRating - Setter for the selected rating.
//  */
// const RatingFilter = ({ selectedRating, setSelectedRating }:any) => {
//   const ratings = [5, 4, 3, 2]; // Represents 5 stars, 4 stars, 3 stars, 2 stars visible in the image.

//   const handleRatingChange = (event) => {
//     setSelectedRating(event.target.value);
//   };

//   return (
//     <div className="space-y-2 pt-2">
//       {ratings.map((rating) => (
//         <RadioOption
//           key={rating}
//           id={`rating-${rating}`}
//           label={
//             <div className="flex items-center text-sm space-x-1">
//               {[...Array(5)].map((_, i) => (
//                 <span
//                   key={i}
//                   className={`text-xl ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                   aria-label={`${i < rating ? 'Filled' : 'Empty'} star`}
//                 >
//                   ★
//                 </span>
//               ))}
//               <span className="ml-1 text-gray-700 whitespace-nowrap">
//                 & above
//               </span>
//             </div>
//           }
//           name="product-rating"
//           value={String(rating)}
//           selectedValue={selectedRating}
//           onChange={handleRatingChange}
//         />
//       ))}
//     </div>
//   );
// };

// /**
//  * Renders generic radio button groups like Discount Percentage or Seller Score.
//  * @param {object} props - Component props.
//  * @param {string} props.name - Filter name (e.g., 'Discount' or 'Score').
//  * @param {number[]} props.options - Array of percentage numbers.
//  * @param {string} props.selectedValue - Currently selected value.
//  * @param {function} props.onChange - Setter for the selected value.
//  */
// const RadioGroupFilter = ({ name, options, selectedValue, onChange }:any) => {
//   const filterName = name.toLowerCase().replace(/\s/g, '-');

//   const handleRadioChange = (event) => {
//     onChange(event.target.value);
//   };

//   return (
//     <div className="space-y-2 pt-2">
//       {options.map((option) => (
//         <RadioOption
//           key={option}
//           id={`${filterName}-${option}`}
//           label={`${option}% or more`}
//           name={filterName}
//           value={String(option)}
//           selectedValue={selectedValue}
//           onChange={handleRadioChange}
//         />
//       ))}
//     </div>
//   );
// };


// /**
//  * Renders the Price Range filter section with inputs and a conceptual slider.
//  * @param {object} props - Component props.
//  * @param {number} props.minPrice - Current minimum price.
//  * @param {number} props.maxPrice - Current maximum price.
//  * @param {function} props.setMinPrice - Setter for min price.
//  * @param {function} props.setMaxPrice - Setter for max price.
//  * @param {function} props.applyFilter - Function to apply the filter.
//  */
// const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, applyFilter }) => {
//   const MIN_RANGE = 2280;
//   const MAX_RANGE = 12700000;

//   // Use useEffect to ensure we don't try to calculate percentages before initial state is set
//   const [minPercent, setMinPercent] = useState(0);
//   const [maxPercent, setMaxPercent] = useState(100);

//   useEffect(() => {
//     const range = MAX_RANGE - MIN_RANGE;
//     setMinPercent(((minPrice - MIN_RANGE) / range) * 100);
//     setMaxPercent(((maxPrice - MIN_RANGE) / range) * 100);
//   }, [minPrice, maxPrice]);


//   const handleMinChange = (e) => {
//     const value = Number(e.target.value.replace(/[^0-9]/g, ''));
//     setMinPrice(Math.min(value, maxPrice || MAX_RANGE)); // Prevent min from exceeding max
//   };
//   const handleMaxChange = (e) => {
//     const value = Number(e.target.value.replace(/[^0-9]/g, ''));
//     setMaxPrice(Math.max(value, minPrice || MIN_RANGE)); // Prevent max from going below min
//   };

//   return (
//     <div className="pt-2">
//       <div className="flex justify-end items-center mb-4">
//         <button
//           onClick={applyFilter}
//           className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition duration-150"
//         >
//           Apply
//         </button>
//       </div>

//       {/* Conceptual Range Slider UI */}
//       <div className="relative h-2 w-full mb-6">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-full"></div>
//         <div
//           className="absolute top-0 h-1 bg-orange-600 rounded-full"
//           style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
//         ></div>
//         {/* Mock Thumbs - in a real app, these would be controlled inputs */}
//         <div
//           className="absolute top-[-4px] h-4 w-4 bg-orange-600 rounded-full shadow-lg cursor-pointer"
//           style={{ left: `calc(${minPercent}% - 8px)` }}
//         ></div>
//         <div
//           className="absolute top-[-4px] h-4 w-4 bg-orange-600 rounded-full shadow-lg cursor-pointer"
//           style={{ left: `calc(${maxPercent}% - 8px)` }}
//         ></div>
//       </div>

//       {/* Price Inputs */}
//       <div className="flex items-center justify-between space-x-2">
//         <input
//           type="text"
//           value={minPrice.toLocaleString('en-NG')}
//           onChange={handleMinChange}
//           className="w-1/2 p-2 text-sm border border-gray-300 rounded-lg text-center focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-150"
//           placeholder={MIN_RANGE.toLocaleString('en-NG')}
//         />
//         <span className="text-gray-500 text-lg mx-2">-</span>
//         <input
//           type="text"
//           value={maxPrice.toLocaleString('en-NG')}
//           onChange={handleMaxChange}
//           className="w-1/2 p-2 text-sm border border-gray-300 rounded-lg text-center focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-150"
//           placeholder={MAX_RANGE.toLocaleString('en-NG')}
//         />
//       </div>
//     </div>
//   );
// };

// /**
//  * Renders the Category filter section with nested lists.
//  * @param {object} props - Component props.
//  * @param {string} props.selectedCategory - Currently selected top-level category.
//  * @param {function} props.setSelectedCategory - Setter for the selected category.
//  */
// const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {

//   const handleCategoryClick = useCallback((categoryName) => {
//     setSelectedCategory(categoryName);
//   }, [setSelectedCategory]);

//   return (
//     <div className="space-y-1 pt-2">
//       {CATEGORIES.map((category) => (
//         <div key={category.name}>
//           <button
//             onClick={() => handleCategoryClick(category.name)}
//             className={`w-full text-left text-sm py-1 px-1 rounded-md transition duration-150 ${
//               selectedCategory === category.name
//                 ? 'font-bold text-orange-600 bg-orange-50'
//                 : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
//             }`}
//           >
//             {category.name}
//           </button>
//           {/* Render subcategories if selected and they exist */}
//           {selectedCategory === category.name && category.subcategories.length > 0 && (
//             <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2">
//               {category.subcategories.map((sub) => (
//                 <button
//                   key={sub}
//                   className="w-full text-left text-xs py-1 text-gray-600 hover:text-orange-500 transition duration-150"
//                 >
//                   {sub}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };


// /**
//  * Renders the Brand filter section with search and checkboxes.
//  * @param {object} props - Component props.
//  * @param {string[]} props.selectedBrands - Array of currently selected brands.
//  * @param {function} props.toggleBrand - Function to add/remove a brand from selection.
//  */
// const BrandFilter = ({ selectedBrands, toggleBrand }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredBrands = useMemo(() => {
//     if (!searchTerm) return BRANDS;
//     return BRANDS.filter(brand =>
//       brand.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm]);

//   const handleCheckboxChange = (e) => {
//     toggleBrand(e.target.value);
//   };

//   return (
//     <div className="pt-2">
//       {/* Search Input */}
//       <div className="relative mb-3">
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 pl-9 text-sm border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
//         />
//         {/* Search Icon (Inline SVG) */}
//         <svg
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="11" cy="11" r="8" />
//           <line x1="21" y1="21" x2="16.65" y2="16.65" />
//         </svg>
//       </div>

//       {/* Checkbox List */}
//       <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
//         {filteredBrands.map((brand) => (
//           <div key={brand} className="flex items-center space-x-2 py-0.5">
//             <input
//               type="checkbox"
//               id={`brand-${brand}`}
//               name="brand"
//               value={brand}
//               checked={selectedBrands.includes(brand)}
//               onChange={handleCheckboxChange}
//               className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
//             />
//             <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700 cursor-pointer">
//               {brand}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // --- MAIN SIDEBAR COMPONENT ---

// const ProductFilterSidebar = () => {
//   // State for all filters
//   const [minPrice, setMinPrice] = useState(2280);
//   const [maxPrice, setMaxPrice] = useState(12700000);
//   const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 2280, max: 12700000 });

//   const [selectedDiscount, setSelectedDiscount] = useState('');
//   const [selectedRating, setSelectedRating] = useState('');
//   const [selectedSellerScore, setSelectedSellerScore] = useState('');
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name); // Default to the first category

//   const toggleBrand = useCallback((brand) => {
//     setSelectedBrands(prev =>
//       prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
//     );
//   }, []);

//   const applyPriceFilter = useCallback(() => {
//     // Basic validation: ensure min is less than max
//     if (minPrice <= maxPrice) {
//       setAppliedPriceRange({ min: minPrice, max: maxPrice });
//       console.log(`Applying price filter: ₦${minPrice} - ₦${maxPrice}`);
//     } else {
//       // In a real application, you might show a user-friendly error message here
//       console.error("Invalid price range: Min price is greater than Max price.");
//     }
//   }, [minPrice, maxPrice]);

//   useEffect(() => {
//       // Log the final filter state for a real-world API call
//       console.log("Current Filter State:", {
//           price: appliedPriceRange,
//           discount: selectedDiscount,
//           rating: selectedRating,
//           sellerScore: selectedSellerScore,
//           brands: selectedBrands,
//           category: selectedCategory,
//       });
//   }, [appliedPriceRange, selectedDiscount, selectedRating, selectedSellerScore, selectedBrands, selectedCategory]);


//   return (
//     <div className="bg-white p-4 w-full max-w-sm rounded-xl shadow-xl space-y-4">
      
//       {/* 1. Category Filter (Screenshot 1) */}
//       <section>
//         <FilterSectionTitle title="CATEGORY" />
//         <CategoryFilter
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />
//       </section>

//       {/* 2. Brand Filter (Screenshot 1) */}
//       <section>
//         <FilterSectionTitle title="BRAND" />
//         <BrandFilter
//           selectedBrands={selectedBrands}
//           toggleBrand={toggleBrand}
//         />
//       </section>
      
//       {/* 3. Price Filter (Screenshot 2) */}
//       <section>
//         <FilterSectionTitle title={`PRICE (₦)`} />
//         <PriceFilter
//           minPrice={minPrice}
//           maxPrice={maxPrice}
//           setMinPrice={setMinPrice}
//           setMaxPrice={setMaxPrice}
//           applyFilter={applyPriceFilter}
//         />
//       </section>

//       {/* 4. Discount Percentage Filter (Screenshot 2) */}
//       <section>
//         <FilterSectionTitle title="DISCOUNT PERCENTAGE" />
//         <RadioGroupFilter
//           name="Discount Percentage"
//           options={DISCOUNTS}
//           selectedValue={selectedDiscount}
//           onChange={setSelectedDiscount}
//         />
//       </section>

//       {/* 5. Product Rating Filter (Screenshot 2) */}
//       <section>
//         <FilterSectionTitle title="PRODUCT RATING" />
//         <RatingFilter
//           selectedRating={selectedRating}
//           setSelectedRating={setSelectedRating}
//         />
//       </section>

//       {/* 6. Seller Score Filter (Screenshot 2) */}
//       <section>
//         <FilterSectionTitle title="SELLER SCORE" />
//         <RadioGroupFilter
//           name="Seller Score"
//           options={SELLER_SCORES}
//           selectedValue={selectedSellerScore}
//           onChange={setSelectedSellerScore}
//         />
//       </section>

//     </div>
//   );
// };

// // --- App Wrapper (Mandatory for single-file React) ---
// const App = () => (
//     // Load Tailwind CSS script for runtime styling and wrap elements in a fragment or single div
//     <>
//         <script src="https://cdn.tailwindcss.com"></script>
//         <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start pt-10 font-sans">
//             <ProductFilterSidebar />
//         </div>
//     </>
// );

// export default App;\
import React, { useState, useCallback, useMemo, useEffect } from 'react';

// --- TYPE DEFINITIONS ---

interface Category {
  name: string;
  subcategories: string[];
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterSectionTitleProps {
  title: string;
}

interface RadioOptionProps {
  id: string;
  label: React.ReactNode;
  name: string;
  value: string;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RatingFilterProps {
  selectedRating: string;
  setSelectedRating: React.Dispatch<React.SetStateAction<string>>;
}

interface RadioGroupFilterProps {
  name: string;
  options: number[];
  selectedValue: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  applyFilter: () => void;
}

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

interface BrandFilterProps {
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
}

// --- MOCK DATA ---
const CATEGORIES: Category[] = [
  { name: 'Musical Instruments', subcategories: ['Amplifiers & Effects', 'Band & Orchestra', 'Bass Guitars'] },
  { name: 'Drums & Percussion', subcategories: [] },
  { name: 'Electronic Music, DJ & Karaoke', subcategories: [] },
  { name: 'Guitars', subcategories: [] },
  { name: 'Instrument Accessories', subcategories: [] },
  { name: 'Keyboards & MIDI', subcategories: [] },
  { name: 'Live Sound & Stage', subcategories: [] },
  { name: 'Microphones & Accessories', subcategories: [] },
  { name: 'Studio Recording Equipment', subcategories: [] },
];

const BRANDS: string[] = ['Adam', 'Ahuja', 'AILIPU', 'AKAI', 'AKG', 'Allen & Heath', 'Alpine', 'Ampeg'];

const DISCOUNTS: number[] = [50, 40, 30, 20, 10]; // Percentage
const SELLER_SCORES: number[] = [80, 60, 40, 20]; // Percentage

// --- HELPER COMPONENTS ---

/**
 * Renders the section title and provides a separator.
 */
const FilterSectionTitle: React.FC<FilterSectionTitleProps> = ({ title }) => (
  <h3 className="py-3 px-1 text-sm font-semibold tracking-wide text-gray-700 uppercase border-b border-gray-100">
    {title}
  </h3>
);

/**
 * Renders a single radio button option with label.
 */
const RadioOption: React.FC<RadioOptionProps> = ({ id, label, name, value, selectedValue, onChange }) => (
  <div className="flex items-center space-x-2 py-1">
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={selectedValue === value}
      onChange={onChange}
      className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500 rounded-full cursor-pointer"
    />
    <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
      {label}
    </label>
  </div>
);

/**
 * Renders the Product Rating filter section.
 */
const RatingFilter: React.FC<RatingFilterProps> = ({ selectedRating, setSelectedRating }) => {
  const ratings: number[] = [5, 4, 3, 2];

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(event.target.value);
  };

  return (
    <div className="space-y-2 pt-2">
      {ratings.map((rating) => (
        <RadioOption
          key={rating}
          id={`rating-${rating}`}
          label={
            <div className="flex items-center text-sm space-x-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  aria-label={`${i < rating ? 'Filled' : 'Empty'} star`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-gray-700 whitespace-nowrap">
                & above
              </span>
            </div>
          }
          name="product-rating"
          value={String(rating)}
          selectedValue={selectedRating}
          onChange={handleRatingChange}
        />
      ))}
    </div>
  );
};

/**
 * Renders generic radio button groups like Discount Percentage or Seller Score.
 */
const RadioGroupFilter: React.FC<RadioGroupFilterProps> = ({ name, options, selectedValue, onChange }) => {
  const filterName: string = name.toLowerCase().replace(/\s/g, '-');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="space-y-2 pt-2">
      {options.map((option) => (
        <RadioOption
          key={option}
          id={`${filterName}-${option}`}
          label={`${option}% or more`}
          name={filterName}
          value={String(option)}
          selectedValue={selectedValue}
          onChange={handleRadioChange}
        />
      ))}
    </div>
  );
};


/**
 * Renders the Price Range filter section with inputs and a conceptual slider.
 */
const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, applyFilter }) => {
  const MIN_RANGE: number = 2280;
  const MAX_RANGE: number = 12700000;

  const [minPercent, setMinPercent] = useState<number>(0);
  const [maxPercent, setMaxPercent] = useState<number>(100);

  useEffect(() => {
    const range = MAX_RANGE - MIN_RANGE;
    if (range > 0) {
        setMinPercent(((minPrice - MIN_RANGE) / range) * 100);
        setMaxPercent(((maxPrice - MIN_RANGE) / range) * 100);
    }
  }, [minPrice, maxPrice]);


  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ''));
    setMinPrice(Math.min(value, maxPrice || MAX_RANGE)); // Prevent min from exceeding max
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ''));
    setMaxPrice(Math.max(value, minPrice || MIN_RANGE)); // Prevent max from going below min
  };

  return (
    <div className="pt-2">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={applyFilter}
          className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition duration-150"
        >
          Apply
        </button>
      </div>

      {/* Conceptual Range Slider UI */}
      <div className="relative h-2 w-full mb-6">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-full"></div>
        <div
          className="absolute top-0 h-1 bg-orange-600 rounded-full"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        ></div>
        {/* Mock Thumbs - in a real app, these would be controlled inputs */}
        <div
          className="absolute top-[-4px] h-4 w-4 bg-orange-600 rounded-full shadow-lg cursor-pointer"
          style={{ left: `calc(${minPercent}% - 8px)` }}
        ></div>
        <div
          className="absolute top-[-4px] h-4 w-4 bg-orange-600 rounded-full shadow-lg cursor-pointer"
          style={{ left: `calc(${maxPercent}% - 8px)` }}
        ></div>
      </div>

      {/* Price Inputs */}
      <div className="flex items-center justify-between space-x-2">
        <input
          type="text"
          value={minPrice.toLocaleString('en-NG')}
          onChange={handleMinChange}
          className="w-1/2 p-2 text-sm border border-gray-300 rounded-lg text-center focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-150"
          placeholder={MIN_RANGE.toLocaleString('en-NG')}
        />
        <span className="text-gray-500 text-lg mx-2">-</span>
        <input
          type="text"
          value={maxPrice.toLocaleString('en-NG')}
          onChange={handleMaxChange}
          className="w-1/2 p-2 text-sm border border-gray-300 rounded-lg text-center focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-150"
          placeholder={MAX_RANGE.toLocaleString('en-NG')}
        />
      </div>
    </div>
  );
};

/**
 * Renders the Category filter section with nested lists.
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, setSelectedCategory }) => {

  const handleCategoryClick = useCallback((categoryName: string) => {
    setSelectedCategory(categoryName);
  }, [setSelectedCategory]);

  return (
    <div className="space-y-1 pt-2">
      {CATEGORIES.map((category) => (
        <div key={category.name}>
          <button
            onClick={() => handleCategoryClick(category.name)}
            className={`w-full text-left text-sm py-1 px-1 rounded-md transition duration-150 ${
              selectedCategory === category.name
                ? 'font-bold text-orange-600 bg-orange-50'
                : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
          {/* Render subcategories if selected and they exist */}
          {selectedCategory === category.name && category.subcategories.length > 0 && (
            <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2">
              {category.subcategories.map((sub: string) => (
                <button
                  key={sub}
                  className="w-full text-left text-xs py-1 text-gray-600 hover:text-orange-500 transition duration-150"
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


/**
 * Renders the Brand filter section with search and checkboxes.
 */
const BrandFilter: React.FC<BrandFilterProps> = ({ selectedBrands, toggleBrand }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredBrands: string[] = useMemo(() => {
    if (!searchTerm) return BRANDS;
    return BRANDS.filter((brand: string) =>
      brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleBrand(e.target.value);
  };

  return (
    <div className="pt-2">
      {/* Search Input */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-9 text-sm border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
        />
        {/* Search Icon (Inline SVG) */}
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Checkbox List */}
      <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
        {filteredBrands.map((brand: string) => (
          <div key={brand} className="flex items-center space-x-2 py-0.5">
            <input
              type="checkbox"
              id={`brand-${brand}`}
              name="brand"
              value={brand}
              checked={selectedBrands.includes(brand)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
            />
            <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700 cursor-pointer">
              {brand}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN SIDEBAR COMPONENT ---

const ProductFilterSidebar: React.FC = () => {
  // State for all filters
  const [minPrice, setMinPrice] = useState<number>(2280);
  const [maxPrice, setMaxPrice] = useState<number>(12700000);
  const [appliedPriceRange, setAppliedPriceRange] = useState<PriceRange>({ min: 2280, max: 12700000 });

  const [selectedDiscount, setSelectedDiscount] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedSellerScore, setSelectedSellerScore] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].name);

  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev: string[]) =>
      prev.includes(brand) ? prev.filter((b: string) => b !== brand) : [...prev, brand]
    );
  }, []);

  const applyPriceFilter = useCallback(() => {
    // Basic validation: ensure min is less than max
    if (minPrice <= maxPrice) {
      setAppliedPriceRange({ min: minPrice, max: maxPrice });
      console.log(`Applying price filter: ₦${minPrice} - ₦${maxPrice}`);
    } else {
      console.error("Invalid price range: Min price is greater than Max price.");
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
      // Log the final filter state for a real-world API call
      console.log("Current Filter State:", {
          price: appliedPriceRange,
          discount: selectedDiscount,
          rating: selectedRating,
          sellerScore: selectedSellerScore,
          brands: selectedBrands,
          category: selectedCategory,
      });
  }, [appliedPriceRange, selectedDiscount, selectedRating, selectedSellerScore, selectedBrands, selectedCategory]);


  return (
    <div className="bg-white p-4 w-full max-w-sm rounded-xl shadow-xl space-y-4">
      
      {/* 1. Category Filter (Screenshot 1) */}
      <section>
        <FilterSectionTitle title="CATEGORY" />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      {/* 2. Brand Filter (Screenshot 1) */}
      {/* <section>
        <FilterSectionTitle title="BRAND" />
        <BrandFilter
          selectedBrands={selectedBrands}
          toggleBrand={toggleBrand}
        />
      </section> */}
      
      {/* 3. Price Filter (Screenshot 2) */}
      <section>
        <FilterSectionTitle title={`PRICE (₦)`} />
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          applyFilter={applyPriceFilter}
        />
      </section>

      {/* 4. Discount Percentage Filter (Screenshot 2) */}
      <section>
        <FilterSectionTitle title="DISCOUNT PERCENTAGE" />
        <RadioGroupFilter
          name="Discount Percentage"
          options={DISCOUNTS}
          selectedValue={selectedDiscount}
          onChange={setSelectedDiscount}
        />
      </section>

      {/* 5. Product Rating Filter (Screenshot 2) */}
      <section>
        <FilterSectionTitle title="PRODUCT RATING" />
        <RatingFilter
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
      </section>

      {/* 6. Seller Score Filter (Screenshot 2) */}
      <section>
        <FilterSectionTitle title="SELLER SCORE" />
        <RadioGroupFilter
          name="Seller Score"
          options={SELLER_SCORES}
          selectedValue={selectedSellerScore}
          onChange={setSelectedSellerScore}
        />
      </section>

    </div>
  );
};



export default ProductFilterSidebar;