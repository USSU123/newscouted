import React from 'react';
import { Twitter, Instagram, Globe } from 'lucide-react';

interface SocialLinksProps {
  onlyFans?: string;
  patreon?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export default function SocialLinks({ onlyFans, patreon, twitter, instagram, website }: SocialLinksProps) {
  const renderSocialLink = (href: string | undefined, icon: JSX.Element, title: string) => {
    if (!href) return null;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-indigo-400 transition-colors"
        title={title}
      >
        {icon}
      </a>
    );
  };

  const hasAnyLinks = onlyFans || patreon || twitter || instagram || website;

  if (!hasAnyLinks) {
    return (
      <p className="text-gray-400 text-sm">No social links added yet</p>
    );
  }

  return (
    <div className="flex space-x-4">
      {renderSocialLink(
        onlyFans,
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M137.5,75a125,125,0,1,0,125,125A125,125,0,0,0,137.5,75Zm0,162.5A37.5,37.5,0,1,1,175,200,37.45,37.45,0,0,1,137.5,237.5Z"/>
          <path d="M278,168.75c31.76,9.14,69.25,0,69.25,0-10.88,47.5-45.38,77.25-95.13,80.87A124.73,124.73,0,0,1,137.5,325L175,205.81C213.55,83.3,233.31,75,324.73,75H387.5C377,121.25,340.81,156.58,278,168.75Z"/>
        </svg>,
        'OnlyFans'
      )}
      {renderSocialLink(
        patreon,
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1080 1080"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2 C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33 c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"/>
        </svg>,
        'Patreon'
      )}
      {renderSocialLink(twitter, <Twitter className="w-6 h-6" />, 'Twitter')}
      {renderSocialLink(instagram, <Instagram className="w-6 h-6" />, 'Instagram')}
      {renderSocialLink(website, <Globe className="w-6 h-6" />, 'Website')}
    </div>
  );
}