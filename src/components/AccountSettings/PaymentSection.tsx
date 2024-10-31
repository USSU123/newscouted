import React from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">Payment Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-600 p-2 rounded">
                <CreditCard className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                <p className="text-xs text-gray-400">Expires 12/24</p>
              </div>
            </div>
            <button className="text-sm text-indigo-400 hover:text-indigo-300">
              Edit
            </button>
          </div>
        </div>
        <button className="mt-4 w-full px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-white hover:bg-gray-700">
          Add Payment Method
        </button>
      </div>

      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">Billing History</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Mar 1, 2024</span>
            <span className="text-white">$19.99</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Feb 1, 2024</span>
            <span className="text-white">$19.99</span>
          </div>
        </div>
      </div>
    </div>
  );
}