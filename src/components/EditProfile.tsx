import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TagSelector from './TagSelector';

interface Tag {
  category: string;
  value: string;
}

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    avatarUrl: user?.avatar || '',
    coverPhoto: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=1920&h=400',
    socialLinks: {
      onlyFans: user?.profile?.socialLinks?.onlyFans || '',
      patreon: user?.profile?.socialLinks?.patreon || '',
      twitter: user?.profile?.socialLinks?.twitter || '',
      instagram: user?.profile?.socialLinks?.instagram || '',
      website: user?.profile?.socialLinks?.website || ''
    }
  });
  const [selectedTags, setSelectedTags] = useState<Tag[]>(user?.profile?.tags || []);
  const [charCount, setCharCount] = useState(formData.bio.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'bio') {
      if (value.length <= 300) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else if (name.startsWith('social.')) {
      const socialNetwork = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialNetwork]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagSelect = (tag: Tag) => {
    if (!selectedTags.some(t => t.category === tag.category && t.value === tag.value)) {
      setSelectedTags(prev => [...prev, tag]);
    }
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
      navigate('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  // Rest of the component remains the same...
}