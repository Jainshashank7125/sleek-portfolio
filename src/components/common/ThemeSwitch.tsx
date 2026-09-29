'use client';

import { persistTheme, readStoredTheme } from '@/lib/theme.mjs';
import React, { useCallback, useEffect, useState } from 'react';

import Moon from '../svgs/Moon';
import Sun from '../svgs/Sun';

interface ThemeSwitchProps {
  className?: string;
}

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
}

export default function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = readStoredTheme(() => window.localStorage) as Theme;
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const nextTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
      persistTheme(() => window.localStorage, nextTheme);
      applyTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex size-11 items-center justify-center border border-transparent text-foreground transition-colors hover:border-border hover:text-brand ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
