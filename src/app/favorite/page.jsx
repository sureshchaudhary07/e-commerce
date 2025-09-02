"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { Toaster, toast } from "sonner";
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star, 
  Package,
  ArrowRight,
  Grid3X3,
  List,
  Filter,
  SortAsc,
  HeartHandshake,
  Sparkles
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
    {[...Array(8)].map((_, index) => (
      <div
        key={index}
        className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200" />
        <div className="p-6 space-y-3">
          <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-6 bg-gray-200 rounded w-16" />
            <div className="h-10 bg-gray-200 rounded w-24" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded flex-1" />
            <div className="h-10 bg-gray-200 rounded flex-1" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FavoriteItem = ({ item, onRemove, onAddToCart, viewMode }) => {
  const discountPercentage = Math.floor(Math.random() * 30) + 10;
  const originalPrice = item.price * (1 + discountPercentage / 100);
  const isTopRated = item.rating?.rate >= 4.5;

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 aspect-square sm:aspect-auto bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 200px"
            />
            
            {/* Favorite Badge */}
            <div className="absolute top-4 right-4 bg-red-500 p-2 rounded-full shadow-lg">
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            
            {/* Rating Badge */}
            {item.rating && (
              <div className={`absolute bottom-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-lg border ${
                isTopRated 
                  ? 'bg-yellow-400/90 text-yellow-900 border-yellow-300' 
                  : 'bg-white/90 text-gray-700 border-white/20'
              }`}>
                <Star className={`w-3 h-3 inline mr-1 ${
                  isTopRated ? 'fill-yellow-900 text-yellow-900' : 'fill-yellow-400 text-yellow-400'
                }`} />
                {item.rating.rate}
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                  {item.category || 'Featured'}
                </div>
                {isTopRated && (
                  <div className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                    Top Rated
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.price?.toFixed(2)}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    ${originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-green-600 font-semibold">
                  Save ${(originalPrice - item.price).toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onRemove(item)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Remove</span>
              </button>
              
              <button
                onClick={() => onAddToCart(item)}
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          -{discountPercentage}%
        </div>
        
        {/* Favorite Badge */}
        <div className="absolute top-4 right-4 bg-red-500 p-2 rounded-full shadow-lg">
          <Heart className="w-4 h-4 text-white" fill="currentColor" />
        </div>
        
        {/* Rating Badge */}
        {item.rating && (
          <div className={`absolute bottom-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-lg border ${
            isTopRated 
              ? 'bg-yellow-400/90 text-yellow-900 border-yellow-300' 
              : 'bg-white/90 text-gray-700 border-white/20'
          }`}>
            <Star className={`w-3 h-3 inline mr-1 ${
              isTopRated ? 'fill-yellow-900 text-yellow-900' : 'fill-yellow-400 text-yellow-400'
            }`} />
            {item.rating.rate}
            {isTopRated && <span className="ml-1 text-xs">★★★</span>}
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Category & Top Rated */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-teal-600 uppercase tracking-wider">
            {item.category || 'Featured'}
          </div>
          {isTopRated && (
            <div className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
              Top Rated
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 leading-tight group-hover:text-teal-600 transition-colors">
          {item.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${item.price?.toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-400">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
          <div className="text-sm text-green-600 font-semibold">
            Save ${(originalPrice - item.price).toFixed(2)}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onRemove(item)}
            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
          
          <button
            onClick={() => onAddToCart(item)}
            className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-dashed border-gray-200 p-8 text-center">
    <div className="relative mb-6">
      <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center">
        <HeartHandshake className="w-12 h-12 text-red-400" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
    </div>
    
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
      Your Wishlist is Empty
    </h3>
    
    <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
      Start building your dream collection! Browse our amazing products and tap the heart icon to save your favorites.
    </p>
    
    <div className="space-y-4">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <Package className="w-5 h-5" />
        Explore Products
        <ArrowRight className="w-4 h-4" />
      </Link>
      
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-400" />
          <span>Save favorites</span>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-teal-400" />
          <span>Quick add to cart</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>Track price drops</span>
        </div>
      </div>
    </div>
  </div>
);

const Favorites = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewMode, setViewMode] = React.useState('grid');
  const [sortBy, setSortBy] = React.useState('newest');
  const { favorites, removeFromFavorites, addToCart, cartItems } = useCart();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFromFavorites = (product) => {
    removeFromFavorites(product.id);
    toast.success("Removed from favorites", {
      style: {
        backgroundColor: "#dc2626",
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        border: "1px solid #ef4444",
      },
      icon: "💔",
      duration: 2000,
    });
  };

  const handleAddToCart = (product) => {
    const isItemInCart = cartItems.some((item) => item.id === product.id);
    
    if (isItemInCart) {
      toast.error("Item already in cart!", {
        style: {
          backgroundColor: "#d97706",
          color: "white",
          fontWeight: "600",
          fontSize: "14px",
          border: "1px solid #f59e0b",
        },
        icon: "⚠️",
        duration: 2000,
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
      style: {
        backgroundColor: "#065f46",
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        border: "1px solid #047857",
      },
      icon: "🛒",
      duration: 2000,
    });
  };

  const sortedFavorites = React.useMemo(() => {
    const sorted = [...favorites];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }, [favorites, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" fill="currentColor" />
            Personal Collection
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Favorites
          </h1>
          
          {!isLoading && (
            <p className="text-gray-600 text-lg">
              {favorites.length === 0 
                ? "Start building your dream collection" 
                : `${favorites.length} ${favorites.length === 1 ? "item" : "items"} in your wishlist`
              }
            </p>
          )}
        </div>

        {/* Controls */}
        {!isLoading && favorites.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap gap-4 flex-1">
              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 text-black py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="newest">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedFavorites.map((item) => (
              <FavoriteItem 
                key={item.id} 
                item={item} 
                onRemove={handleRemoveFromFavorites}
                onAddToCart={handleAddToCart}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        {!isLoading && favorites.length > 0 && (
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Keep Exploring
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Discover more amazing products to add to your collection
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Package className="w-5 h-5" />
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Favorites;