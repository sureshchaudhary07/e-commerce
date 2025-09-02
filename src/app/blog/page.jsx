'use client'
import { useState } from 'react';
import Head from 'next/head';
import Navbar from "@/components/custom/Navbar";
import Footer from '../../components/custom/Footer';
import Image from 'next/image';


const blogPosts = [
    {
      id: 1,
      title: "The Future of Online Shopping",
      excerpt: "Discover the latest trends shaping e-commerce in 2024, from AI-powered recommendations to virtual shopping experiences...",
      category: "Trends",
      author: "Sarah Johnson",
      date: "2024-03-15",
      readTime: "5 min",
      image: "/images/trends.png"
    },
    {
      id: 2,
      title: "Maximizing Your Online Store Conversion Rate",
      excerpt: "Learn proven strategies to boost your e-commerce conversion rates and transform browsers into buyers...",
      category: "Marketing",
      author: "Mike Chen",
      date: "2024-03-10",
      readTime: "7 min",
      image: "/images/Marketing1.png"
    },
    {
      id: 3,
      title: "Essential E-commerce Security Practices",
      excerpt: "Protect your online store with these security best practices and build customer trust...",
      category: "Security",
      author: "Alex Rivera",
      date: "2024-03-05",
      readTime: "6 min",
      image: "/images/security.png"
    },
    {
      id: 4,
      title: "Mobile Commerce: The Complete Guide",
      excerpt: "Everything you need to know about optimizing your e-commerce store for mobile shoppers...",
      category: "Mobile",
      author: "Lisa Zhang",
      date: "2024-03-02",
      readTime: "8 min",
      image: "/images/mobile.png"
    },
    {
      id: 5,
      title: "Social Commerce Success Stories",
      excerpt: "Case studies of brands that have mastered selling through social media platforms...",
      category: "Marketing",
      author: "Tom Wilson",
      date: "2024-02-28",
      readTime: "6 min",
      image: "/images/Marketing2.png"
    },
    {
      id: 6,
      title: "Sustainable E-commerce Practices",
      excerpt: "How to implement eco-friendly practices in your online store and appeal to conscious consumers...",
      category: "Marketing",
      author: "Emma Green",
      date: "2024-02-25",
      readTime: "5 min",
      image: "/images/Sustainability.png"
    },
    {
      id: 7,
      title: "Payment Gateway Comparison 2024",
      excerpt: "An in-depth analysis of the top e-commerce payment gateways and how to choose the right one...",
      category: "Technology",
      author: "David Kumar",
      date: "2024-02-20",
      readTime: "10 min",
      image: "/images/Technology.png"
    },
    {
      id: 8,
      title: "Customer Service Excellence",
      excerpt: "Transform your customer service from good to great with these proven strategies...",
      category: "Service",
      author: "Rachel Brown",
      date: "2024-02-18",
      readTime: "7 min",
      image: "/images/Service.png"
    },
    {
      id: 9,
      title: "SEO for E-commerce: Complete Guide",
      excerpt: "Master the art of e-commerce SEO with our comprehensive guide to ranking your products...",
      category: "Marketing",
      author: "James Smith",
      date: "2024-02-15",
      readTime: "12 min",
      image: "/images/Marketing3.png"
    },
    {
      id: 10,
      title: "Inventory Management Best Practices",
      excerpt: "Streamline your inventory management with these proven techniques and tools...",
      category: "Technology",
      author: "Maria Garcia",
      date: "2024-02-12",
      readTime: "8 min",
      image: "/images/Technology2.png"
    },
    {
      id: 11,
      title: "Email Marketing Automation",
      excerpt: "Boost your sales with sophisticated email marketing automation strategies...",
      category: "Marketing",
      author: "Chris Taylor",
      date: "2024-02-10",
      readTime: "6 min",
      image: "/images/Marketing4.png"
    },
    {
      id: 12,
      title: "International E-commerce Expansion",
      excerpt: "Your comprehensive guide to taking your online store global...",
      category: "Technology",
      author: "Sophie Martin",
      date: "2024-02-08",
      readTime: "9 min",
      image: "/images/Technology3.png"
    }
  ];
export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))].sort();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts
    .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-white w-full ">
      <Navbar />
      <div className='max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 mb-3'>
      <div className="bg-white  py-8">
        <div className="mx-auto px-4 sm:px-6 ">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-5xl">
              E-commerce Blog
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Stay updated with the latest insights, trends, and tips in the world of e-commerce
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-[1380px] px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-2 border text-black border-gray-300 rounded-md transition-shadow duration-200 shadow-sm hover:shadow-md"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-[1380px]  mx-auto   ">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No posts found matching your criteria.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  height={1000}
                  width={1000}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime} read</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      By {post.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      </div>
      <Footer/>
    </div>
  );
}
