
import { useState, useEffect } from 'react';
import Login from '../components/Login';
import TaskDashboard from '../components/TaskDashboard';

const Index = () => {
  const [user, setUser] = useState<string | null>(null);

  // Ensure dark mode is applied based on localStorage or system preference
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('taskTracker_user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem('taskTracker_user', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('taskTracker_user');
    setUser(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden px-2 sm:px-4 md:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:bg-[var(--background)] dark:bg-none">
      {/* Animated background elements - hidden in dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="hidden xs:block absolute -top-4 -left-4 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="hidden xs:block absolute -bottom-8 -right-4 w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="hidden xs:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-pink-200/20 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      {/* Dark mode animated overlay */}
      <div className="hidden dark:block absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#121212] to-[#1E1E2F]"></div>

      {user ? (
        <TaskDashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Index;
