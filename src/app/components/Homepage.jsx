
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

const HomePage = ({ saleText = "Sale 20% Off", description, imgSrc }) => {
  return (
    <main className="w-full bg-white  pt-1  ">
      <Container>
        <div className="relative w-full  min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-2xl" 
         style={{
                      background: `
                                radial-gradient(circle at 0 0, #ffa600, transparent 100%),
                                radial-gradient(circle at 20% 100%, hsla(0, 0%, 99%, .3), transparent 100%),
                                radial-gradient(circle at 100% 100%, red, transparent 100%)
                                `,
                      boxShadow: `inset 0 0 15px 5px rgba(255, 255, 255, 0.7)`, // uniform inset shadow
                    }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left side content */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <div className="space-y-6">
                {/* Sale Text */}
                <h1 className="text-3xl md:text-5xl font-extrabold text-red-600">
                  {saleText}
                </h1>
                {/* Main Title */}
                <p className="text-3xl md:text-5xl font-semibold tracking-wide text-gray-800">
                  On Everything
                </p>
                {/* Description */}
                <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                  {description || "Discover unbeatable prices on quality products, from the latest trends to everyday essentials. Don't miss out on these exclusive, limited-time deals – your perfect find is just a click away!"}
                </p>
                {/* Trust Points */}
                <div className="space-y-3">
                  {[
                    "Free Shipping on Orders Over $50",
                    "24/7 Customer Support",
                    "7 Days Easy Return",
                    "Secure Payment Method"
                  ].map((point, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        ✓
                      </span>
                      <p className="text-md md:text-lg font-medium">{point}</p>
                    </div>
                  ))}
                </div>
                {/* CTA Button */}
                <div className="pt-6">
                  <Link
                    href="/products"
                    className="inline-block px-8 py-4 text-lg bg-red-600 hover:bg-red-700 
                      text-white font-bold rounded-lg transition-all duration-300 
                      hover:scale-105 focus:outline-none focus:ring-2 
                      focus:ring-red-500 focus:ring-opacity-50 active:scale-95"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side images */}
            <div className="relative hidden lg:flex  justify-center ">
              <div className="h-full w-full">
                <Image
                  src={imgSrc || "/images/girlsphoto2.png"} 
                  alt="Featured product" 
                  fill
                  className="rounded-lg object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default HomePage;
