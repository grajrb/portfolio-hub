// Legacy React Router entry file (deprecated).
// Kept as a no-op to avoid import errors if referenced somewhere.
// All routing now handled by Next.js App Router in `src/app`.
export default function App() {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Legacy src/App.tsx rendered. This should no longer be used.');
  }
  return null;
}
