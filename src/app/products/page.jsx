"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import Footer from "../../components/custom/Footer";
import { useCart } from "../context/CartContext";
import { Toaster, toast } from 'sonner';
import Navbar from "@/components/custom/Navbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const { addToCart, cartItems, addToFavorites, removeFavorite, favoriteItems } = useCart();

  useEffect(() => {
    if (favoriteItems) {
      setFavorites(new Set(favoriteItems.map(item => item.id)));
    }
  }, [favoriteItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products. Please try again later.");
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.price - b.price);
        setProducts(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    try {
      if (!product) return;

      const isItemInCart = cartItems.some((item) => item.id === product.id);
      if (isItemInCart) {
        toast.error("Item already in cart!", {
          duration: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
          },
        });
        return;
      }

      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1,
        rating: product.rating,
      };

      addToCart(cartItem);
      toast.success("Added to cart!", {
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
        },
        icon: "✅",
      }); 
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const handleToggleFavorite = (product) => {
    try {
      if (!product) return;
  
      const newFavorites = new Set(favorites);
      const isFavorited = newFavorites.has(product.id);
  
      if (!isFavorited) {
        // Add to favorites
        newFavorites.add(product.id);
        setFavorites(newFavorites);
        addToFavorites(product);
  
        toast.success("Added to favorites!", {
          duration: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
          },
          icon: "❤️",
        });
      }
    } catch (err) {
      console.error('Error adding to favorites:', err);
      toast.error("Failed to add to favorites. Please try again.");
    }
  };
  
  const ProductSkeleton = () => (
    <div className="border border-gray-300 rounded-xl shadow-md overflow-hidden animate-pulse bg-white">
      <div className="w-full h-72 bg-gray-200" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );

  const ProductCard = ({ product }) => {
    const isFavorited = favorites.has(product.id);
    
    return (
      <div className="border border-gray-300 rounded-xl shadow-md overflow-hidden relative bg-white hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-72">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.rating && (
            <span className="absolute bottom-2 left-2 bg-gray-200 px-2 py-1 rounded-md text-gray-600 backdrop-blur-sm">
              {product.rating.rate}
              <span className="text-yellow-500 text-xl ml-1">★</span>
            </span>
          )}
          <button 
            onClick={() => handleToggleFavorite(product)}
            className={`absolute top-2 right-2 p-2 rounded-full border transition-all duration-200 ${
              isFavorited 
                ? 'bg-red-500 hover:bg-red-600 border-red-500' 
                : 'bg-white hover:bg-red-50 border-gray-200'
            }`}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isFavorited ? 'text-white' : 'text-red-500'
              }`}
              fill={isFavorited ? "currentColor" : "none"}
            />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1 text-black line-clamp-1" title={product.title}>
            {product.title}
          </h3>
          <p className="text-gray-700 text-sm mb-4 line-clamp-2" title={product.description}>
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 text-lg font-bold my-2">
            <span>${product.price?.toFixed(2)}</span>
            <span className="line-through font-thin text-gray-400">${(product.price * 1.81).toFixed(2)}</span>

          </div>
          
          <button 
            onClick={() => handleAddToCart(product)}
            className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded 
                     hover:bg-teal-600 transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar/>

      <div className="w-full bg-white pb-4 h-full">
      <main className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 bg-white text-black min-h-screen">
        <div className="flex justify-center items-center mb-8 pt-8">
          <h1 className="text-2xl lg:text-4xl font-bold">Products Collection</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="text-red-500 mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default Products;