"use client";
import Image from 'next/image';
import React from 'react';

const PopularBrands = () => {
  const brands = [
    { id: 1, name: 'jbl', logo: '/images/jbl-logo.png' },
    { id: 2, name: 'leehur', logo: '/images/leehur-logo.png' },
    { id: 3, name: 'lg', logo: '/images/lg-logo.png' },
    { id: 4, name: 'mi', logo: '/images/xiaomi-logo.png' },
    { id: 5, name: 'sony', logo: '/images/sony-logo.png' },
    { id: 6, name: 'marshall', logo: '/images/marshall-logo.png' },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white pb-10">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with animated underline */}
        <div className="mb-12  lg:text-left">
          <h2 className="text-4xl font-bold text-gray-800 inline-block relative">
            Popular Brands
           
          </h2>
        </div>

        {/* Brands container with glass morphism effect */}
        <div className=" rounded-2xl ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="group relative"
              >
                {/* Hover card effect */}
                <div className="absolute inset-0 bg-blue-50 rounded-xl transform transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10"></div>
                
                {/* Brand container */}
                <div className="relative flex items-center justify-center p-6 rounded-xl transition-all duration-300 hover:shadow-md border bg-white group-hover:bg-opacity-80">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

               
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;