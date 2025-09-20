import { useEffect } from "react";

// This component is rendered during SSR. Avoid importing or calling
// client-only hooks (like react-router's useLocation) at top-level.
const NotFound = () => {
  useEffect(() => {
    // Access location only on the client where window is available.
    try {
      const pathname = typeof window !== "undefined" ? window.location.pathname : "(unknown)";
      console.error("404 Error: User attempted to access non-existent route:", pathname);
    } catch (e) {
      // swallow any errors to keep SSR stable
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
