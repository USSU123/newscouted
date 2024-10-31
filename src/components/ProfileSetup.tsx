import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TagSelector from './TagSelector';

interface ProfileSetupProps {
  onComplete: () => void;
}

interface Tag {
  category: string;
  value: string;
}

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    avatarUrl: user?.avatar || ''
  });
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [charCount, setCharCount] = useState(0);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (locationInputRef.current && window.google) {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        locationInputRef.current,
        { types: ['(cities)'] }
      );

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          setFormData(prev => ({
            ...prev,
            location: place.formatted_address
          }));
        }
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'bio') {
      if (value.length <= 300) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagSelect = (tag: Tag) => {
    setSelectedTags(prev => [...prev, tag]);
  };

  const handleTagRemove = (tagToRemove: Tag) => {
    setSelectedTags(prev => 
      prev.filter(tag => 
        !(tag.category === tagToRemove.category && tag.value === tagToRemove.value)
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        ...formData,
        tags: selectedTags
      });
      onComplete();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const inputClass = "appearance-none block w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-100";
  const labelClass = "block text-sm font-medium text-gray-300";

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Let others know more about you
        </p>

        <div className="mt-8 bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={formData.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 focus:outline-none"
                >
                  <Camera className="h-5 w-5 text-white" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">Click to upload a new photo</p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="bio" className={labelClass}>Bio</label>
                <span className={`text-sm ${charCount > 250 ? 'text-yellow-500' : 'text-gray-400'}`}>
                  {charCount}/300
                </span>
              </div>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  className={`${inputClass} resize-none`}
                  maxLength={300}
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>Location</label>
              <div className="mt-1">
                <input
                  ref={locationInputRef}
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Start typing your city..."
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Tags</label>
              <div className="mt-4">
                <TagSelector
                  selectedTags={selectedTags}
                  onTagSelect={handleTagSelect}
                  onTagRemove={handleTagRemove}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onComplete}
                className="flex-1 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none"
              >
                Skip for now
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}