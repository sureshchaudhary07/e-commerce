// app/api/validate-coupon/route.js
import { NextResponse } from 'next/server';
import { validateDiscountCode, calculateDiscount } from '../../../lib/discounts';

export async function POST(request) {
  try {
    const { couponCode, subtotal } = await request.json();

    if (!couponCode || !couponCode.trim()) {
      return NextResponse.json(
        { error: 'Please enter a coupon code' },
        { status: 400 }
      );
    }

    if (!subtotal || subtotal < 0) {
      return NextResponse.json(
        { error: 'Invalid subtotal amount' },
        { status: 400 }
      );
    }

    // Validate the coupon code
    const validation = validateDiscountCode(couponCode, subtotal);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Calculate discount
    const discountResult = calculateDiscount(couponCode, subtotal);
    
    if (discountResult.error) {
      return NextResponse.json(
        { error: discountResult.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      couponCode: discountResult.appliedCode,
      discountAmount: discountResult.discountAmount,
      discountType: discountResult.discountType,
      description: discountResult.discountDescription,
      newTotal: Math.max(0, subtotal - discountResult.discountAmount)
    });

  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate coupon code' },
      { status: 500 }
    );
  }
}