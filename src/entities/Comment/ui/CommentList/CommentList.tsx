import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

const CommentList = ({
  className,
  comments,
  isLoading,
}: CommentListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard className={cls.comment} isLoading />
        <CommentCard className={cls.comment} isLoading />
        <CommentCard className={cls.comment} isLoading />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map(
          (item) => (
            <CommentCard
              comment={item}
              className={cls.comment}
              isLoading={isLoading}
            />
          ),
        )
        : <Text text={t('Комментарий отсутствует')} />}
    </div>
  );
};

export { CommentList };
