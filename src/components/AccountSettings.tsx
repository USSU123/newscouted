import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, User, Key, CreditCard, Crown, Check, Video, Rocket } from 'lucide-react';

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [activeSection, setActiveSection] = useState<'profile' | 'email' | 'password' | 'payment' | 'pro'>('profile');
  const [usernameChangeDate, setUsernameChangeDate] = useState<Date | null>(null);
  const [emailChangeRequested, setEmailChangeRequested] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const canChangeUsername = () => {
    if (!usernameChangeDate) return true;
    const daysSinceLastChange = Math.floor((new Date().getTime() - usernameChangeDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceLastChange >= 30;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      switch (activeSection) {
        case 'profile':
          await updateProfile({
            firstName: formData.firstName,
            lastName: formData.lastName,
          });
          break;
        case 'email':
          if (emailChangeRequested) {
            // Handle email verification
            console.log('Verification email sent');
          } else {
            setEmailChangeRequested(true);
          }
          break;
        case 'password':
          // Handle password update
          break;
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const inputClass = "appearance-none block w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-100";
  const labelClass = "block text-sm font-medium text-gray-300";
  const buttonClass = "flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none";

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className={labelClass}>Username</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={inputClass}
                  disabled={!canChangeUsername()}
                />
                {!canChangeUsername() && (
                  <p className="mt-1 text-sm text-yellow-500">
                    Username can only be changed once every 30 days
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="firstName" className={labelClass}>Legal First Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className={labelClass}>Legal Last Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {emailChangeRequested ? (
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">
                  A verification email has been sent to your new email address.
                  Please check your inbox and follow the instructions to complete the change.
                </p>
                <button
                  type="button"
                  onClick={() => setEmailChangeRequested(false)}
                  className="mt-2 text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Cancel change request
                </button>
              </div>
            ) : (
              <div>
                <label htmlFor="currentPassword" className={labelClass}>Current Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Verify your identity"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'password':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className={labelClass}>Current Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className={labelClass}>New Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmNewPassword" className={labelClass}>Confirm New Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Payment Methods</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-600">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-300">Add Payment Method</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Billing History</h3>
              <p className="text-gray-400 text-sm">No billing history available</p>
            </div>
          </div>
        );

      case 'pro':
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
                      <p className="font-medium text-white">Post Character Limit</p>
                      <p className="text-sm text-gray-400">Up to 350 characters per post</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 text-green-400">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Media Quality</p>
                      <p className="text-sm text-gray-400">Videos up to 720p resolution</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 text-gray-500">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Account Boost</p>
                      <p className="text-sm text-gray-500">Not available</p>
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
                      <p className="font-medium text-white">Extended Posts</p>
                      <p className="text-sm text-gray-200">Up to 3,000 characters per post</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 text-yellow-400">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">4K Video Quality</p>
                      <p className="text-sm text-gray-200">Upload and stream in 4K resolution</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 text-yellow-400">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Account Boost</p>
                      <p className="text-sm text-gray-200">$2 for 24-hour visibility boost</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 text-yellow-400">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">All Free Features</p>
                      <p className="text-sm text-gray-200">Plus premium enhancements</p>
                    </div>
                  </li>
                </ul>
                <button className="w-full bg-white text-indigo-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-medium text-white mb-4">Pro Benefits</h4>
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
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="grid grid-cols-12">
            {/* Sidebar */}
            <div className="col-span-3 border-r border-gray-700">
              <nav className="px-4 py-6 space-y-2">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`${buttonClass} w-full justify-start space-x-2 ${
                    activeSection === 'profile'
                      ? 'text-white bg-gray-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveSection('email')}
                  className={`${buttonClass} w-full justify-start space-x-2 ${
                    activeSection === 'email'
                      ? 'text-white bg-gray-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </button>
                <button
                  onClick={() => setActiveSection('password')}
                  className={`${buttonClass} w-full justify-start space-x-2 ${
                    activeSection === 'password'
                      ? 'text-white bg-gray-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Key className="h-5 w-5" />
                  <span>Password</span>
                </button>
                <button
                  onClick={() => setActiveSection('payment')}
                  className={`${buttonClass} w-full justify-start space-x-2 ${
                    activeSection === 'payment'
                      ? 'text-white bg-gray-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment</span>
                </button>
                <button
                  onClick={() => setActiveSection('pro')}
                  className={`${buttonClass} w-full justify-start space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700`}
                >
                  <Crown className="h-5 w-5" />
                  <span>Scouted Pro</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="col-span-9 px-6 py-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {activeSection === 'pro' ? 'Scouted Pro Membership' : 'Account Settings'}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {activeSection === 'pro' 
                    ? 'Upgrade your account to access premium features'
                    : 'Manage your account information and security preferences'}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {renderSection()}

                {activeSection !== 'pro' && (
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}