import { useEffect, useMemo, useRef, useState } from 'react';
import { normalizePetAnimation } from './animation';

export function SpriteAnimator({
  src,
  atlas,
  animation,
  scale = 1,
  paused = false,
  className,
  style,
  ariaLabel,
  imageRendering = 'auto',
  onAnimationComplete,
}) {
  const [frame, setFrame] = useState(0);
  const completedRef = useRef(false);
  const animationState = useMemo(() => normalizePetAnimation(animation), [animation]);
  const definition = atlas.animations[animationState.name];

  useEffect(() => {
    completedRef.current = false;
    setFrame(0);
  }, [animationState.mode, animationState.name, animationState.then]);

  useEffect(() => {
    if (paused || !definition || completedRef.current) {
      return undefined;
    }

    const duration =
      definition.frameDurations[frame] ??
      definition.frameDurations[definition.frameDurations.length - 1] ??
      150;

    const timeout = window.setTimeout(() => {
      const nextFrame = frame + 1;

      if (nextFrame >= definition.frames) {
        if (animationState.mode === 'once') {
          completedRef.current = true;
          setFrame(Math.max(0, definition.frames - 1));
          onAnimationComplete?.(animationState.name);
          return;
        }

        setFrame(0);
        return;
      }

      setFrame(nextFrame);
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [animationState.mode, animationState.name, definition, frame, onAnimationComplete, paused]);

  if (!definition) {
    return null;
  }

  const baseWidth = atlas.cellWidth;
  const baseHeight = atlas.cellHeight;
  const width = baseWidth * scale;
  const height = baseHeight * scale;
  const backgroundWidth = atlas.columns * baseWidth;
  const backgroundHeight = atlas.rows * baseHeight;

  return (
    <div
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      className={className}
      role={ariaLabel ? 'img' : undefined}
      style={{
        width,
        height,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: baseWidth,
          height: baseHeight,
          backgroundImage: `url("${src}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
          backgroundPosition: `${-frame * baseWidth}px ${-definition.row * baseHeight}px`,
          imageRendering,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
}
