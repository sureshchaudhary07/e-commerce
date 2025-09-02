import React from 'react';
import Link from 'next/link';

const categories = [
  { id: 1, title: 'TV & Audio', image: '/images/cat-Tv-Audio.webp', href: '/products' },
  { id: 2, title: 'TV Box', image: '/images/catTvBox.webp', href: '/products' },
  { id: 3, title: 'Power Tools', image: '/images/cat-Powertool.webp', href: '/products' },
  { id: 4, title: 'Headphones', image: '/images/cat-Headphone.webp', href: '/products' },
  { id: 5, title: 'Cell Phones', image: '/images/catPhone.webp', href: '/products' },
  { id: 6, title: 'Smart Watches', image: '/images/cat-Smart-Watch.webp', href: '/products' },
  { id: 7, title: 'Game & Video', image: '/images/cat-Gaming.webp', href: '/products' },
  { id: 8, title: 'Robot Clean', image: '/images/cat-Robot-Clean.webp', href: '/products' },
  { id: 9, title: 'Sport Watches', image: '/images/cat-Sport-Watch.webp', href: '/products' },
  { id: 10, title: 'Tablets', image: '/images/cat-Tablet.webp', href: '/products' },
  { id: 11, title: 'Computers & Laptop', image: '/images/cat-Computer.webp', href: '/products' },
  { id: 12, title: 'Cameras & Photos', image: '/images/cat-Camera.webp', href: '/products' },
];

const PopularCategories = () => {
  return (
    <section className="py-6 bg-white">
  <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center mb-8 lg:mt-8 flex-wrap">
    <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-black">
      Popular Categories
    </h2>
    <Link
      href="/products"
      className="bg-[#14B8A6] h-10 md:h-12 px-3  py-2 lg:py-3 lg:px-12 sm:px-8 text-white font-bold rounded focus:outline-none focus:shadow-outline"
    >
      View All
    </Link>
  </div>


        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-center bg-cover transform transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-sm font-medium text-center text-gray-900 group-hover:text-white transition-colors duration-300 backdrop-blur-sm bg-white/70 group-hover:bg-black/50 py-2 rounded-lg">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;