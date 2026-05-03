import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SpriteAnimator } from './SpriteAnimator';
import { clampPetPosition, getPinnedPetPosition, normalizeBoundsPadding } from './positioning';

function getViewportSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function useViewportSize() {
  const [viewport, setViewport] = useState(getViewportSize);

  useEffect(() => {
    const handleResize = () => setViewport(getViewportSize());
    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewport;
}

export function PetWidget({
  src,
  atlas,
  animation,
  position,
  pin,
  draggable = false,
  scale = 1,
  boundsPadding,
  zIndex = 40,
  className,
  style,
  ariaLabel = 'Animated pet',
  imageRendering,
  paused,
  onAction,
  onAnimationComplete,
  onClick,
}) {
  const viewport = useViewportSize();
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const lastPositionRef = useRef(null);
  const didDragRef = useRef(false);

  const size = useMemo(
    () => ({
      width: atlas.cellWidth * scale,
      height: atlas.cellHeight * scale,
    }),
    [atlas.cellHeight, atlas.cellWidth, scale],
  );
  const padding = useMemo(() => normalizeBoundsPadding(boundsPadding), [boundsPadding]);

  const pinnedPosition = useMemo(() => {
    if (!pin) {
      return null;
    }

    return getPinnedPetPosition(pin, size, viewport, padding);
  }, [padding, pin, size, viewport]);

  const controlledPosition = useMemo(() => {
    const next = dragPosition ?? pinnedPosition ?? position ?? getPinnedPetPosition('bottom-right', size, viewport, padding);

    return clampPetPosition(next, size, viewport, padding);
  }, [dragPosition, padding, pinnedPosition, position, size, viewport]);

  useEffect(() => {
    if (!isDragging) {
      setDragPosition(null);
    }
  }, [isDragging, pin, position?.x, position?.y]);

  const emitComplete = useCallback(
    (name) => {
      onAction?.({ type: 'animation.complete', animation: name });
      onAnimationComplete?.(name);
    },
    [onAction, onAnimationComplete],
  );

  const handlePointerDown = useCallback(
    (event) => {
      if (!draggable || event.button !== 0) {
        return;
      }

      event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      const nextPosition = { x: rect.left, y: rect.top };

      didDragRef.current = false;
      dragOffsetRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      lastPositionRef.current = nextPosition;
      setDragPosition(nextPosition);
      setIsDragging(true);
      onAction?.({ type: 'drag.start', position: nextPosition });
    },
    [draggable, onAction],
  );

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }

    const getNextPosition = (event) =>
      clampPetPosition(
        {
          x: event.clientX - dragOffsetRef.current.x,
          y: event.clientY - dragOffsetRef.current.y,
        },
        size,
        viewport,
        padding,
      );

    const handlePointerMove = (event) => {
      const nextPosition = getNextPosition(event);
      const previous = lastPositionRef.current;
      if (previous && (Math.abs(nextPosition.x - previous.x) > 3 || Math.abs(nextPosition.y - previous.y) > 3)) {
        didDragRef.current = true;
      }
      lastPositionRef.current = nextPosition;
      setDragPosition(nextPosition);
      onAction?.({ type: 'drag.move', position: nextPosition });
    };

    const handlePointerUp = (event) => {
      const finalPosition = lastPositionRef.current ?? getNextPosition(event);
      setIsDragging(false);
      setDragPosition(finalPosition);
      onAction?.({ type: 'drag.end', position: finalPosition });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });
    window.addEventListener('pointercancel', handlePointerUp, { once: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, onAction, padding, size, viewport]);

  const handleClick = useCallback(
    (event) => {
      if (didDragRef.current) {
        didDragRef.current = false;
        return;
      }

      onClick?.(event);
    },
    [onClick],
  );

  return (
    <div
      className={className}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex,
        width: size.width,
        height: size.height,
        transform: `translate3d(${controlledPosition.x}px, ${controlledPosition.y}px, 0)`,
        touchAction: 'none',
        userSelect: 'none',
        cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default',
        willChange: 'transform',
        ...style,
      }}
    >
      <SpriteAnimator
        ariaLabel={ariaLabel}
        atlas={atlas}
        imageRendering={imageRendering}
        paused={paused}
        scale={scale}
        src={src}
        animation={animation}
        onAnimationComplete={emitComplete}
      />
    </div>
  );
}
