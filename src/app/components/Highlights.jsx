import React from 'react';

const ProductCard = ({ title, price, buttonText, imageUrl, bgColor }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl hover:shadow-lg ${bgColor} p-8 h-[280px] 
      transition-all duration-300 hover:shadow-lg`}
    >
      
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 "
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>

     

      
      <div className="relative z-10 h-full flex flex-col justify-between max-w-[50%]">
        <div className="space-y-2">
          <h2 className={`text-2xl font-bold ${bgColor === 'bg-black' ? 'text-white' : 'text-gray-900'} leading-tight`}>
            {title}
          </h2>
          <p className={`${bgColor === 'bg-black' ? 'text-white' : 'text-gray-700'}`}>
            From ${price}
          </p>
        </div>
        
        <button 
          className={`text-left ${bgColor === 'bg-black' ? 'text-white hover:text-gray-200' : 
            'text-gray-700 hover:text-gray-900'} transition-colors duration-200`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const Highlights = () => {
  const products = [
    {
      title: "New Deals at Best Prices",
      price: "40.00",
      buttonText: "Browse Deals",
      imageUrl: "/images/highlights-one.webp",
      bgColor: "bg-[#f5ebe6]"
    },
    {
      title: "Colorful Redmi Note 6 Pro",
      price: "40.00",
      buttonText: "Shop Cellphone",
      imageUrl: "/images/highlights-Two.webp",
      bgColor: "bg-[#bbd6e8]"
    },
    {
      title: "1000 mAh Power Bank",
      price: "40.00",
      buttonText: "Shop Now",
      imageUrl: "/images/highlights-Three.webp",
      bgColor: "bg-black"
    }
  ];

  return (
    <section className="py-6 bg-white">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
