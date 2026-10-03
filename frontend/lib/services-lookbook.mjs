export function getScrollProgress(distance, scrollRange) {
  if (!Number.isFinite(distance) || !Number.isFinite(scrollRange) || scrollRange <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, distance / scrollRange));
}

export function getActiveServiceIndex(progress, serviceCount) {
  if (!Number.isInteger(serviceCount) || serviceCount <= 0 || !Number.isFinite(progress)) {
    return 0;
  }

  const boundedProgress = Math.min(1, Math.max(0, progress));
  return Math.min(serviceCount - 1, Math.floor(boundedProgress * serviceCount));
}

export function getServiceSlideRange(index, serviceCount) {
  if (
    !Number.isInteger(index) ||
    !Number.isInteger(serviceCount) ||
    serviceCount <= 0 ||
    index < 0 ||
    index >= serviceCount
  ) {
    return [0, 1];
  }

  return [index / serviceCount, (index + 1) / serviceCount];
}
