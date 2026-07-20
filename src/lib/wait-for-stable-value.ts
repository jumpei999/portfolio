type StableValuePollerOptions = {
  readValue: () => number;
  stableFrames: number;
  onStable: () => void;
  isDone: () => boolean;
};

export function createStableValuePoller({
  readValue,
  stableFrames: requiredStableFrames,
  onStable,
  isDone,
}: StableValuePollerOptions) {
  let rafId = 0;
  let lastValue = readValue();
  let stableFrames = 0;

  const cancel = () => {
    cancelAnimationFrame(rafId);
    rafId = 0;
  };

  const resetStability = () => {
    stableFrames = 0;
  };

  const tick = () => {
    if (isDone()) {
      cancel();
      return;
    }

    const value = readValue();

    if (value === lastValue) {
      stableFrames += 1;
      if (stableFrames >= requiredStableFrames) {
        onStable();
        cancel();
        return;
      }
    } else {
      stableFrames = 0;
      lastValue = value;
    }

    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    cancel();
    lastValue = readValue();
    stableFrames = 0;
    rafId = requestAnimationFrame(tick);
  };

  return { start, cancel, resetStability };
}
