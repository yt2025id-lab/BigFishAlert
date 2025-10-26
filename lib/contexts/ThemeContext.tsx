'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'professional' | 'degen';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  isDegen: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('professional');

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem('theme-mode') as ThemeMode;
    if (saved) {
      setMode(saved);
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'professional' ? 'degen' : 'professional';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, isDegen: mode === 'degen' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
