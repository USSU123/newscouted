export type SubscriptionTier = 'free' | 'pro';

export interface TierFeature {
  name: string;
  description: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  features: TierFeature[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      {
        name: 'Basic Profile',
        description: 'Create and customize your profile',
        included: true,
      },
      {
        name: 'Direct Messaging',
        description: 'Connect with other creators',
        included: true,
      },
      {
        name: 'Content Sharing',
        description: 'Share your content with the community',
        included: true,
      },
      {
        name: 'Profile Analytics',
        description: 'Basic profile view statistics',
        included: false,
      },
      {
        name: 'Priority Search',
        description: 'Appear higher in search results',
        included: false,
      },
      {
        name: 'Verified Badge',
        description: 'Stand out with a verified status',
        included: false,
      },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 6.99,
    features: [
      {
        name: 'Basic Profile',
        description: 'Create and customize your profile',
        included: true,
      },
      {
        name: 'Direct Messaging',
        description: 'Connect with other creators',
        included: true,
      },
      {
        name: 'Content Sharing',
        description: 'Share your content with the community',
        included: true,
      },
      {
        name: 'Profile Analytics',
        description: 'Advanced analytics and insights',
        included: true,
      },
      {
        name: 'Priority Search',
        description: 'Appear higher in search results',
        included: true,
      },
      {
        name: 'Verified Badge',
        description: 'Stand out with a verified status',
        included: true,
      },
    ],
  },
];