import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from './index';
import type { User } from '../../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface MessageThreadProps {
  conversation: Conversation;
  currentUser: User | null;
}

export default function MessageThread({ conversation, currentUser }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: conversation.user.id,
      text: "Hey! I'd love to collaborate on your next project!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'read',
    },
    {
      id: '2',
      senderId: currentUser?.id || '',
      text: 'That sounds great! What kind of collaboration did you have in mind?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      status: 'read',
    },
    {
      id: '3',
      senderId: conversation.user.id,
      text: 'I was thinking we could do a joint photoshoot. I have access to an amazing location!',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      status: 'read',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Handle sending message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === currentUser?.id;

          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[70%]`}>
                {!isOwnMessage && (
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.displayName}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    isOwnMessage
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
          >
            <ImageIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${
              newMessage.trim()
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </>
  );
}