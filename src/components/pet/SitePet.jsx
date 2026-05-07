import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PetWidget, codexPetAtlas, usePetController } from '../../vendor/codex-pets-react';
import { PetBubble } from './PetBubble';
import { getPetProfile, getSafeAnimation, sitePetConfig } from './petConfig';
import { clickPetMessages, initialPetMessage, sectionPetMessages } from './petMessages';
import { usePetVisibility } from './usePetVisibility';

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(items) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function pickWeightedBehavior(behaviors) {
  const total = behaviors.reduce((sum, item) => sum + Math.max(0, Number(item.weight) || 0), 0);
  if (total <= 0) {
    return behaviors[0] ?? null;
  }

  let cursor = Math.random() * total;
  for (const behavior of behaviors) {
    cursor -= Math.max(0, Number(behavior.weight) || 0);
    if (cursor <= 0) {
      return behavior;
    }
  }

  return behaviors[behaviors.length - 1] ?? null;
}

function getSessionPromptCount() {
  const value = Number(window.sessionStorage.getItem(sitePetConfig.sessionPromptKey) ?? '0');
  return Number.isFinite(value) ? value : 0;
}

function incrementSessionPromptCount() {
  window.sessionStorage.setItem(sitePetConfig.sessionPromptKey, String(getSessionPromptCount() + 1));
}

