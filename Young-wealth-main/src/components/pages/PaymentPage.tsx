import React from 'react';

export const PaymentPage: React.FC = () => (
  <div className="max-w-md mx-auto p-8 bg-white rounded shadow mt-8">
    <h2 className="text-2xl font-bold mb-4">Upgrade Features</h2>
    <p className="mb-4">To unlock upgraded features, please scan the UPI QR code below and pay the required amount. Confirmation will be done via email/manual check.</p>
    <div className="flex justify-center mb-4">
      <img src="/sample-upi-qr.png" alt="UPI QR Code" className="w-48 h-48 border" />
    </div>
    <div className="text-center text-sm text-gray-500">
      <p>After payment, you will receive a confirmation email.</p>
      <p>No complex checkout — just scan & pay!</p>
    </div>
  </div>
);
