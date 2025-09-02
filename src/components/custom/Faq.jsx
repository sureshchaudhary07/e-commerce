"use client";
import React, { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4 bg-[#F4F5F4] shadow-sm rounded-lg transition-shadow duration-300 p-1 sm:p-4 lg:p-6">
      <button
        className="w-full text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="p-4">
          <span className="text-xl font-semibold text-gray-900">{question}</span>
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className="p-4 pt-0 text-gray-700">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const faqData = [
    {
      question: "What are your shipping and delivery times?",
      answer: "We offer free standard shipping on orders over $50. Standard delivery takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping times vary by destination."
    },
    {
      question: "What is your return and refund policy?",
      answer: "We accept returns within 30 days of purchase for unused items in original packaging. Returns are free for store credit, or with a small fee for refunds to original payment method. Please initiate returns through your account dashboard or contact customer service."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in real-time by logging into your account and visiting the order status page. Our system provides detailed updates from shipment to delivery."
    },
    {
      question: "Do you offer size exchanges?",
      answer: "Yes, we offer free size exchanges within 60 days of purchase. Simply initiate an exchange through your account, and we'll send you a prepaid return label. Once we receive your item, we'll ship the new size right away."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Shop Pay, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption for your safety."
    },
    {
      question: "How do I care for my purchased items?",
      answer: "Care instructions are provided on each product page and included with your purchase. Generally, we recommend following the care label on each item. For specific care questions, please contact our customer service team."
    }
  ];

  return (
    <div className="bg-white py-6">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold  text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
