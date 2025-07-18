// Design tokens for consistent theming
export const designTokens = {
  colors: {
    // Primary palette (newspaper theme)
    primary: {
      50: '#f8fafc',
      100: '#f1f5f9', 
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // Accent colors for interactions
    accent: {
      50: '#e0f2fe',
      100: '#bae6fd',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
    },
    // Semantic colors
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      600: '#059669',
      700: '#047857',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7', 
      600: '#d97706',
      700: '#b45309',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      600: '#dc2626',
      700: '#b91c1c',
    }
  },
  
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
  
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  }
};

// Component variants for consistent styling
export const componentVariants = {
  panel: {
    base: 'border border-solid rounded-lg',
    variants: {
      default: 'bg-white border-slate-200 shadow-sm',
      subtle: 'bg-slate-50 border-slate-200',
      accent: 'bg-sky-50 border-sky-200',
    }
  },
  
  button: {
    base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
    variants: {
      primary: 'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500',
      secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500',
      accent: 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500',
    },
    sizes: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm', 
      lg: 'h-12 px-6 text-base',
    }
  },
  
  badge: {
    base: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
    variants: {
      default: 'bg-slate-100 text-slate-700 border-slate-200',
      success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      warning: 'bg-amber-100 text-amber-700 border-amber-200',
      info: 'bg-sky-100 text-sky-700 border-sky-200',
    }
  }
};
