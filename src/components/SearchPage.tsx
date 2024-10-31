import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tagCategories } from './TagSelector';
import SearchMap from './SearchMap';

// ... rest of the imports remain the same

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  // ... rest of the state declarations remain the same

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {/* Filters Panel */}
        <div className={`${
          showFilters ? 'block' : 'hidden lg:block'
        } lg:relative lg:z-0 lg:bg-transparent lg:p-0 mb-6`}>
          {/* ... rest of the filters content remains the same */}
        </div>

        {/* ... rest of the component remains the same */}
      </div>
    </div>
  );
}