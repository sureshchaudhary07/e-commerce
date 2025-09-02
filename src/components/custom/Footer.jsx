'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Linkedin, Send } from 'lucide-react';

const SHOP_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/products' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Account', href: '/auth/login' }
];

const SUPPORT_LINKS = [
  { name: 'Help Center', href: '/' },
  { name: 'Order Status', href: '/cart' },
  { name: 'Returns', href: '/cart' },
  { name: 'Size Guide', href: '/products' },
  { name: 'Contact Us', href: '/contact' }
];

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-600' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-700' }
];

const FooterLinkSection = ({ title, links }) => (
  <div>
    <h3 className="font-semibold mb-4 text-teal-500 uppercase">{title}</h3>
    <ul className="space-y-2 sm:space-y-4" role="list">
      {links.map(({ name, href }) => (
        <li key={name}>
          <Link 
            href={href}
            className="text-sm text-gray-300 hover:text-white transition-colors"
            aria-label={name}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailMsg("Thanks for subscribing!");
    setTimeout(() => setEmailMsg(''), 2000);
    setEmail('');
  };

  return (
    <footer className="bg-white text-white p-2">
      <div className="max-w-[1320px] mx-auto bg-black text-white px-4 sm:px-6 lg:px-8 py-12 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center bg-black p-3 h-[47px] md:h-[59px] rounded-md"
            >
              <span className="text-yellow-500 text-2xl font-extrabold">E-SHOP</span>
            </Link>
            <p className="text-sm text-gray-300">
              Discover a world of amazing products and unmatched service. We&apos;re committed to bringing you the best shopping experience.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ name, icon: Icon, href, color }) => (
                <Link
                  key={name}
                  href={href}
                  className={`${color} transition-colors`}
                  aria-label={`Follow us on ${name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <FooterLinkSection title="pages" links={SHOP_LINKS} />
          <FooterLinkSection title="Support" links={SUPPORT_LINKS} />

          <div>
            <h3 className="font-semibold text-teal-500 uppercase mb-4">Stay Updated</h3>
            <p className="text-sm mb-4 text-gray-300">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2.5 pr-12 rounded-lg bg-white text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-teal-500 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>
            <p className="text-green-500 text-center pt-2 text-sm">{emailMsg}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;