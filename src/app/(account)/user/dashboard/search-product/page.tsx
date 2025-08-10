'use client'
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { ProductT } from '@/types/Product.types';
import axios from "@/utils/axios";
import Link from 'next/link';

const page = () => {

    const [products, setProducts] = useState<ProductT[]>([]);
    // State to hold the user's search query
    const [searchQuery, setSearchQuery] = useState('');
    // State for loading status
    const [loading, setLoading] = useState(true);
    // State for error handling
    const [error, setError] = useState<string>('');
    const [collectedProducts, setCollectedProducts] = useState<ProductT[]>([]);

    const [recentSearched, setRecentSearched] = useState<string[]>([]);

    // Fetch all products when the component mounts
    useEffect(() => {
        axios({
            method: "GET",
            url: "products",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        })
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again later.");
            setLoading(false);
        });

        const storedSearches = localStorage.getItem('recentlySearched');
        if(storedSearches) {
            setRecentSearched(JSON.parse(storedSearches))
        }
    }, []);

    useEffect(() => {
        if(recentSearched.length > 0) {
            localStorage.setItem('recentlySearched', JSON.stringify(recentSearched))
        }
    }, [recentSearched])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const handleSearchTrigger = () => {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCollectedProducts(filteredProducts);
        setRecentSearched(prev => [...prev.filter(items => items !== searchQuery), searchQuery]);
        setSearchQuery('')
    }

    const handleDeleteSearch = (query: string) => {
        setRecentSearched(search => search.filter((item) => item !== query));
        setSearchQuery('')
        setCollectedProducts([])
    }

    const handleSearchedItemClick = (save: string) => {
        setSearchQuery(save)
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(save.toLowerCase()));
        setRecentSearched(prev => [...prev.filter(items => items !== save), save])
        setCollectedProducts(filteredProducts)
    }
    
  return (
    <div className='md:p-10 p-5 flex justify-center items-center flex-col gap-2'>
        <div className="flex items-center gap-3 w-full">
            <label htmlFor="search" className='sr-only'>Search Products</label>
            <input onKeyDown={(e) => { if (e.key === 'Enter') handleSearchTrigger(); }} onChange={handleInputChange} type="search" id="search" placeholder='Search Products...' className='border border-gray-300 rounded-md p-2 w-full outline-none' value={searchQuery} />
            <button onClick={handleSearchTrigger} className="bg-[#006838] text-white rounded-md p-2">Search</button>
        </div>
        <div className="w-full overflow-x-auto py-2 px-3">
            {recentSearched.length > 0 && (
                <ul className='flex gap-3'>
                    {recentSearched.map((query, index) => (
                        <li onClick={() => handleSearchedItemClick(query)} key={index} className="py-1 bg-white flex gap-2 items-center shadow px-3 text-[12px] rounded-xl">{query} <Icon icon="mdi:times" className="cursor-pointer" style={{color: 'red',}} onClick={(e) =>{e.stopPropagation();  handleDeleteSearch(query)}} /></li>
                    ))}
                </ul>
            )}
        </div>

        {loading ? (
            <p>Loading products...</p>
        ) : error ? (
            <p className="text-red-500">{error}</p>
        ) : collectedProducts.length > 0 ? (
            <div className='mt-5 grid grid-cols-1 md:grid-cols-3 gap-4'>
                {collectedProducts.map(product => (
                    <Link href={`../dashboard/Product?id=${product._id}`}>
                        <div key={product._id} className='border p-4 rounded-md'>
                            <h2 className='text-lg font-semibold'>{product.name}</h2>
                            <p>{product.description}</p>
                            <p className='text-green-600'>${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <p>No products found.</p>
        )}
                        
    </div>
  )
}

export default page
