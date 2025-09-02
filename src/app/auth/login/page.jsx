"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import Footer from "@/components/custom/Footer";
import Navbar from "@/app/components/Navbar";
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Chrome
} from "lucide-react";
import Image from "next/image";
import { 
  signInWithGoogle, 
  loginWithEmail, 
  registerWithEmail,
  initializeFirebase,
} from "../utils/firebase";

const LoginPage = () => {
  const [loadingEmailAuth, setLoadingEmailAuth] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    try {
      initializeFirebase();

      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      toast.error("Error initializing authentication service", {
        style: {
          backgroundColor: "#dc2626",
          color: "white",
          fontWeight: "600",
          fontSize: "14px",
          border: "1px solid #ef4444",
        },
      });
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (isRegistering && !username) {
      errors.username = "Username is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      const result = await signInWithGoogle();

      if (result?.success) {
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success(`Welcome, ${result.user.displayName || "user"}!`, {
          style: {
            backgroundColor: "#065f46",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            border: "1px solid #047857",
          },
          icon: "🎉",
        });
        router.push("/");
      } else {
        toast.error("Login failed", {
          style: {
            backgroundColor: "#dc2626",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            border: "1px solid #ef4444",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to login with Google", {
        style: {
          backgroundColor: "#dc2626",
          color: "white",
          fontWeight: "600",
          fontSize: "14px",
          border: "1px solid #ef4444",
        },
      });
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoadingEmailAuth(true);
      const result = isRegistering
        ? await registerWithEmail(email, password, username)
        : await loginWithEmail(email, password);

      if (result?.success) {
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        const message = isRegistering
          ? `Account created for ${result.user.email}!`
          : `Welcome back, ${result.user.email}!`;
        toast.success(message, {
          style: {
            backgroundColor: "#065f46",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            border: "1px solid #047857",
          },
          icon: "🎉",
        });
        router.push("/");
      } else {
        toast.error("Authentication failed", {
          style: {
            backgroundColor: "#dc2626",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            border: "1px solid #ef4444",
          },
        });
      }
    } catch (error) {
      toast.error("Authentication failed", {
        style: {
          backgroundColor: "#dc2626",
          color: "white",
          fontWeight: "600",
          fontSize: "14px",
          border: "1px solid #ef4444",
        },
      });
    } finally {
      setLoadingEmailAuth(false);
    }
  };

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast Checkout",
      description: "Save your payment info for quick purchases"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Safe",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Exclusive Deals",
      description: "Get access to member-only discounts and offers"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Benefits & Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
             
              
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-teal-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                {isRegistering ? "Start Your Shopping Journey" : "Welcome Back!"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {isRegistering 
                  ? "Create your account to unlock exclusive deals, faster checkout, and personalized shopping experience."
                  : "Sign in to continue your amazing shopping experience with us."
                }
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

        
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              
              {/* Form Header */}
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {isRegistering ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-teal-100 text-sm">
                  {isRegistering 
                    ? "Join our community of smart shoppers" 
                    : "Sign in to your account"
                  }
                </p>
              </div>

              {/* Form Content */}
              <div className="p-8 space-y-6">
                
                {/* Google Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loadingGoogle}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loadingGoogle ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Chrome className="w-5 h-5 text-red-500" />
                  )}
                  {loadingGoogle ? "Signing in..." : "Continue with Google"}
                  {!loadingGoogle && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>

                {/* Divider */}
                <div className="flex items-center">
                  <hr className="flex-grow border-gray-200" />
                  <span className="px-4 text-sm text-gray-500 bg-white">or</span>
                  <hr className="flex-grow border-gray-200" />
                </div>

                {/* Email Form */}
                <div className="space-y-4">
                  
                  {/* Username Field (Registration only) */}
                  {isRegistering && (
                    <div className="space-y-1">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200 ${
                            formErrors.username ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-teal-500'
                          }`}
                        />
                      </div>
                      {formErrors.username && (
                        <p className="text-red-500 text-xs ml-1">{formErrors.username}</p>
                      )}
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-1">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200 ${
                          formErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-teal-500'
                        }`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-500 text-xs ml-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200 ${
                          formErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-teal-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="text-red-500 text-xs ml-1">{formErrors.password}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleEmailAuth}
                    disabled={loadingEmailAuth}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loadingEmailAuth ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isRegistering ? "Creating Account..." : "Signing In..."}
                      </>
                    ) : (
                      <>
                        {isRegistering ? "Create Account" : "Sign In"}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Toggle Auth Mode */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm">
                    {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                      onClick={() => {
                        setIsRegistering(!isRegistering);
                        setFormErrors({});
                        setEmail("");
                        setPassword("");
                        setUsername("");
                      }}
                      className="font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      {isRegistering ? "Sign in" : "Sign up"}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Benefits */}
            <div className="lg:hidden mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
                    <p className="text-gray-600 text-xs">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default LoginPage;