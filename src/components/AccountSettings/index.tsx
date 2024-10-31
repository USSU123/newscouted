import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Mail, User, Key, CreditCard, Crown } from 'lucide-react';
import ProfileSection from './ProfileSection';
import EmailSection from './EmailSection';
import PasswordSection from './PasswordSection';
import PaymentSection from './PaymentSection';
import ProSection from './ProSection';

type Section = 'profile' | 'email' | 'password' | 'payment' | 'pro';

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    email: user?.email || '',
    newEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendVerification = () => {
    setIsVerificationSent(true);
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
        // Handle other section submissions
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const buttonClass = "flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none";

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <ProfileSection
            formData={formData}
            onChange={handleChange}
          />
        );
      case 'email':
        return (
          <EmailSection
            formData={formData}
            onChange={handleChange}
            isVerificationSent={isVerificationSent}
            onSendVerification={handleSendVerification}
          />
        );
      case 'password':
        return (
          <PasswordSection
            formData={formData}
            onChange={handleChange}
          />
        );
      case 'payment':
        return <PaymentSection />;
      case 'pro':
        return <ProSection />;
      default:
        return null;
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