export function SitePet() {
  const { expandPet, isClosed, isExpanded, isMobile } = usePetVisibility();
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [isContactNearby, setIsContactNearby] = useState(false);
  const [activePetId] = useState(sitePetConfig.activePetId);
  const [spriteVersion, setSpriteVersion] = useState(() => Date.now());
  const promptedSectionsRef = useRef(new Set());
  const lastSectionPromptAtRef = useRef(0);
  const hideTimerRef = useRef(null);
  const ambientSequenceRef = useRef([]);
  const ambientSequenceIndexRef = useRef(0);
  const atlasAnimationNames = useMemo(() => Object.keys(codexPetAtlas.animations), []);
  const activePetProfile = getPetProfile(activePetId) ?? getPetProfile(sitePetConfig.fallbackPetId);
  const defaultAnimation = getSafeAnimation(sitePetConfig.defaultAnimation, activePetProfile, atlasAnimationNames, ['idle']);
  const waitingAnimation = sitePetConfig.waitingAnimation
    ? getSafeAnimation(sitePetConfig.waitingAnimation, activePetProfile, atlasAnimationNames, ['idle'])
    : null;

  useEffect(() => {
    let cancelled = false;

    const verifyPetAssets = async () => {
      if (!activePetProfile) {
        return;
      }

      try {
        const petJsonResponse = await fetch(activePetProfile.petJsonPath, { cache: 'no-store' });
        if (!petJsonResponse.ok) {
          throw new Error(`pet.json missing: ${petJsonResponse.status}`);
        }
        await petJsonResponse.json();

        await new Promise((resolve, reject) => {
          const image = new window.Image();
          image.onload = resolve;
          image.onerror = () => reject(new Error('spritesheet load failed'));
          image.src = `${activePetProfile.spritesheetPath}?t=${Date.now()}`;
        });
        setSpriteVersion(Date.now());
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.warn(`[SitePet] Failed to load locked brand pet "${activePetId}".`, error);
      }
    };

    verifyPetAssets();

    return () => {
      cancelled = true;
    };
  }, [activePetId, activePetProfile]);

  const { pet, petDispatch } = usePetController({
    initialState: {
      animation: { name: defaultAnimation, mode: 'loop' },
      pin: 'bottom-right',
    },
    defaultAnimation,
    waitingAnimation,
    waitingAfterMs: sitePetConfig.waitingAfterMs,
  });

  const scale = isMobile ? sitePetConfig.mobileEntryScale : sitePetConfig.desktopScale;
  const boundsPadding = useMemo(() => {
    const basePadding = isMobile ? sitePetConfig.mobileBoundsPadding : sitePetConfig.desktopBoundsPadding;

    if (!isContactNearby) {
      return basePadding;
    }

    return {
      ...basePadding,
      bottom: isMobile ? basePadding.bottom + 46 : basePadding.bottom + 98,
    };
  }, [isContactNearby, isMobile]);

  const showBubble = useCallback(
    (message, duration = sitePetConfig.clickBubbleMs, countAsAutoPrompt = false, requestedAnimation = null) => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }

      if (requestedAnimation) {
        const safeAnimation = getSafeAnimation(
          requestedAnimation,
          activePetProfile,
          atlasAnimationNames,
          ['waiting', 'idle'],
        );
        petDispatch({
          type: 'animation.play',
          animation: safeAnimation,
          mode: 'once',
          then: defaultAnimation,
        });
      }

      setBubbleMessage(message);

      if (countAsAutoPrompt) {
        incrementSessionPromptCount();
      }

      hideTimerRef.current = window.setTimeout(() => {
        setBubbleMessage('');
        hideTimerRef.current = null;
      }, duration);
    },
    [activePetProfile, atlasAnimationNames, defaultAnimation, petDispatch],
  );

  useEffect(() => {
    if (!sitePetConfig.ambientMotionEnabled || isClosed || (isMobile && !isExpanded)) {
      return undefined;
    }

    let cancelled = false;
    let timer = null;
    let runningResetTimer = null;

    const scheduleNext = () => {
      if (cancelled) {
        return;
      }

      timer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        if (!pet.isDragging && pet.animation.mode === 'loop') {
          let behavior = null;
          if (sitePetConfig.ambientMotionUseSequence && (sitePetConfig.ambientMotionSequence?.length ?? 0) > 0) {
            if (ambientSequenceRef.current.length === 0) {
              ambientSequenceRef.current = shuffleArray(sitePetConfig.ambientMotionSequence);
              ambientSequenceIndexRef.current = 0;
            }

            if (ambientSequenceIndexRef.current >= ambientSequenceRef.current.length) {
              ambientSequenceRef.current = shuffleArray(sitePetConfig.ambientMotionSequence);
              ambientSequenceIndexRef.current = 0;
            }

            behavior = {
              animation: ambientSequenceRef.current[ambientSequenceIndexRef.current],
              mode: ['run-right', 'run-left', 'running'].includes(
                ambientSequenceRef.current[ambientSequenceIndexRef.current],
              )
                ? 'run'
                : 'once',
            };
            ambientSequenceIndexRef.current += 1;
          } else {
            behavior = pickWeightedBehavior(sitePetConfig.ambientMotionBehaviors ?? []);
          }

          const requestedAnimation = behavior?.animation ?? 'idle';
          const safeAnimation = getSafeAnimation(requestedAnimation, activePetProfile, atlasAnimationNames, [
            'wave',
            'jump',
            'idle',
          ]);
          const mode = behavior?.mode ?? 'once';

          if (mode === 'rest') {
            petDispatch({
              type: 'animation.set',
              animation: defaultAnimation,
            });
          } else if (mode === 'run') {
            petDispatch({
              type: 'animation.set',
              animation: safeAnimation,
            });

            if (runningResetTimer) {
              window.clearTimeout(runningResetTimer);
            }

            runningResetTimer = window.setTimeout(() => {
              petDispatch({
                type: 'animation.set',
                animation: defaultAnimation,
              });
            }, getRandomInt(sitePetConfig.ambientMotionRunMinMs, sitePetConfig.ambientMotionRunMaxMs));
          } else {
            petDispatch({
              type: 'animation.play',
              animation: safeAnimation,
              mode: 'once',
              then: defaultAnimation,
            });
          }
        }

        scheduleNext();
      }, getRandomInt(sitePetConfig.ambientMotionMinDelayMs, sitePetConfig.ambientMotionMaxDelayMs));
    };

    scheduleNext();

    return () => {
      cancelled = true;
      if (timer) {
        window.clearTimeout(timer);
      }
      if (runningResetTimer) {
        window.clearTimeout(runningResetTimer);
      }
    };
  }, [
    activePetProfile,
    atlasAnimationNames,
    defaultAnimation,
    isClosed,
    isExpanded,
    isMobile,
    pet.animation.mode,
    pet.isDragging,
    petDispatch,
  ]);

  useEffect(
    () => () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (isClosed || isMobile || !isExpanded || getSessionPromptCount() >= sitePetConfig.maxAutoPromptsPerVisit) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      showBubble(initialPetMessage, sitePetConfig.initialBubbleMs, true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [isClosed, isExpanded, isMobile, showBubble]);

  useEffect(() => {
    if (isClosed || isMobile || !isExpanded) {
      return undefined;
    }

    const targets = [
      { id: 'business', message: sectionPetMessages.business },
      { id: 'individual', message: sectionPetMessages.individual },
      { id: 'solutions-preview', message: sectionPetMessages.solutions },
      { id: 'contact', message: sectionPetMessages.contact },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const target = targets.find((item) => item.id === id);
          const now = Date.now();

          if (
            !entry.isIntersecting ||
            !target ||
            promptedSectionsRef.current.has(id) ||
            getSessionPromptCount() >= sitePetConfig.maxAutoPromptsPerVisit ||
            now - lastSectionPromptAtRef.current < sitePetConfig.sectionPromptCooldownMs
          ) {
            return;
          }

          promptedSectionsRef.current.add(id);
          lastSectionPromptAtRef.current = now;
          showBubble(target.message, sitePetConfig.sectionBubbleMs, true, sitePetConfig.thinkingAnimation);
        });
      },
      {
        root: null,
        threshold: 0.34,
        rootMargin: '-14% 0px -44% 0px',
      },
    );

    targets.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isClosed, isExpanded, isMobile, showBubble]);

  useEffect(() => {
    const contact = document.getElementById('contact');
    if (!contact) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactNearby(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const handlePetAction = useCallback(
    (action) => {
      petDispatch(action);

      if (action.type === 'drag.start') {
        setBubbleMessage('');
      }
    },
    [petDispatch],
  );

  const handlePetClick = () => {
    if (isMobile && !isExpanded) {
      expandPet();
      showBubble(initialPetMessage, sitePetConfig.clickBubbleMs);
      return;
    }

    const clickAnimation = getSafeAnimation(sitePetConfig.clickAnimation, activePetProfile, atlasAnimationNames, [
      'happy',
      'idle',
    ]);

    petDispatch({
      type: 'animation.play',
      animation: clickAnimation,
      mode: 'once',
      then: defaultAnimation,
    });
    showBubble(getRandomItem(clickPetMessages), sitePetConfig.clickBubbleMs);
  };

  if (isClosed || (isMobile && !sitePetConfig.showMobileEntry)) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-label="米地米立 AI 引导助手">
      {!isMobile && isExpanded ? (
        <div
          className={`pointer-events-none fixed right-5 z-50 ${
            isContactNearby ? 'bottom-[322px]' : 'bottom-[224px]'
          }`}
        >
          <PetBubble message={bubbleMessage} onClose={() => setBubbleMessage('')} />
        </div>
      ) : null}

      {isMobile && isExpanded ? (
        <div
          className={`pointer-events-none fixed right-3 z-50 ${
            isContactNearby ? 'bottom-[130px]' : 'bottom-[84px]'
          }`}
        >
          <PetBubble message={bubbleMessage} onClose={() => setBubbleMessage('')} />
        </div>
      ) : null}

      <PetWidget
        ariaLabel="米地米立动态小助手"
        animation={pet.animation}
        atlas={codexPetAtlas}
        boundsPadding={boundsPadding}
        className="pointer-events-auto drop-shadow-[0_12px_22px_rgba(62,83,120,0.20)]"
        draggable={isExpanded || isMobile}
        imageRendering="auto"
        onAction={handlePetAction}
        onClick={handlePetClick}
        pin={pet.pin}
        position={pet.position}
        scale={scale}
        src={`${activePetProfile?.spritesheetPath}?v=${spriteVersion}`}
        zIndex={51}
      />
    </div>
  );
}
