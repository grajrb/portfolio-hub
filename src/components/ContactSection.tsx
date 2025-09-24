// NOTE: This legacy ContactSection component has been deprecated in favor of
// the enhanced form at `components/sections/contact-section.tsx`.
// It is kept as an empty shim to avoid accidental imports and duplicate mounts
// that were causing multiple submissions/toasts. Remove this file once all
// imports are confirmed updated.

export const ContactSection = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[LegacyContactSection] This component is deprecated. Use components/sections/contact-section.tsx');
  }
  return null;
};
