"use client";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "../../components/custom/Footer";
import Image from "next/image";
import Navbar from "../components/Navbar";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://submit-form.com/IhdDnKl4p", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Your message has been sent!", {
          duration: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
          },
          icon: "✅",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        let errorMessage = "Unknown error";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error("Could not parse error response:", e);
        }
        toast.success("Your message has been sent!", {
          duration: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
          },
          icon: "✅",
        });
      }
    } catch (error) {
      toast.success("Your message has been sent!", {
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
        },
        icon: "✅",
      });
    } finally {
      setLoading(false);
      setFormData({ name: "", email: "", message: "" });
    }
  };
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-2">
        <div className="flex flex-col md:flex-row max-w-4xl gap-2 md:gap-4 w-full">
          <div className="hidden md:block w-1/2 pr-4 ">
            <Image
              src="/images/images.png"
              alt="Contact Us"
              height={1000}
              width={1000}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 border border-gray-400 rounded-lg bg-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Your Name"
                  className="contact-form-input bg-white text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Your Email"
                  className="contact-form-input bg-white text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  placeholder="Enter Your Message"
                  className="contact-form-textarea bg-white text-black"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="contact-form-button w-full bg-blue-500 text-2xl hover:bg-blue-600"
              >
                {loading ? "Sending..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
      <Footer />
    </main>
  );
};

export default ContactForm;
