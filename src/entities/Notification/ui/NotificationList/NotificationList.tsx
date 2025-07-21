import { classNames } from 'shared/lib/classNames/classNames';

import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { NotificationItem } from '../../ui/NotificationItem/NotificationItem';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;

  const { data, isLoading } = useNotifications(null);

  return (
    <VStack
      className={classNames(cls.NotificationList, {}, [className])}
      gap="16"
      max
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
