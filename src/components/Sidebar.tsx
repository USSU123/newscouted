import React from 'react';
import { Users, Bookmark, Calendar, Settings } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: Users, label: 'Friends', count: 289 },
    { icon: Bookmark, label: 'Saved Posts', count: 12 },
    { icon: Calendar, label: 'Events', count: 4 },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="hidden lg:block w-64 fixed h-screen pt-16">
      <div className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}