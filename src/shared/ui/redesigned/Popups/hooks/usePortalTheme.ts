import { useEffect } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

export const usePortalTheme = (isOpen: boolean) => {
    const { theme } = useTheme();

    useEffect(() => {
        if (isOpen && theme) {
            const portal = document.querySelector('#headlessui-portal-root');

            if (portal) {
                portal.classList.add(theme);

                return () => {
                    portal.classList.remove(theme);
                };
            }
        }

        return () => {};
    }, [isOpen, theme]);
};
