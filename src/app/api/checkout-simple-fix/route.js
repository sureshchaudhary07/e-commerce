// app/api/checkout-simple-fix/route.js
// Simplest approach - calculate discount but don't use negative line items

import { NextResponse } from 'next/server';
import stripe from '../../../lib/stripe-server';
import { calculateDiscount } from '../../../lib/discounts';

export async function POST(request) {
  try {
    const { items, couponCode } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    // Validate and process items
    const validItems = items.map(item => ({
      ...item,
      price: parseFloat(item.price) || 0,
      quantity: parseInt(item.quantity) || 1
    })).filter(item => item.price > 0 && item.quantity > 0);

    if (validItems.length === 0) {
      return NextResponse.json(
        { error: 'No valid items found' },
        { status: 400 }
      );
    }

    // Calculate original subtotal
    const originalSubtotal = validItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Calculate discount
    let discountAmount = 0;
    if (couponCode && couponCode.trim()) {
      const discountResult = calculateDiscount(couponCode, originalSubtotal);
      if (!discountResult.error) {
        discountAmount = discountResult.discountAmount;
      }
    }

    // Apply discount by reducing each item's price proportionally
    const discountRatio = discountAmount / originalSubtotal;
    
    const lineItems = validItems.map((item) => {
      // Calculate discounted price for this item
      const itemTotal = item.price * item.quantity;
      const itemDiscount = itemTotal * discountRatio;
      const discountedPrice = Math.max(0.50, item.price - (itemDiscount / item.quantity)); // Minimum 50 cents per item

      const unitAmount = Math.round(discountedPrice * 100); // Convert to cents

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title || 'Product',
            description: item.description || '',
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.max(50, unitAmount), // Minimum 50 cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      metadata: {
        order_id: `order_${Date.now()}`,
        coupon_code: couponCode || '',
        original_subtotal: originalSubtotal.toFixed(2),
        discount_amount: discountAmount.toFixed(2),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'IN'],
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ 
      sessionId: session.id,
      discountApplied: discountAmount > 0,
      discountAmount: discountAmount,
      originalSubtotal: originalSubtotal,
      finalTotal: originalSubtotal - discountAmount
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create payment session',
        details: error.message 
      },
      { status: 500 }
    );
  }
}