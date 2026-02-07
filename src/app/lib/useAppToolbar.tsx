import { ReactElement, useMemo } from 'react';
import { AppRoutes } from '@/shared/const/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar/ui';
import { OptionalRecord } from '@/app/types/types';
import { useRouteChange } from '@/shared/lib/router';

export function useAppToolbar() {
    const currentRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = useMemo(
        () => ({
            [AppRoutes.ARTICLES]: <ScrollToolbar />,
            [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        }),
        [],
    );

    return toolbarByAppRoute[currentRoute];
}
