import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostProps {
  username: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

export default function Post({ username, avatar, content, image, likes, comments }: PostProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-700">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <img src={avatar} alt={username} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-100">{username}</h3>
            <p className="text-sm text-gray-400">Just now</p>
          </div>
        </div>
        
        <p className="mt-3 text-gray-200">{content}</p>
        
        {image && (
          <div className="mt-3">
            <img src={image} alt="Post content" className="rounded-lg w-full object-cover max-h-96" />
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-400">
              <Heart className="h-5 w-5" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400">
              <MessageCircle className="h-5 w-5" />
              <span>{comments}</span>
            </button>
          </div>
          <button className="text-gray-400 hover:text-gray-200">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}