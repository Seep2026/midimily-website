export function normalizePetAnimation(animation) {
  if (typeof animation === 'string') {
    return { name: animation, mode: 'loop' };
  }

  return animation;
}
