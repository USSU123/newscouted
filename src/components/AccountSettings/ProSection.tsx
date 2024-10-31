import React from 'react';
import { Shield, Crown, Check } from 'lucide-react';

export default function ProSection() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Tier */}
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-gray-400" />
            <h3 className="text-2xl font-bold text-white">Free</h3>
          </div>
          <p className="text-lg mb-6 text-gray-300">Basic features to get started</p>
          <div className="mb-6">
            <p className="text-3xl font-bold text-white">$0</p>
            <p className="text-sm text-gray-400">Forever free</p>
          </div>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-green-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Basic Profile</p>
                <p className="text-sm text-gray-400">Create and customize your profile</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-green-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Direct Messaging</p>
                <p className="text-sm text-gray-400">Connect with other creators</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-green-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Content Sharing</p>
                <p className="text-sm text-gray-400">Share your content with the community</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-gray-500">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-500">Profile Analytics</p>
                <p className="text-sm text-gray-500">Basic profile view statistics</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-gray-500">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-500">Priority Search</p>
                <p className="text-sm text-gray-500">Appear higher in search results</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-gray-500">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-500">Verified Badge</p>
                <p className="text-sm text-gray-500">Stand out with a verified status</p>
              </div>
            </li>
          </ul>
          <button
            disabled
            className="w-full px-6 py-3 bg-gray-600 text-gray-300 rounded-lg font-semibold cursor-not-allowed"
          >
            Current Plan
          </button>
        </div>

        {/* Pro Tier */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
            MOST POPULAR
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Pro</h3>
          </div>
          <p className="text-lg mb-6 text-gray-100">Enhanced features for creators</p>
          <div className="mb-6">
            <p className="text-3xl font-bold text-white">
              $6.99
              <span className="text-lg font-normal text-gray-200">/month</span>
            </p>
            <p className="text-sm text-gray-200">Billed monthly</p>
          </div>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-yellow-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Basic Profile</p>
                <p className="text-sm text-gray-200">Create and customize your profile</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-yellow-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Direct Messaging</p>
                <p className="text-sm text-gray-200">Connect with other creators</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-yellow-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Content Sharing</p>
                <p className="text-sm text-gray-200">Share your content with the community</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-yellow-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Profile Analytics</p>
                <p className="text-sm text-gray-200">Advanced analytics and insights</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-yellow-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Priority Search</p>
                <p className="text-sm text-gray-200">Appear higher in search results</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 text-yellow-400">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Verified Badge</p>
                <p className="text-sm text-gray-200">Stand out with a verified status</p>
              </div>
            </li>
          </ul>
          <button className="w-full px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-medium text-white mb-4">Subscription Benefits</h4>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-400" />
            <span>Cancel anytime</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-400" />
            <span>24/7 Priority support</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-400" />
            <span>Instant access to all Pro features</span>
          </li>
        </ul>
      </div>
    </div>
  );
}