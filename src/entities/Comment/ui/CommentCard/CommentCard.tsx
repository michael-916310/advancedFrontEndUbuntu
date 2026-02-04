import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';

import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

const CommentCard = ({ className, comment, isLoading }: CommentCardProps) => {
    const { t } = useTranslation();

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonDeprecated,
        off: () => SkeletonRedesigned,
    });

    if (isLoading) {
        return (
            <Card border="partial" max padding="24">
                <VStack
                    data-testid="CommentCard.Loading"
                    gap="8"
                    max
                    className={classNames(cls.CommentCard, {}, [
                        className,
                        cls.loading,
                    ])}
                >
                    <div className={cls.header}>
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton
                            height={16}
                            width={100}
                            className={cls.username}
                        />
                    </div>
                    <Skeleton className={cls.text} width="100%" height={50} />
                </VStack>
            </Card>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card border="partial" max padding="24">
                    <VStack
                        data-testid="CommentCard.Content"
                        gap="16"
                        max
                        className={classNames(cls.CommentCardRedesign, {}, [
                            className,
                        ])}
                    >
                        <AppLink to={getRouteProfile(comment.user.id)}>
                            <HStack gap="8">
                                {comment.user.avatar ? (
                                    <Avatar
                                        size={30}
                                        src={comment.user.avatar}
                                    />
                                ) : null}
                                <Text bold text={comment.user.username} />
                            </HStack>
                        </AppLink>
                        <Text text={comment.text} />
                    </VStack>
                </Card>
            }
            off={
                <VStack
                    data-testid="CommentCard.Content"
                    gap="16"
                    max
                    className={classNames(cls.CommentCard, {}, [className])}
                >
                    <AppLinkDeprecated
                        to={getRouteProfile(comment.user.id)}
                        className={cls.header}
                    >
                        {comment.user.avatar ? (
                            <AvatarDeprecated
                                size={30}
                                src={comment.user.avatar}
                            />
                        ) : null}
                        <TextDeprecated
                            className={cls.username}
                            title={comment.user.username}
                        />
                    </AppLinkDeprecated>
                    <TextDeprecated className={cls.text} text={comment.text} />
                </VStack>
            }
        />
    );
};

export { CommentCard };
