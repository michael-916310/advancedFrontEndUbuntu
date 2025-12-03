import type { FC, PropsWithChildren } from 'react';
import React, { useMemo, useState } from 'react';
// eslint-disable-next-line max-len
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
  initialTheme?: Theme;
}

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
