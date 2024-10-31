import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Pin } from 'lucide-react';
import type { Conversation } from './index';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export default function ConversationList({
  conversations,
  activeConversation,
  onSelectConversation,
}: ConversationListProps) {
  // Sort conversations: pinned first, then by timestamp
  const sortedConversations = [...conversations].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime();
  });

  return (
    <div className="flex-1 overflow-y-auto">
      {sortedConversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-800 transition-colors ${
            activeConversation?.id === conversation.id ? 'bg-gray-800' : ''
          }`}
        >
          <div className="relative flex-shrink-0">
            <img
              src={conversation.user.avatar}
              alt={conversation.user.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
            {conversation.user.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-white truncate">
                  {conversation.user.displayName}
                </h3>
                {conversation.isPinned && (
                  <Pin className="h-4 w-4 text-indigo-400" />
                )}
              </div>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-gray-400 truncate">
              {conversation.user.username}
            </p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-400 truncate">
                {conversation.lastMessage.text}
              </p>
              {!conversation.lastMessage.isRead && (
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}