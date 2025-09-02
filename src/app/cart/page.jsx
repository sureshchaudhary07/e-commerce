"use client";
import React, { useState } from "react";
import { 
  Minus, 
  Plus, 
  Trash2, 
  Tag, 
  X, 
  ShoppingBag, 
  ArrowRight,
  Gift,
  Shield,
  Truck,
  Clock,
  Star,
  Heart,
  AlertCircle,
  CheckCircle,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Footer from "../../components/custom/Footer";
import { Toaster, toast } from 'sonner';
import Navbar from "../components/Navbar";
import getStripe from "../../lib/stripe-client.js";

const CartClient = () => {
  const { cartItems = [], removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);

  // Enhanced toast configuration
  const createToast = (type, message, icon) => {
    const styles = {
      success: {
        backgroundColor: "#065f46",
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        border: "1px solid #047857",
      },
      error: {
        backgroundColor: "#dc2626",
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        border: "1px solid #ef4444",
      },
      info: {
        backgroundColor: "#1e40af",
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        border: "1px solid #3b82f6",
      },
      warning: {
        backgroundColor: "#d97706",
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        border: "1px solid #f59e0b",
      }
    };

    toast[type](message, {
      style: styles[type],
      icon,
      duration: 2000,
    });
  };

  const calculateSubTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (Number(item?.price) || 0) * (item?.quantity || 1),
      0
    );
  };

  const calculateFinalTotal = () => {
    const subtotal = calculateSubTotal();
    return Math.max(0, subtotal - discountAmount);
  };

  const formatPrice = (price) => {
    const safePrice = Number(price) || 0;
    return safePrice.toFixed(2);
  };

  const handleRemoveFromCart = (itemId, itemTitle) => {
    removeFromCart(itemId);
    createToast('error', `Removed ${itemTitle || 'item'} from cart`, "🗑️");
  };

  const handleQuantityUpdate = (itemId, newQuantity, itemTitle) => {
    if (newQuantity < 1) return;
    
    updateQuantity(itemId, newQuantity);
    createToast('success', `Updated ${itemTitle || 'item'} quantity`, "✅");

    if (appliedCoupon) {
      validateCouponCode(appliedCoupon, true);
    }
  };

  const validateCouponCode = async (code = couponCode, silent = false) => {
    if (!code.trim()) {
      if (!silent) {
        createToast('warning', "Please enter a coupon code", "⚠️");
      }
      return;
    }

    const subtotal = calculateSubTotal();
    if (subtotal <= 0) {
      if (!silent) {
        createToast('warning', "Add items to cart before applying coupon", "⚠️");
      }
      return;
    }

    setIsCouponLoading(true);
    
    try {
      const response = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponCode: code,
          subtotal: subtotal
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAppliedCoupon(data.couponCode);
        setDiscountAmount(data.discountAmount);
        setCouponCode("");
        
        if (!silent) {
          createToast('success', `Coupon applied! Saved $${data.discountAmount.toFixed(2)}`, "🎉");
        }
      } else {
        if (!silent) {
          createToast('error', data.error || "Invalid coupon code", "❌");
        }
        if (silent) {
          setAppliedCoupon(null);
          setDiscountAmount(0);
        }
      }
    } catch (error) {
      console.error('Coupon validation error:', error);
      if (!silent) {
        createToast('error', "Failed to validate coupon code", "❌");
      }
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleApplyCoupon = () => {
    validateCouponCode();
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode("");
    createToast('info', "Coupon removed", "ℹ️");
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      createToast('warning', "Your cart is empty", "⚠️");
      return;
    }

    setIsCheckoutLoading(true);
    
    try {
      const validItems = cartItems.filter(item => {
        return item && 
               item.title && 
               item.price && 
               item.price > 0 && 
               item.quantity && 
               item.quantity > 0;
      });

      if (validItems.length === 0) {
        throw new Error('No valid items in cart');
      }

      createToast('info', "Preparing checkout...", "⌛");

      const payload = {
        items: validItems.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description || '',
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image || ''
        })),
        couponCode: appliedCoupon || ''
      };

      const response = await fetch('/api/checkout-simple-fix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${data.details || 'Unknown error'}`);
      }

      if (!data.sessionId) {
        throw new Error('No session ID received from server');
      }

      const stripe = await getStripe();
      
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw new Error(`Stripe error: ${error.message}`);
      }

    } catch (error) {
      createToast('error', error.message || "Checkout failed. Please try again.", "❌");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  // Empty Cart Component
  const EmptyCart = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet. Start exploring our amazing products!
        </p>
        
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
        
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-teal-500" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-500" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-500" />
            <span>Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Cart Item Component
  const CartItem = ({ item, isMobile = false }) => {
    const itemTotal = (item?.price || 0) * (item?.quantity || 1);
    
    if (isMobile) {
      return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                <Image
                  src={item?.image || "/api/placeholder/96/96"}
                  alt={item?.title || "Product"}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {item?.title || "Untitled Product"}
                </h3>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>Color: {item?.color || "Default"}</p>
                  <p>Size: {item?.size || "Standard"}</p>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${formatPrice(item?.price)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleRemoveFromCart(item?.id, item?.title)}
                className="self-start p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => handleQuantityUpdate(item?.id, (item?.quantity || 1) - 1, item?.title)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-all disabled:opacity-50"
                  disabled={(item?.quantity || 1) <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-gray-900">
                  {item?.quantity || 1}
                </span>
                <button
                  onClick={() => handleQuantityUpdate(item?.id, (item?.quantity || 1) + 1, item?.title)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ${formatPrice(itemTotal)}
                </div>
                <div className="text-sm text-teal-600 font-medium">
                  Free Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Product Info */}
          <div className="col-span-5 flex gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
              <Image
                src={item?.image || "/api/placeholder/80/80"}
                alt={item?.title || "Product"}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {item?.title || "Untitled Product"}
              </h3>
              <div className="space-y-1 text-sm text-gray-500">
                <p>Color: {item?.color || "Default"}</p>
                <p>Size: {item?.size || "Standard"}</p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="col-span-2 text-center">
            <span className="text-lg font-semibold text-gray-900">
              ${formatPrice(item?.price)}
            </span>
          </div>

          {/* Quantity */}
          <div className="col-span-2 flex justify-center">
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => handleQuantityUpdate(item?.id, (item?.quantity || 1) - 1, item?.title)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-all disabled:opacity-50"
                disabled={(item?.quantity || 1) <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-semibold text-gray-900">
                {item?.quantity || 1}
              </span>
              <button
                onClick={() => handleQuantityUpdate(item?.id, (item?.quantity || 1) + 1, item?.title)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Shipping */}
          <div className="col-span-1 text-center">
            <span className="text-teal-600 font-medium text-sm">FREE</span>
          </div>

          {/* Total & Actions */}
          <div className="col-span-2 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${formatPrice(itemTotal)}
            </span>
            <button
              onClick={() => handleRemoveFromCart(item?.id, item?.title)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyCart />
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Desktop Header */}
            <div className="hidden lg:grid grid-cols-12 gap-6 text-sm font-semibold text-gray-600 bg-white rounded-2xl border border-gray-200 p-6">
              <div className="col-span-5">PRODUCT DETAILS</div>
              <div className="col-span-2 text-center">PRICE</div>
              <div className="col-span-2 text-center">QUANTITY</div>
              <div className="col-span-1 text-center">SHIPPING</div>
              <div className="col-span-2 text-center">TOTAL</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {/* Desktop Items */}
              <div className="hidden lg:block space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item?.id || Math.random()} item={item} />
                ))}
              </div>

              {/* Mobile Items */}
              <div className="lg:hidden space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item?.id || Math.random()} item={item} isMobile />
                ))}
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-600" />
                Secure Shopping
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Coupon Section */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-teal-600" />
                  Discount Codes
                </h3>
                
                {appliedCoupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">{appliedCoupon}</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-800 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Saved ${formatPrice(discountAmount)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code"
                        disabled={isCouponLoading}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isCouponLoading || !couponCode.trim()}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                          isCouponLoading || !couponCode.trim()
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg'
                        }`}
                      >
                        {isCouponLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Available codes:</p>
                      <div className="flex flex-wrap gap-2">
                        {['WELCOME10', 'SAVE20', 'FLAT15'].map((code) => (
                          <button
                            key={code}
                            onClick={() => setCouponCode(code)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  Order Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${formatPrice(calculateSubTotal())}</span>
                  </div>
                  
                  {appliedCoupon && discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon})</span>
                      <span>-${formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-teal-600 font-medium">FREE</span>
                  </div>
                  
                  <div className="border-t border-teal-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${formatPrice(calculateFinalTotal())}</span>
                    </div>
                    
                    {appliedCoupon && discountAmount > 0 && (
                      <p className="text-green-600 text-sm mt-2 text-center">
                        🎉 You saved ${formatPrice(discountAmount)}!
                      </p>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                  className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isCheckoutLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {isCheckoutLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Secure Checkout
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Fast</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="block w-full text-center bg-white border-2 border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-600 font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default CartClient;