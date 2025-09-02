'use client'
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, Heart } from "lucide-react";
import Image from "next/image";
import { useCart } from "../../app/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming you're using react-toastify
import { logoutUser } from "../../app/auth/utils/firebase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { cartItems, getFavoritesCount } = useCart();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const cartItemCount =
    cartItems?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  const favoriteCount = getFavoritesCount();
  
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    }
    checkUser();
    window.addEventListener('focus', checkUser);
    
    return () => {
      window.removeEventListener('focus', checkUser);
    };
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      const result = await logoutUser();
      
      if (result.success) {
        setUser(null);
        toast.success("Logged out successfully");
        
        // Force a full page refresh and redirect to home
        window.location.href = "/";
      } else {
        toast.error("Logout failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout: " + (error.message || "Unknown error"));
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getLinkClassName = (path) =>
    `${
      pathname === path
        ? "text-teal-500 uppercase font-bold"
        : "text-white uppercase font-bold"
    } 
      transition-colors duration-200 hover:text-teal-500`;

  const getIconLinkClassName = (path) =>
    `${
      pathname === path
        ? "bg-teal-500 text-white"
        : "bg-gray-200 text-gray-600 hover:text-teal-500"
    } 
      p-2 rounded-md relative transition-all duration-200 transform`;

  const handleCartClick = () => {
    if (!user) {
      toast.info("Please login first to view your cart.");
      router.push("/auth/login");
    }
  };

  return (
    <nav className="bg-white z-50 py-1 sticky top-0 shadow-sm">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 group">
            <Link
              href="/"
              className="flex items-center bg-black p-3 h-[47px] md:h-[59px] rounded-md"
            >
              <span className="text-yellow-500 text-2xl font-extrabold w-[100px] transition-transform duration-300 group-hover:scale-105">
                E-SHOP
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 bg-black w-full mx-3 p-3 h-[58px] rounded-md justify-start">
            <Link href="/" className={getLinkClassName("/")}>
              Home
            </Link>
            <Link href="/products" className={getLinkClassName("/products")}>
              Shop
            </Link>
            <Link href="/blog" className={getLinkClassName("/blog")}>
              Blog
            </Link>
            <Link href="/contact" className={getLinkClassName("/contact")}>
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 bg-black p-3 rounded-lg relative">
            {user ? (
              <div className="relative group flex items-center space-x-4">
                {user.photoURL ? (
                  <div
                    onClick={toggleLogoutModal}
                    className="rounded-md cursor-pointer h-8 w-8"
                  >
                    <Image
                      src={user.photoURL}
                      alt="User Profile"
                      width={80}
                      height={100}
                      className="rounded-md "
                    />
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className={getIconLinkClassName("/login")}
                  >
                    <User className="h-5 w-5" />
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className={getIconLinkClassName("/login")}>
                <User className="h-5 w-5" />
              </Link>
            )}

            <Link
              href="/favorite"
              className={getIconLinkClassName("/favorite")}
            >
              <Heart className="h-5 w-5" />
              {favoriteCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoriteCount}
                </div>
              )}
            </Link>

            <button onClick={handleCartClick} className={getIconLinkClassName("/cart")}>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </Link>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-yellow-600 text-xl bg-black p-3 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out rounded-md fixed top-[70px] left-[3%] w-[93%] ${
            isMenuOpen
              ? "max-h-screen opacity-100 bg-black z-40"
              : "max-h-0 opacity-0 overflow-hidden z-30"
          }`}
        >
          <div className="px-2 flex flex-col pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={getLinkClassName("/")}>
              Home
            </Link>
            <Link href="/products" className={getLinkClassName("/products")}>
              Shop
            </Link>
            <Link href="/blog" className={getLinkClassName("/blog")}>
              Blog
            </Link>
            <Link href="/contact" className={getLinkClassName("/contact")}>
              Contact
            </Link>
          </div>
          <div className="flex gap-8 p-3">
            {user ? (
              <div className="h-full">
                {user.photoURL ? (
                  <div
                    onClick={toggleLogoutModal}
                    className="rounded-md cursor-pointer"
                  >
                    <Image
                      src={user.photoURL}
                      alt="User Profile"
                      width={40}
                      height={37}
                      className="rounded-md"
                    />
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className={getIconLinkClassName("/login")}
                  >
                    <User className="h-5 w-5" />
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className={getIconLinkClassName("/login")}>
                <User className="h-5 w-5" />
              </Link>
            )}
            <Link href="/favorite" className={getIconLinkClassName("/favorite")}>
              <Heart className="h-5 w-5" />
            </Link>
            <button onClick={handleCartClick} className={getIconLinkClassName("/cart")}>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </Link>
            </button>
          </div>
        </div>

{isLogoutModalOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
    <div 
      className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-in zoom-in-95"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Logout Confirmation
            </h3>
            <p className="text-sm text-gray-500">
              This action will end your current session
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-orange-400">
          <p className="text-gray-700 text-sm leading-relaxed">
            Are you sure you want to log out? You&apos;ll need to sign in again to access your account, 
            saved items, and order history.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-4">
        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Quick tip:</span>
            <span>You can stay logged in for faster shopping</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={toggleLogoutModal}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Stay Logged In
        </button>
        
        <button
          onClick={handleLogout}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Yes, Logout
        </button>
      </div>

      {/* Security Note */}
      <div className="px-6 pb-6">
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500 text-center">
            For security reasons, you&apos;ll be automatically logged out after 30 minutes of inactivity
          </p>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </nav>
  );
};

export default Navbar;