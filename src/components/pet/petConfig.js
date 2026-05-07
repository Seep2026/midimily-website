const animationAliasMap = {
  wave: 'waving',
  waving: 'waving',
  jump: 'jumping',
  jumping: 'jumping',
  'run-left': 'running-left',
  'run-right': 'running-right',
  running: 'running',
  idle: 'idle',
  waiting: 'waiting',
  review: 'review',
  failed: 'failed',
  think: 'review',
  happy: 'waving',
  sleep: 'waiting',
};

export const petProfiles = {
  'midimily-penguin': {
    id: 'midimily-penguin',
    name: '小米立',
    basePath: '/assets/pets/midimily-penguin',
    petJsonPath: '/assets/pets/midimily-penguin/pet.json',
    spritesheetPath: '/assets/pets/midimily-penguin/spritesheet.webp',
    brandColor: '#8fb7df',
    availableAnimations: [
      'idle',
      'wave',
      'think',
      'happy',
      'sleep',
      'jump',
      'waiting',
      'run-left',
      'run-right',
      'running',
      'review',
      'failed',
    ],
  },
  'crimson-whoop': {
    id: 'crimson-whoop',
    name: 'Crimson Whoop',
    basePath: '/assets/pets/crimson-whoop',
    petJsonPath: '/assets/pets/crimson-whoop/pet.json',
    spritesheetPath: '/assets/pets/crimson-whoop/spritesheet.webp',
    brandColor: '#9ea9bf',
    availableAnimations: ['idle', 'waving', 'waiting', 'running', 'running-left', 'running-right', 'jumping', 'failed', 'review'],
  },
};

function unique(values) {
  return [...new Set(values)];
}

export function toCanonicalAnimationName(name) {
  if (!name) {
    return null;
  }

  const key = String(name).trim().toLowerCase();
  return animationAliasMap[key] ?? null;
}

function canUseAnimation(name, profileAnimations, atlasAnimations) {
  return profileAnimations.has(name) && atlasAnimations.has(name);
}

export function getSafeAnimation(requestedAnimation, petProfile, atlasAnimationNames, fallbackOrder = ['idle']) {
  const profileAnimations = new Set(
    unique((petProfile?.availableAnimations ?? []).map((item) => toCanonicalAnimationName(item)).filter(Boolean)),
  );
  const atlasAnimations = new Set(
    unique((atlasAnimationNames ?? []).map((item) => toCanonicalAnimationName(item)).filter(Boolean)),
  );
  const requested = toCanonicalAnimationName(requestedAnimation);
  const candidates = unique([requested, ...fallbackOrder.map((item) => toCanonicalAnimationName(item))].filter(Boolean));

  for (const candidate of candidates) {
    if (canUseAnimation(candidate, profileAnimations, atlasAnimations)) {
      return candidate;
    }
  }

  if (canUseAnimation('idle', profileAnimations, atlasAnimations)) {
    return 'idle';
  }

  return atlasAnimations.values().next().value ?? 'idle';
}

export function getPetProfile(petId) {
  return petProfiles[petId] ?? null;
}

export const sitePetConfig = {
  storageKey: 'midimily.sitePet.closed',
  sessionPromptKey: 'midimily.sitePet.sessionPrompts',
  mobileMediaQuery: '(max-width: 767px)',
  showMobileEntry: true,
  maxAutoPromptsPerVisit: 2,
  initialBubbleMs: 7200,
  clickBubbleMs: 6800,
  sectionBubbleMs: 6400,
  sectionPromptCooldownMs: 14000,
  desktopScale: 0.46,
  mobileEntryScale: 0.28,
  activePetId: 'midimily-penguin',
  fallbackPetId: 'midimily-penguin',
  legacyPetId: 'crimson-whoop',
  defaultAnimation: 'idle',
  clickAnimation: 'wave',
  waitingAnimation: null,
  thinkingAnimation: 'think',
  waitingAfterMs: 9000,
  ambientMotionEnabled: true,
  ambientMotionMinDelayMs: 6200,
  ambientMotionMaxDelayMs: 12000,
  ambientMotionRunMinMs: 8600,
  ambientMotionRunMaxMs: 12400,
  ambientMotionUseSequence: true,
  ambientMotionSequence: ['run-right', 'run-left', 'running', 'wave', 'jump', 'review', 'waiting', 'failed'],
  ambientMotionBehaviors: [
    { animation: 'idle', weight: 3, mode: 'rest' },
    { animation: 'wave', weight: 2, mode: 'once' },
    { animation: 'jump', weight: 1, mode: 'once' },
    { animation: 'run-right', weight: 2, mode: 'run' },
    { animation: 'run-left', weight: 2, mode: 'run' },
    { animation: 'running', weight: 2, mode: 'run' },
    { animation: 'review', weight: 2, mode: 'once' },
    { animation: 'waiting', weight: 1, mode: 'once' },
    { animation: 'failed', weight: 1, mode: 'once' },
  ],
  desktopBoundsPadding: {
    top: 92,
    right: 26,
    bottom: 126,
    left: 20,
  },
  mobileBoundsPadding: {
    top: 84,
    right: 16,
    bottom: 22,
    left: 16,
  },
};
