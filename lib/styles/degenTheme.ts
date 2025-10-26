export const degenColors = {
  // Neon Colors
  neonGreen: '#00FF41',
  nuclearRed: '#FF0040',
  electricPurple: '#BD00FF',
  cyberBlue: '#00D9FF',
  goldGlow: '#FFD700',

  // Base
  darkBase: '#0A0E27',
  darkSecondary: '#12162E',
  darkTertiary: '#1A1F3A',

  // Accents
  neonPink: '#FF10F0',
  laserOrange: '#FF6B00',
  toxicYellow: '#FFFF00',
};

export const degenGradients = {
  green: 'linear-gradient(135deg, #00FF41 0%, #00D9FF 100%)',
  red: 'linear-gradient(135deg, #FF0040 0%, #FF10F0 100%)',
  purple: 'linear-gradient(135deg, #BD00FF 0%, #FF10F0 100%)',
  gold: 'linear-gradient(135deg, #FFD700 0%, #FF6B00 100%)',
  danger: 'linear-gradient(135deg, #FF0040 0%, #8B0000 100%)',
};

export const degenShadows = {
  glow: {
    green: '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)',
    red: '0 0 20px rgba(255, 0, 64, 0.5), 0 0 40px rgba(255, 0, 64, 0.3)',
    purple: '0 0 20px rgba(189, 0, 255, 0.5), 0 0 40px rgba(189, 0, 255, 0.3)',
    gold: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)',
  },
  text: {
    green: '0 0 10px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.6)',
    red: '0 0 10px rgba(255, 0, 64, 0.8), 0 0 20px rgba(255, 0, 64, 0.6)',
    purple: '0 0 10px rgba(189, 0, 255, 0.8), 0 0 20px rgba(189, 0, 255, 0.6)',
    gold: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6)',
  }
};

export const degenAnimations = {
  pulse: `
    @keyframes degen-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
  `,
  glow: `
    @keyframes degen-glow {
      0%, 100% { box-shadow: 0 0 20px currentColor; }
      50% { box-shadow: 0 0 40px currentColor; }
    }
  `,
  shake: `
    @keyframes degen-shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `,
  countUp: `
    @keyframes count-up {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `
};

// Utility function to get theme classes
export function getDegenClass(isDegen: boolean, degenClass: string, professionalClass: string = '') {
  return isDegen ? degenClass : professionalClass;
}
