import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PetWidget, codexPetAtlas, usePetController } from '../../vendor/codex-pets-react';
import { PetBubble } from './PetBubble';
import { sitePetConfig } from './petConfig';
import { clickPetMessages, initialPetMessage, sectionPetMessages } from './petMessages';
import { usePetVisibility } from './usePetVisibility';

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getSessionPromptCount() {
  const value = Number(window.sessionStorage.getItem(sitePetConfig.sessionPromptKey) ?? '0');
  return Number.isFinite(value) ? value : 0;
}

function incrementSessionPromptCount() {
  window.sessionStorage.setItem(sitePetConfig.sessionPromptKey, String(getSessionPromptCount() + 1));
}

export function SitePet() {
  const { closePet, expandPet, isClosed, isExpanded, isMobile } = usePetVisibility();
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [isContactNearby, setIsContactNearby] = useState(false);
  const promptedSectionsRef = useRef(new Set());
  const lastSectionPromptAtRef = useRef(0);
  const hideTimerRef = useRef(null);

  const { pet, petDispatch } = usePetController({
    initialState: {
      animation: { name: sitePetConfig.defaultAnimation, mode: 'loop' },
      pin: 'bottom-right',
    },
    defaultAnimation: sitePetConfig.defaultAnimation,
    waitingAnimation: sitePetConfig.waitingAnimation,
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

  const showBubble = useCallback((message, duration = sitePetConfig.clickBubbleMs, countAsAutoPrompt = false) => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }

    setBubbleMessage(message);

    if (countAsAutoPrompt) {
      incrementSessionPromptCount();
    }

    hideTimerRef.current = window.setTimeout(() => {
      setBubbleMessage('');
      hideTimerRef.current = null;
    }, duration);
  }, []);

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
          showBubble(target.message, sitePetConfig.sectionBubbleMs, true);
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

    petDispatch({
      type: 'animation.play',
      animation: sitePetConfig.clickAnimation,
      mode: 'once',
      then: sitePetConfig.defaultAnimation,
    });
    showBubble(getRandomItem(clickPetMessages), sitePetConfig.clickBubbleMs);
  };

  const handleClose = () => {
    closePet();
    setBubbleMessage('');
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

      <button
        type="button"
        aria-label="关闭米地米立小助手"
        onClick={handleClose}
        className={`pointer-events-auto fixed z-[52] grid h-7 w-7 place-items-center rounded-full border border-[#cfd9ec] bg-white/90 text-[15px] leading-none text-[#6d7f98] shadow-[0_8px_18px_rgba(72,94,130,0.14)] transition hover:bg-[#f3f7fc] hover:text-[#4f6f97] ${
          isMobile
            ? isContactNearby
              ? 'bottom-[124px] right-3'
              : 'bottom-[78px] right-3'
            : isContactNearby
              ? 'bottom-[300px] right-6'
              : 'bottom-[202px] right-6'
        }`}
      >
        ×
      </button>

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
        src={sitePetConfig.spriteSrc}
        zIndex={51}
      />
    </div>
  );
}
