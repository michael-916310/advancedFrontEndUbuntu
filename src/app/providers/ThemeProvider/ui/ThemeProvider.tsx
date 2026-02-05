import React, {
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from 'react';
// eslint-disable-next-line max-len
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User/model/selectors/jsonSettings';

interface ThemeProviderProps {
    initialTheme?: Theme;
}

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
    children,
    initialTheme,
}) => {
    const { theme: defaultTheme } = useJsonSettings();
    const [isThemeInited, setThemeInited] = useState(false);

    const [theme, setTheme] = useState<Theme>(
        initialTheme || defaultTheme || Theme.LIGHT,
    );

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setThemeInited(true);
        }
    }, [defaultTheme, isThemeInited, theme]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

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
