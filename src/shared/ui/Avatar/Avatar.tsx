import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import UserIcon from '../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';
import { Skeleton } from '@/shared/ui/Skeleton';

interface AvatarProps {
  alt?: string;
  className?: string;
  fallbackInverted?: boolean;
  src?: string;
  size?: number;
}

const Avatar = ({
  alt, className, fallbackInverted, src, size = 100,
}: AvatarProps) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon inverted={fallbackInverted} Svg={UserIcon} width={size} height={size} />;

  return (
    <AppImage
      alt={alt}
      errorFallback={errorFallback}
      fallback={fallback}
      src={src}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};

export { Avatar };
