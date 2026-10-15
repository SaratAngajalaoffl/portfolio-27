"use client";

import { useSyncExternalStore } from "react";

// Flips to true once the intro loader has finished, so the hero can choreograph its entrance after it
let ready = false;
const listeners = new Set<() => void>();

export function markReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((l) => l());
}

export function useReady() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => ready,
    () => false,
  );
}
