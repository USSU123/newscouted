import React, { useRef, useEffect, useState } from 'react';
import { MapPin, X } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  username: string;
  displayName: string;
  avatar: string;
}

interface SearchMapProps {
  locations: Location[];
  onLocationSelect: (location: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchMap({ locations, onLocationSelect, isOpen, onClose }: SearchMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!isOpen || !mapRef.current) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center: { lat: 34.0522, lng: -118.2437 }, // Default to LA
      zoom: 10,
    });

    setMap(newMap);

    // Initialize places autocomplete
    const input = document.getElementById('map-search') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['(cities)'],
    });

    autocomplete.bindTo('bounds', newMap);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        newMap.setCenter(place.geometry.location);
        newMap.setZoom(12);
        if (place.formatted_address) {
          onLocationSelect(place.formatted_address);
        }
      }
    });

    // Add escape key listener
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Add new markers
    const newMarkers = locations.map(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.displayName,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <img src="${location.avatar}" alt="${location.displayName}" class="w-12 h-12 rounded-full mb-2">
            <div class="font-semibold">${location.displayName}</div>
            <div class="text-sm text-gray-600">${location.username}</div>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [locations, map]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Filter by Location</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-400 hover:text-white" />
            </button>
          </div>
          <div className="relative">
            <input
              id="map-search"
              type="text"
              placeholder="Search for a location..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500"
            />
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div ref={mapRef} className="h-[600px] w-full" />
      </div>
    </div>
  );
}