'use client';

import { useLayoutEffect } from 'react';
import {
  initManualScrollRestoration,
  restoreHashScroll,
} from '@/lib/hash-scroll-restore';

export default function HashScrollRestore() {
  useLayoutEffect(() => {
    initManualScrollRestoration();
    return restoreHashScroll();
  }, []);

  return null;
}
