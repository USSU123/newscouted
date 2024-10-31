import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  user: {
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationsDropdown() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      user: {
        username: '@sarah',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150',
      },
      content: 'liked your photo',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      user: {
        username: '@mike',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150',
      },
      content: 'commented on your post',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: true,
    },
    {
      id: '3',
      type: 'follow',
      user: {
        username: '@emma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150',
      },
      content: 'started following you',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true,
    },
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-pink-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <Link
            key={notification.id}
            to="#"
            className={`block p-4 hover:bg-gray-700 transition-colors ${
              !notification.read ? 'bg-gray-700/50' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <img
                src={notification.user.avatar}
                alt={notification.user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white">
                    {notification.user.username}
                  </span>
                  {getIcon(notification.type)}
                </div>
                <p className="text-sm text-gray-400">{notification.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleDateString(undefined, {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/notifications"
          className="block text-center text-sm text-indigo-400 hover:text-indigo-300"
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
}