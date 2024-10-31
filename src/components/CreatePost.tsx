import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';

export default function CreatePost() {
  const [content, setContent] = useState('');

  return (
    <div className="bg-gray-800 rounded-xl shadow-sm p-4 mb-4 border border-gray-700">
      <div className="flex items-start space-x-4">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80"
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 resize-none text-gray-100 placeholder-gray-400"
            rows={3}
          />
          <div className="mt-3 flex items-center justify-between">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400">
              <Image className="h-5 w-5" />
              <span>Add Photo</span>
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                content.trim()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!content.trim()}
            >
              <Send className="h-4 w-4" />
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}