import { useEffect, useState } from 'react';

function getInitialTheme(): boolean {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    // Auto-detect system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

function toggleTheme(forceDark?: boolean) {
  const root = document.documentElement;
  const isDark = forceDark !== undefined ? forceDark : !root.classList.contains('dark');
  root.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme());

  useEffect(() => {
    toggleTheme(isDark);
    // Add smooth transition to root
    document.documentElement.style.transition = 'all 0.3s ease';
  }, [isDark]);

  useEffect(() => {
    // On mount, set theme based on preference
    toggleTheme(isDark);
  }, []);

  return (
    <button
      aria-label="Toggle dark mode"
      className={`transition-colors rounded-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400`}
      onClick={() => setIsDark(d => !d)}
      type="button"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-12.34l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m2.34-7.66l-.71-.71M19.95 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      )}
    </button>
  );
}
