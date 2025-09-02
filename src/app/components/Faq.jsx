"use client";
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone,
  Search,
  Clock,
  Shield,
  Truck,
  RefreshCw,
  CreditCard,
  Heart
} from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick, icon }) => {
  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <button
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-2xl"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question}`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              isOpen 
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white' 
                : 'bg-gray-100 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-600'
            }`}>
              {icon}
            </div>
            <span className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300 pr-4">
              {question}
            </span>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-teal-500 text-white rotate-180' 
              : 'bg-gray-100 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-600'
          }`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>
      
      <div
        id={`faq-answer-${question}`}
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 pb-6">
          <div className="pl-14 border-l-2 border-teal-100">
            <div className="pl-4">
              <p className="text-gray-700 leading-relaxed">{answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, description, action, actionText }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button 
          onClick={action}
          className="text-teal-600 hover:text-teal-700 font-medium text-sm group-hover:underline transition-colors"
        >
          {actionText} →
        </button>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      question: "What are your shipping and delivery times?",
      answer: "We offer free standard shipping on orders over $50. Standard delivery takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping times vary by destination.",
      icon: <Truck className="w-5 h-5" />,
      category: "shipping"
    },
    {
      question: "What is your return and refund policy?",
      answer: "We accept returns within 30 days of purchase for unused items in original packaging. Returns are free for store credit, or with a small fee for refunds to original payment method. Please initiate returns through your account dashboard or contact customer service.",
      icon: <RefreshCw className="w-5 h-5" />,
      category: "returns"
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in real-time by logging into your account and visiting the order status page. Our system provides detailed updates from shipment to delivery.",
      icon: <Search className="w-5 h-5" />,
      category: "tracking"
    },
    {
      question: "Do you offer size exchanges?",
      answer: "Yes, we offer free size exchanges within 60 days of purchase. Simply initiate an exchange through your account, and we'll send you a prepaid return label. Once we receive your item, we'll ship the new size right away.",
      icon: <RefreshCw className="w-5 h-5" />,
      category: "exchanges"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Shop Pay, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption for your safety.",
      icon: <CreditCard className="w-5 h-5" />,
      category: "payment"
    },
    {
      question: "How do I care for my purchased items?",
      answer: "Care instructions are provided on each product page and included with your purchase. Generally, we recommend following the care label on each item. For specific care questions, please contact our customer service team.",
      icon: <Heart className="w-5 h-5" />,
      category: "care"
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely! We use industry-standard SSL encryption to protect your personal and payment information. We never store your credit card details on our servers, and we comply with all data protection regulations including GDPR and CCPA.",
      icon: <Shield className="w-5 h-5" />,
      category: "security"
    },
    {
      question: "What are your customer service hours?",
      answer: "Our customer service team is available Monday through Friday, 9 AM to 8 PM EST, and weekends 10 AM to 6 PM EST. You can reach us via live chat, email, or phone. We typically respond to emails within 24 hours.",
      icon: <Clock className="w-5 h-5" />,
      category: "support"
    }
  ];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-teal-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            Help & Support
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-teal-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our products, shipping, returns, and more. 
            Can&apos;t find what you&apos;re looking for? Our support team is here to help!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 text-lg"
            />
          </div>
          
          {searchTerm && (
            <div className="mt-3 text-sm text-gray-600">
              {filteredFAQs.length === 0 
                ? "No results found. Try different keywords or browse all questions below."
                : `Found ${filteredFAQs.length} question${filteredFAQs.length !== 1 ? 's' : ''} matching "${searchTerm}"`
              }
            </div>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or browse all questions below
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                icon={faq.icon}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))
          )}
        </div>

        {/* Contact Support Section */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-8 lg:p-12 text-white text-center mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Still Have Questions?
          </h3>
          <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
            Our friendly support team is here to help you 24/7. Get in touch through your preferred method.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <ContactCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Live Chat"
              description="Get instant help from our support team"
              actionText="Start Chat"
              action={() => console.log('Open live chat')}
            />
            
            <ContactCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Support"
              description="Send us a detailed message anytime"
              actionText="Send Email"
              action={() => window.location.href = 'mailto:support@example.com'}
            />
            
            <ContactCard
              icon={<Phone className="w-6 h-6" />}
              title="Phone Support"
              description="Speak directly with our experts"
              actionText="Call Now"
              action={() => window.location.href = 'tel:+1-800-123-4567'}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Shipping Info", icon: <Truck className="w-5 h-5" /> },
            { label: "Return Policy", icon: <RefreshCw className="w-5 h-5" /> },
            { label: "Track Order", icon: <Search className="w-5 h-5" /> },
            { label: "Size Guide", icon: <Heart className="w-5 h-5" /> }
          ].map((link, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-teal-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gray-100 group-hover:bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors">
                <div className="text-gray-600 group-hover:text-teal-600 transition-colors">
                  {link.icon}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors">
                {link.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FAQ;