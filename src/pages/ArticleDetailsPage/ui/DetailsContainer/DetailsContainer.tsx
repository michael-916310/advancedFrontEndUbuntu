import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

export const DetailsContainer: FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <Card max border="partial" padding="24">
            <ArticleDetails id={id} />
        </Card>
    );
};
