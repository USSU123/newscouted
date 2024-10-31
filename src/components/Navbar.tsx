import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, MessageCircle, Search, LogOut, Settings, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationsDropdown from './NotificationsDropdown';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-gray-800 border-b border-gray-700 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0">
              <svg className="w-8 h-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M0 0 C0.76316528 -0.00100708 1.52633057 -0.00201416 2.31262207 -0.00305176 C13.70878819 0.00713677 24.57836787 0.5021998 35.6875 3.25 C36.88117188 3.54003906 38.07484375 3.83007812 39.3046875 4.12890625 C42.81056648 5.0619854 46.24245545 6.11325129 49.6875 7.25 C50.30802246 7.45463867 50.92854492 7.65927734 51.56787109 7.87011719 C90.97200314 21.11370641 121.96071774 49.3909365 140.6875 86.25 C151.15910563 107.95478257 155.91857629 130.58482962 155.9375 154.625 C155.93851212 155.77415894 155.93851212 155.77415894 155.93954468 156.9465332 C155.92401142 168.02479317 155.50148667 178.48000283 152.6875 189.25 C152.33183797 190.73042233 151.97637874 192.21089339 151.62109375 193.69140625 C149.02570843 204.05977856 145.26377389 213.6090332 140.6875 223.25 C140.05521484 224.63445312 140.05521484 224.63445312 139.41015625 226.046875 C132.42311289 240.82082527 121.72837208 253.35983006 110.6875 265.25 C110.14867187 265.84296875 109.60984375 266.4359375 109.0546875 267.046875 C103.2479409 273.17459755 96.38618797 278.15137231 89.6875 283.25 C88.80191406 283.930625 87.91632813 284.61125 87.00390625 285.3125 C60.22379758 305.36624752 29.19880394 320.97901457 -2.46875 331.64453125 C-3.2333252 331.91056152 -3.99790039 332.1765918 -4.78564453 332.45068359 C-7.3125 333.25 -7.3125 333.25 -10.42919922 333.95947266 C-16.46171464 335.38072894 -16.46171464 335.38072894 -20.85449219 339.4309082 C-21.96768874 342.26279353 -22.73209279 345.04023967 -23.4375 348 C-24.06370587 350.18717565 -24.69806502 352.37203059 -25.33984375 354.5546875 C-25.65808105 355.67069336 -25.97631836 356.78669922 -26.30419922 357.93652344 C-33.91167537 382.93620051 -47.00532584 407.47394338 -61.3125 429.25 C-61.77398437 429.95334473 -62.23546875 430.65668945 -62.7109375 431.38134766 C-80.41223899 458.14723137 -102.20831796 481.88799435 -131.3125 496.25 C-132.31410156 496.75015625 -133.31570312 497.2503125 -134.34765625 497.765625 C-155.4147892 507.90242287 -177.35983488 512.47883287 -200.625 512.5 C-201.38816528 512.50100708 -202.15133057 512.50201416 -202.93762207 512.50305176 C-214.33378819 512.49286323 -225.20336787 511.9978002 -236.3125 509.25 C-237.50617188 508.95996094 -238.69984375 508.66992188 -239.9296875 508.37109375 C-243.43556648 507.4380146 -246.86745545 506.38674871 -250.3125 505.25 C-251.24328369 504.94304199 -251.24328369 504.94304199 -252.19287109 504.62988281 C-291.59700314 491.38629359 -322.58571774 463.1090635 -341.3125 426.25 C-351.78410563 404.54521743 -356.54357629 381.91517038 -356.5625 357.875 C-356.56317474 357.10889404 -356.56384949 356.34278809 -356.56454468 355.5534668 C-356.54900818 344.47289155 -356.11949256 334.02339654 -353.3125 323.25 C-352.97972595 321.82829866 -352.6477277 320.40641556 -352.31640625 318.984375 C-345.45057659 290.91479531 -330.79227405 268.22821821 -311.3125 247.25 C-310.77367187 246.65703125 -310.23484375 246.0640625 -309.6796875 245.453125 C-303.87366443 239.32616599 -297.0128945 234.34505184 -290.3125 229.25 C-289.39210938 228.54617187 -288.47171875 227.84234375 -287.5234375 227.1171875 C-279.76756678 221.329574 -271.59842889 216.23475403 -263.3125 211.25 C-262.714375 210.88825684 -262.11625 210.52651367 -261.5 210.15380859 C-244.29887332 199.84945062 -225.73566043 190.83400168 -207 183.6875 C-206.16162598 183.36128662 -205.32325195 183.03507324 -204.45947266 182.69897461 C-200.55722462 181.23669683 -196.87982263 180.09886553 -192.75 179.50390625 C-186.55432942 178.50596437 -186.55432942 178.50596437 -181.3125 175.25 C-177.57617597 168.96148795 -176.107441 161.55587337 -174.25634766 154.54736328 C-172.76208929 149.32712183 -170.74277847 144.36913312 -168.625 139.375 C-168.2112915 138.3960376 -167.79758301 137.4170752 -167.37133789 136.40844727 C-159.42533004 117.96176828 -150.34714959 100.04515127 -139.3125 83.25 C-138.85101563 82.54665527 -138.38953125 81.84331055 -137.9140625 81.11865234 C-120.21276101 54.35276863 -98.41668204 30.61200565 -69.3125 16.25 C-67.81009766 15.49976563 -67.81009766 15.49976563 -66.27734375 14.734375 C-45.2102108 4.59757713 -23.26516512 0.02116713 0 0" fill="currentColor" transform="translate(356.3125,-0.25)"/>
              </svg>
            </Link>
            <div className="flex items-center">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`h-6 w-6 text-gray-300 hover:text-indigo-400 ${showSearch ? 'hidden md:block' : ''}`}
              >
                <Search className="h-6 w-6" />
              </button>
              {showSearch && (
                <div className="relative flex items-center ml-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/explore" className="h-6 w-6 text-gray-300 hover:text-indigo-400">
              <Globe className="h-6 w-6" />
            </Link>
            <Link to="/messages" className="h-6 w-6 text-gray-300 hover:text-indigo-400">
              <MessageCircle className="h-6 w-6" />
            </Link>
            <div ref={notificationsRef} className="relative h-6 w-6">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-300 hover:text-indigo-400 h-6 w-6"
              >
                <Bell className="h-6 w-6" />
              </button>
              {showNotifications && <NotificationsDropdown />}
            </div>
            <Link to="/settings" className="h-6 w-6 text-gray-300 hover:text-indigo-400">
              <Settings className="h-6 w-6" />
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:opacity-75 transition-opacity"
            >
              <img
                src={user?.avatar}
                alt={user?.username}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-300">{user?.username}</span>
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-gray-300 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}