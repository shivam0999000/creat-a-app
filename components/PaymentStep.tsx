
import React, { useState } from 'react';
import { Course } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  selectedCourse: Course | null;
  onPayment: () => void;
  status: 'idle' | 'processing' | 'success' | 'failed';
  onBack: () => void;
}

const PaymentStep: React.FC<Props> = ({ selectedCourse, onPayment, status, onBack }) => {
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1 / $2').trim();
    }
    setCard({ ...card, [name]: formattedValue.slice(0, name === 'number' ? 19 : (name === 'expiry' ? 7 : 4)) });
  };
  
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (card.number.length !== 19) newErrors.number = "Invalid card number.";
    if (!card.name) newErrors.name = "Name on card is required.";
    if (card.expiry.length !== 7) newErrors.expiry = "Invalid expiry date.";
    if (card.cvv.length < 3) newErrors.cvv = "Invalid CVV.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onPayment();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-brand-secondary">Secure Payment</h2>
      <p className="text-gray-600 mb-6">This is a simulated payment gateway. Do not use real credit card information.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="bg-white p-6 rounded-lg border">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input type="text" name="number" id="number" value={card.number} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="0000 0000 0000 0000" />
                        {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
                        <input type="text" name="name" id="name" value={card.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input type="text" name="expiry" id="expiry" value={card.expiry} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="MM / YY"/>
                            {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                        </div>
                        <div className="flex-1">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                            <input type="text" name="cvv" id="cvv" value={card.cvv} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="123" />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <button type="button" onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors">
                        Back
                    </button>
                    <button type="submit" disabled={status === 'processing'} className="bg-brand-success text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-success transition-colors flex items-center disabled:bg-gray-400">
                        {status === 'processing' && <LoadingSpinner size={5} />}
                        <span className="ml-2">Pay ${selectedCourse?.fee.toLocaleString()}</span>
                    </button>
                </div>
            </form>
        </div>

        {/* Order Summary */}
        <div className="bg-brand-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-secondary border-b pb-3 mb-4">Order Summary</h3>
            <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                    <span>Course:</span>
                    <span className="font-medium">{selectedCourse?.name}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Application Fee:</span>
                    <span>${selectedCourse?.fee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Taxes & Fees:</span>
                    <span>$0.00</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-brand-secondary text-lg">
                    <span>Total:</span>
                    <span>${selectedCourse?.fee.toLocaleString()}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
