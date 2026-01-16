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
    const { theme: settingsTheme } = useJsonSettings();
    const [theme, setTheme] = useState<Theme | undefined>(initialTheme);
    const [ininted, setInited] = useState(false);

    useEffect(() => {
        if (!ininted && settingsTheme) {
            setTheme(settingsTheme);
            setInited(true);
        }
    }, [settingsTheme, ininted]);

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
