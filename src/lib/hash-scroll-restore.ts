import { getSectionIdFromHref } from '@/lib/scroll-to-section';
import { createStableValuePoller } from '@/lib/wait-for-stable-value';

const STABLE_FRAMES = 3;
const MAX_WAIT_MS = 3000;

export function initManualScrollRestoration(): void {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

export function restoreHashScroll(): () => void {
  const hash = globalThis.location.hash;
  if (!hash) {
    return () => {};
  }

  const sectionId = getSectionIdFromHref(hash);
  if (!sectionId) {
    return () => {};
  }

  globalThis.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  const target = document.getElementById(sectionId);
  if (!target) {
    return () => {};
  }

  let done = false;

  const finish = () => {
    if (done) {
      return;
    }

    done = true;
    poller.cancel();
    observer.disconnect();
    clearTimeout(timeoutId);

    target.scrollIntoView({ behavior: 'instant', block: 'start' });
  };

  const poller = createStableValuePoller({
    readValue: () => target.offsetTop,
    stableFrames: STABLE_FRAMES,
    onStable: finish,
    isDone: () => done,
  });

  const observer = new ResizeObserver(() => {
    poller.resetStability();
    poller.start();
  });

  observer.observe(document.documentElement);

  const timeoutId = globalThis.setTimeout(finish, MAX_WAIT_MS);
  poller.start();

  return finish;
}
