"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Navbar from '../../../components/custom/Navbar';
import Footer from '../../../components/custom/Footer';

// Create a separate component that uses useSearchParams
const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Optionally fetch session details from your API
      // For now, we'll just show a success message
      setLoading(false);
    } else {
      // If no session ID, still show success but stop loading
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
       
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
       
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Thank you for your purchase! Your order has been successfully processed.
          You will receive a confirmation email shortly with your order details.
        </p>

        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
            <p className="text-sm text-gray-600">
              Session ID: <span className="font-mono">{sessionId}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

// Loading fallback component
const CheckoutLoading = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading order details...</p>
    </div>
  </div>
);

// Main component wrapped with Suspense
const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<CheckoutLoading />}>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;