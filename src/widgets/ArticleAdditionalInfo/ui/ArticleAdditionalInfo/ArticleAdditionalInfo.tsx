import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleAdditionalInfoProps {
    author: User;
    createdAt: string;
    views: number;
    onEdit: () => void;
}

export const ArticleAdditionalInfo: FC<ArticleAdditionalInfoProps> = (
    props,
) => {
    const { author, createdAt, onEdit, views } = props;
    const { t } = useTranslation();

    return (
        <VStack gap="32">
            <HStack gap="8">
                <Avatar src={author.avatar} size={32} />
                <Text bold text={author.username} />
                <Text bold text={createdAt} />
            </HStack>
            <Button onClick={onEdit}>{t('Редактировать')}</Button>
            <Text text={t(`{{count}} просмотров`, { count: views })} />
        </VStack>
    );
};
