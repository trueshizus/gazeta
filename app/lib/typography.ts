// Typography system improvements
export const typography = {
  // Heading hierarchy
  heading: {
    h1: 'text-3xl font-bold text-slate-900 leading-tight',
    h2: 'text-2xl font-semibold text-slate-800 leading-tight',
    h3: 'text-xl font-semibold text-slate-800 leading-snug',
    h4: 'text-lg font-medium text-slate-700 leading-snug',
  },
  
  // Body text variants
  body: {
    default: 'text-base text-slate-700 leading-relaxed',
    large: 'text-lg text-slate-700 leading-relaxed',
    small: 'text-sm text-slate-600 leading-normal',
  },
  
  // Semantic text styles
  semantic: {
    muted: 'text-slate-500',
    subtle: 'text-slate-600', 
    emphasized: 'text-slate-900 font-medium',
    code: 'font-mono text-sm bg-slate-100 px-1 py-0.5 rounded',
    link: 'text-sky-600 hover:text-sky-700 underline decoration-sky-200 hover:decoration-sky-300 transition-colors',
  },
  
  // Status-specific text
  status: {
    success: 'text-emerald-700',
    warning: 'text-amber-700', 
    error: 'text-red-700',
    info: 'text-sky-700',
  }
};
