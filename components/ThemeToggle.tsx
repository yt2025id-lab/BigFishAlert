'use client';

import { useTheme } from '@/lib/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Zap, Briefcase } from 'lucide-react';

export function ThemeToggle() {
  const { mode, toggleMode, isDegen } = useTheme();

  return (
    <Button
      onClick={toggleMode}
      variant="outline"
      size="sm"
      className={isDegen
        ? "font-black uppercase border-2 transition-all"
        : "transition-all"
      }
      style={isDegen ? {
        background: 'linear-gradient(135deg, #BD00FF 0%, #FF0040 100%)',
        border: '2px solid #BD00FF',
        color: '#FFFFFF',
        boxShadow: '0 0 20px rgba(189, 0, 255, 0.6)',
      } : undefined}
    >
      {isDegen ? (
        <>
          <Briefcase className="w-4 h-4 mr-2" />
          <span>PRO MODE</span>
        </>
      ) : (
        <>
          <Zap className="w-4 h-4 mr-2" />
          <span>DEGEN MODE</span>
        </>
      )}
    </Button>
  );
}
