// lib/discounts.js

// Predefined discount codes
export const DISCOUNT_CODES = {
  'WELCOME10': {
    type: 'percentage',
    value: 10,
    description: '10% off your first order',
    minAmount: 0,
    maxDiscount: 50, // Maximum discount amount in dollars
    isActive: true,
    expiryDate: null, // null means no expiry
  },
  'SAVE20': {
    type: 'percentage',
    value: 20,
    description: '20% off orders over $100',
    minAmount: 100,
    maxDiscount: 100,
    isActive: true,
    expiryDate: null,
  },
  'FLAT15': {
    type: 'fixed',
    value: 15,
    description: '$15 off any order',
    minAmount: 50,
    maxDiscount: 15,
    isActive: true,
    expiryDate: null,
  },
  'NEWUSER': {
    type: 'percentage',
    value: 25,
    description: '25% off for new users',
    minAmount: 30,
    maxDiscount: 75,
    isActive: true,
    expiryDate: new Date('2025-12-31'), // Expires end of 2025
  },
  'FREESHIP': {
    type: 'shipping',
    value: 0,
    description: 'Free shipping on any order',
    minAmount: 0,
    maxDiscount: 0,
    isActive: true,
    expiryDate: null,
  }
};

// Validate discount code
export const validateDiscountCode = (code, subtotal) => {
  const discount = DISCOUNT_CODES[code.toUpperCase()];
  
  if (!discount) {
    return {
      isValid: false,
      error: 'Invalid coupon code'
    };
  }

  if (!discount.isActive) {
    return {
      isValid: false,
      error: 'This coupon code has expired'
    };
  }

  if (discount.expiryDate && new Date() > discount.expiryDate) {
    return {
      isValid: false,
      error: 'This coupon code has expired'
    };
  }

  if (subtotal < discount.minAmount) {
    return {
      isValid: false,
      error: `Minimum order amount of $${discount.minAmount} required for this coupon`
    };
  }

  return {
    isValid: true,
    discount: discount
  };
};

// Calculate discount amount
export const calculateDiscount = (code, subtotal) => {
  const validation = validateDiscountCode(code, subtotal);
  
  if (!validation.isValid) {
    return {
      discountAmount: 0,
      discountType: null,
      error: validation.error
    };
  }

  const discount = validation.discount;
  let discountAmount = 0;

  switch (discount.type) {
    case 'percentage':
      discountAmount = (subtotal * discount.value) / 100;
      // Apply maximum discount limit
      if (discount.maxDiscount && discountAmount > discount.maxDiscount) {
        discountAmount = discount.maxDiscount;
      }
      break;
    
    case 'fixed':
      discountAmount = discount.value;
      // Don't allow discount to exceed subtotal
      if (discountAmount > subtotal) {
        discountAmount = subtotal;
      }
      break;
    
    case 'shipping':
      // For shipping discounts, we'll handle this in the UI
      discountAmount = 0;
      break;
    
    default:
      discountAmount = 0;
  }

  return {
    discountAmount: Math.round(discountAmount * 100) / 100, // Round to 2 decimal places
    discountType: discount.type,
    discountDescription: discount.description,
    appliedCode: code.toUpperCase()
  };
};