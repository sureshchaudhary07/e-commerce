import React from "react";
import { Truck, RefreshCcw, Headphones, CreditCard } from "lucide-react";

const ServicesFeatures = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Above all Orders over 50$.",
      hoverColor: "hover:text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: RefreshCcw,
      title: "7 DAYS EASY RETURN",
      description: "Returns and exchange within 7 days of purchase with complete refund",
      hoverColor: "hover:text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Headphones,
      title: "Online Support",
      description: "24/7 Customer Care support in you order related services",
      hoverColor: "hover:text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: CreditCard,
      title: "SECURE PAYMENT",
      description: "Pay securly with (payment gateway) without any privacy breach",
      hoverColor: "hover:text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                group relative overflow-hidden rounded-xl p-6 
                transition-all duration-300 ease-in-out
                hover:shadow-lg hover:scale-105 
                ${feature.bgColor} bg-opacity-100 hover:bg-opacity-100
              `}
            >
              <div className="flex flex-col  sm:flex-row lg:flex-col items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-4">
                <div className={`
                  p-3 rounded-full 
                  ${feature.bgColor} bg-opacity-20
                  group-hover:bg-white transition-colors duration-300
                `}>
                  <feature.icon 
                    className={`
                      w-6 h-6 sm:w-8 sm:h-8 
                      text-gray-600 
                      ${feature.hoverColor}
                      group-hover:scale-110 
                      transition-all duration-300
                    `} 
                  />
                </div>
                
                <div className="text-center sm:text-left lg:text-center">
                  <h3 className={`
                    font-semibold text-lg uppercase sm:text-xl 
                    text-gray-900 mb-2
                    ${feature.hoverColor}
                    group-hover:translate-x-1
                    transition-all duration-300
                  `}>
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>

            
              <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className={`absolute transform rotate-45 w-full h-full ${feature.bgColor}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesFeatures;