import { useTranslation } from 'react-i18next';
import { ArticleListItemProps } from '../ArticleListItem';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticleListItemRedesigned.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned = (props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={`${article.views}`} className={cls.view} />
        </HStack>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <Card
                padding="24"
                max
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
                data-testid="ArticleListItem"
            >
                <VStack gap="16">
                    <HStack gap="16" max>
                        <Avatar size={32} src={article.user.avatar} />
                        <Text bold text={article.user.username} />
                        <Text text={article.createdAt} />
                    </HStack>
                    <Text text={article.title} bold />
                    <Text text={article.subtitle} bold size="s" />
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {textBlock.paragraphs && (
                        // <ArticleTextBlockComponent
                        //     block={textBlock}
                        //     className={cls.textBlock}
                        // />
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                        />
                    )}
                    <HStack max justify="between">
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button variant="outline">
                                {t('Читать далее')}
                                ...
                            </Button>
                        </AppLink>

                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
        >
            <Card>
                <div className={cls.imageWrapper}>
                    {/* <img alt={article.title} src={article.img} className={cls.img} /> */}
                    <AppImage
                        alt={article.title}
                        fallback={<Skeleton width={200} height={200} />}
                        src={article.img}
                        className={cls.img}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
};
