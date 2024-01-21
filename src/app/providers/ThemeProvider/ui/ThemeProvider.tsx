import type { FC, PropsWithChildren } from 'react';
import React, { useMemo, useState } from 'react';
// eslint-disable-next-line max-len
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(
  LOCAL_STORAGE_THEME_KEY,
) as Theme || Theme.LIGHT;

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
