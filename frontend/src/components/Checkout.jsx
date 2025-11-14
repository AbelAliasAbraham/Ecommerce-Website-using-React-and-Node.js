// src/components/Checkout.jsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// You might need to import Cart if you want to show the list, 
// but for simplicity, we'll just show the total.

const Checkout = () => {
  const { cart } = useSelector((state) => state);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review/Place Order
  
  // State for form data (basic placeholders)
  const [shippingAddress, setShippingAddress] = useState({
    address: '123 Main St',
    city: 'Example City',
    postalCode: '12345',
    country: 'USA',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('Stripe'); 

  // --- Step 1: Shipping Address Component ---
  const ShippingStep = () => (
    <div>
      <h2>1. Shipping Address</h2>
      <div className="form-group">
        <label>Address</label>
        <input 
          type="text" 
          value={shippingAddress.address} 
          onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
        />
      </div>
      {/* ... Add other address fields (city, postalCode, country) ... */}
      
      <button 
        onClick={() => setStep(2)} 
        style={{ marginTop: '15px', backgroundColor: '#2563eb', color: 'white', padding: '10px' }}
      >
        Continue to Payment
      </button>
    </div>
  );

  // --- Step 2: Payment Component ---
  const PaymentStep = () => (
    <div>
      <h2>2. Payment Method</h2>
      <div className="form-group">
        <label>
          <input 
            type="radio" 
            value="Stripe" 
            checked={paymentMethod === 'Stripe'} 
            onChange={(e) => setPaymentMethod(e.target.value)} 
          />
          Stripe (Credit/Debit Card)
        </label>
      </div>
      <div className="form-group">
        <label>
          <input 
            type="radio" 
            value="PayPal" 
            checked={paymentMethod === 'PayPal'} 
            onChange={(e) => setPaymentMethod(e.target.value)} 
          />
          PayPal
        </label>
      </div>

      <button 
        onClick={() => setStep(1)} 
        style={{ marginTop: '15px', marginRight: '10px', backgroundColor: '#6b7280', color: 'white', padding: '10px' }}
      >
        Back to Shipping
      </button>
      <button 
        onClick={() => setStep(3)} 
        style={{ marginTop: '15px', backgroundColor: '#2563eb', color: 'white', padding: '10px' }}
      >
        Continue to Review
      </button>
    </div>
  );

  // --- Step 3: Review and Place Order Component ---
  const ReviewStep = () => {
    
    const placeOrderHandler = () => {
        // 🚨 FINAL STEP: 
        // 1. Send final order data (cart, address, paymentMethod) to the backend.
        // 2. Clear the cart in Redux/localStorage.
        // 3. Navigate to an Order Confirmation page.
        alert('Order Placed Successfully!');
        // dispatch({ type: 'PLACE_ORDER_REQUEST', payload: orderDetails }); 
        // navigate('/order/confirmation');
    };

    return (
      <div>
        <h2>3. Review and Place Order</h2>

        <h3>Order Summary</h3>
        <p>Items: {cart.items.length}</p>
        <p>Total: ${cart.total.toFixed(2)}</p>

        <h3>Shipping To</h3>
        <p>{shippingAddress.address}, {shippingAddress.city}</p>
        <p>Code: {shippingAddress.postalCode}, {shippingAddress.country}</p>

        <h3>Payment Method</h3>
        <p>{paymentMethod}</p>

        <button 
          onClick={() => setStep(2)} 
          style={{ marginTop: '15px', marginRight: '10px', backgroundColor: '#6b7280', color: 'white', padding: '10px' }}
        >
          Back to Payment
        </button>
        <button 
          onClick={placeOrderHandler} 
          style={{ marginTop: '15px', backgroundColor: '#16a34a', color: 'white', padding: '10px' }}
        >
          Place Order
        </button>
      </div>
    );
  };

  // --- Main Checkout Rendering ---
  const renderStep = () => {
    switch (step) {
      case 1:
        return <ShippingStep />;
      case 2:
        return <PaymentStep />;
      case 3:
        return <ReviewStep />;
      default:
        return <ShippingStep />;
    }
  };

  if (cart.items.length === 0) {
    return <div className="container"><h1>Your Cart is Empty. Nothing to Checkout.</h1></div>;
  }

  return (
    <div className="container checkout-container">
      <h1>Checkout</h1>
      <div className="step-indicator" style={{ marginBottom: '20px' }}>
          Step {step} of 3
      </div>
      {renderStep()}
    </div>
  );
};

export default Checkout;