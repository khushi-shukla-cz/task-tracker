
import { useState } from 'react';
import { User, LogIn, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[var(--background)] transition-all duration-300">
      {/* Dark mode toggle icon */}
      <div className="absolute top-4 right-4 z-20">
        <DarkModeToggle />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-indigo-100/20 dark:from-[#232323]/60 dark:via-[#181818]/60 dark:to-[#1A1A1A]/60"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mb-6 shadow-lg shadow-purple-200 animate-pulse">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Task Flow
          </h1>
          <p className="text-xl text-gray-600 mb-2">Your Personal Productivity Companion</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Transform your daily chaos into organized success. Experience the future of task management with beautiful design and intelligent features.
          </p>
        </div>

        {/* Login Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md backdrop-blur-lg bg-white/80 dark:bg-[var(--card)] border-0 shadow-2xl shadow-purple-200/50 rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 dark:from-[#232323]/90 dark:to-[#181818]/80 backdrop-blur-lg"></div>
            
            <CardHeader className="relative text-center space-y-4 pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-[var(--text-primary)]">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600 dark:text-[var(--text-muted)]">
                Enter your name to continue your productivity journey
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-12 text-base bg-white/70 dark:bg-[var(--input)] border-gray-200 dark:border-[var(--border)] rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-[var(--text-muted)] text-gray-800 dark:text-[var(--text-primary)]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-purple-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                  disabled={!username.trim()}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: '✨', title: 'Beautiful Design', desc: 'Stunning interface that makes productivity enjoyable' },
            { icon: '🚀', title: 'Smart Organization', desc: 'Intelligent task management with powerful filtering' },
            { icon: '💫', title: 'Seamless Experience', desc: 'Smooth animations and delightful interactions' }
          ].map((feature, index) => (
            <div key={index} className={`text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
