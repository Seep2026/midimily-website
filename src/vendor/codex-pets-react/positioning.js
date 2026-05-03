const defaultPadding = {
  top: 24,
  right: 24,
  bottom: 24,
  left: 24,
};

export function normalizeBoundsPadding(padding) {
  if (typeof padding === 'number') {
    return {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding,
    };
  }

  return {
    ...defaultPadding,
    ...padding,
  };
}

export function clampPetPosition(position, size, viewport, paddingInput) {
  const padding = normalizeBoundsPadding(paddingInput);
  const minX = padding.left;
  const minY = padding.top;
  const maxX = Math.max(minX, viewport.width - size.width - padding.right);
  const maxY = Math.max(minY, viewport.height - size.height - padding.bottom);

  return {
    x: Math.min(Math.max(position.x, minX), maxX),
    y: Math.min(Math.max(position.y, minY), maxY),
  };
}

export function getPinnedPetPosition(pin, size, viewport, paddingInput) {
  const padding = normalizeBoundsPadding(paddingInput);
  const centerX = (viewport.width - size.width) / 2;
  const centerY = (viewport.height - size.height) / 2;
  const right = viewport.width - size.width - padding.right;
  const bottom = viewport.height - size.height - padding.bottom;

  const positions = {
    'top-left': { x: padding.left, y: padding.top },
    top: { x: centerX, y: padding.top },
    'top-right': { x: right, y: padding.top },
    left: { x: padding.left, y: centerY },
    center: { x: centerX, y: centerY },
    right: { x: right, y: centerY },
    'bottom-left': { x: padding.left, y: bottom },
    bottom: { x: centerX, y: bottom },
    'bottom-right': { x: right, y: bottom },
  };

  return positions[pin] ?? positions['bottom-right'];
}
