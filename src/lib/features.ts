export const siteFeatures = {
  followEnabled: true,
  premiumEnabled: false,
  unfilteredEnabled: false,
  letterRequestsEnabled: false,
} as const;

export function isPremiumExperienceEnabled() {
  return siteFeatures.premiumEnabled;
}
