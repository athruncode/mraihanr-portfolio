/* ───────────────────────── ABOUT MODAL ASSETS ─────────────────────────
   Photo was 4496x3000 / 2.4MB and got decoded on every first open.
   Optimized copy: 1200x801 / ~220KB (same aspect ratio, same framing).
   ────────────────────────────────────────────────────────────────────── */
export const ABOUT_PHOTO_SRC = '/raihan-about-optimized.jpg';
export const ABOUT_SILHOUETTE_SRC = '/rehan biru.svg';

/** Warm the browser cache before the modal opens (called on menu hover). */
export function preloadAboutAssets() {
  if (typeof window === 'undefined') return;
  [ABOUT_PHOTO_SRC, ABOUT_SILHOUETTE_SRC].forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });
}
