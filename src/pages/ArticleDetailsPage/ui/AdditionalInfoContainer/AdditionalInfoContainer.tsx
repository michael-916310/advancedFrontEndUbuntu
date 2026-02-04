import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { getArticleDetailsData } from '@/entities/Article';

import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AdditionalInfoContainer: FC = () => {
    const article = useSelector(getArticleDetailsData);

    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);

    if (!article) {
        return null;
    }

    return (
        <Card border="partial" className={cls.card} padding="24">
            <ArticleAdditionalInfo
                author={article.user}
                createdAt={article.createdAt}
                onEdit={onEditArticle}
                views={article.views}
            />
        </Card>
    );
};
