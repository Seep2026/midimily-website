import { useEffect, useReducer } from 'react';
import { createPetState, petReducer } from './petReducer';

export function usePetController({ initialState, defaultAnimation, waitingAnimation, waitingAfterMs } = {}) {
  const [pet, petDispatch] = useReducer(
    (state, action) => petReducer(state, action),
    undefined,
    () => createPetState(initialState),
  );

  useEffect(() => {
    if (!waitingAnimation || !waitingAfterMs || !defaultAnimation) {
      return undefined;
    }

    if (pet.isDragging || pet.animation.mode !== 'loop' || pet.animation.name !== defaultAnimation) {
      return undefined;
    }

    const elapsed = Date.now() - pet.lastInteractionAt;
    const delay = Math.max(0, waitingAfterMs - elapsed);

    const timeout = window.setTimeout(() => {
      petDispatch({
        type: 'animation.set',
        animation: waitingAnimation,
        source: 'system',
      });
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    defaultAnimation,
    pet.animation.mode,
    pet.animation.name,
    pet.isDragging,
    pet.lastInteractionAt,
    waitingAfterMs,
    waitingAnimation,
  ]);

  return { pet, petDispatch };
}
