import React from 'react';
import { X } from 'lucide-react';

interface Tag {
  category: string;
  value: string;
}

interface TagSelectorProps {
  selectedTags: Tag[];
  onTagSelect: (tag: Tag) => void;
  onTagRemove: (tag: Tag) => void;
}

export const tagCategories = {
  'Filming Style': [
    'Solo', 'Duo', 'Group', 'Outdoor', 'Indoor', 'Amateur', 'Professional',
    'Artistic', 'Cinematic', 'Live Stream', 'Vlog Style', 'Roleplay'
  ],
  'Position': [
    'Top', 'Bottom', 'Switch', 'Versatile', 'Dominant', 'Submissive'
  ],
  'Professional Level': [
    'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Influencer', 'Coach/Mentor'
  ],
  'Preferred Content Themes': [
    'Glamour', 'Cosplay', 'Fitness', 'Fantasy', 'Romantic', 'Hardcore',
    'Fetish', 'Kink-Friendly', 'Storytelling', 'ASMR'
  ],
  'Collaboration Type': [
    'Content Exchange', 'Paid Collaboration', 'Guest Appearance',
    'Sponsored Content', 'Promotion/Endorsement'
  ],
  'Content Frequency': [
    'Daily', 'Weekly', 'Monthly', 'Special Events', 'Seasonal', 'Sporadic'
  ],
  'Equipment/Setup': [
    'Professional Studio', 'Home Studio', 'DSLR Camera', 'Mobile Recording',
    'Ring Light', '4K Video', 'Editing Software', 'Lighting Equipment'
  ],
  'Physical Features': [
    'Athletic', 'Curvy', 'Slim', 'Tattoos', 'Piercings',
    'Blonde', 'Brunette', 'Red', 'Other Hair Color'
  ],
  'Audience Type': [
    'LGBTQ+ Friendly', 'Couples', 'Solo Viewers', 'Group/Friends',
    'Global Audience', 'Language-Specific'
  ],
  'Personality & Style': [
    'Playful', 'Intimate', 'Bold', 'Adventurous', 'Caring',
    'Mysterious', 'Funny/Humorous', 'Energetic'
  ]
};

export default function TagSelector({ selectedTags, onTagSelect, onTagRemove }: TagSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTags.map((tag) => (
            <span
              key={`${tag.category}-${tag.value}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-600 text-white"
            >
              {tag.value}
              <button
                onClick={() => onTagRemove(tag)}
                className="ml-2 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Tag Categories */}
      <div className="space-y-6">
        {Object.entries(tagCategories).map(([category, tags]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isSelected = selectedTags.some(
                  (t) => t.category === category && t.value === tag
                );
                return (
                  <button
                    key={tag}
                    onClick={() => onTagSelect({ category, value: tag })}
                    disabled={isSelected}
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white cursor-default'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}