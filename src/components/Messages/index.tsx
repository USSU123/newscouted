import React, { useState } from 'react';
import { Search, MoreVertical, Info, Plus } from 'lucide-react';
import ConversationList from './ConversationList';
import MessageThread from './MessageThread';
import { useAuth } from '../../contexts/AuthContext';

export interface Conversation {
  id: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    isRead: boolean;
  };
  isPinned?: boolean;
}

export default function Messages() {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      user: {
        id: '2',
        username: '@creator1',
        displayName: 'Sarah Anderson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150',
        isOnline: true,
      },
      lastMessage: {
        text: "Hey! I'd love to collaborate on your next project!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isRead: false,
      },
      isPinned: true,
    },
    {
      id: '2',
      user: {
        id: '3',
        username: '@creator2',
        displayName: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150',
        isOnline: false,
      },
      lastMessage: {
        text: 'The photoshoot location looks perfect!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true,
      },
    },
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)]">
        <div className="flex h-full">
          {/* Conversations Sidebar */}
          <div className="w-96 border-r border-gray-700 flex flex-col">
            <div className="p-4">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button
                  onClick={() => setShowNewMessage(true)}
                  className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  title="New Message"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <ConversationList
              conversations={filteredConversations}
              activeConversation={activeConversation}
              onSelectConversation={setActiveConversation}
            />
          </div>

          {/* Chat Area */}
          {activeConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={activeConversation.user.avatar}
                      alt={activeConversation.user.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                    {activeConversation.user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {activeConversation.user.displayName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {activeConversation.user.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full">
                    <Info className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <MessageThread conversation={activeConversation} currentUser={user} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-400 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}