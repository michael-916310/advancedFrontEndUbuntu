import { memo, useState } from 'react';
import { classNames } from '../../../lib/classNames/classNames';

import cls from './StarRating.module.scss';
import { Icon as IconDeprecated } from '../Icon/Icon';
import { Icon as IconRedesigned } from '../../redesigned/Icon/Icon';

import StarIcon from '../../../assets/icons/star.svg';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

interface ArticleEditPageProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 *  @deprecated
 */
export const StarRating = memo((props: ArticleEditPageProps) => {
    const { className, onSelect, size = 30, selectedStars = 0 } = props;

    const [currentStartCount, setCurrentStartCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStartCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStartCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStartCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div
            className={classNames(
                toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => cls.StarRatingRedesigned,
                    off: () => cls.StarRating,
                }),
                {},
                [className],
            )}
        >
            {stars.map((starNumber) => {
                const commonProps = {
                    className: classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [
                            currentStartCount >= starNumber
                                ? cls.hovered
                                : cls.normal,
                        ],
                    ),
                    'data-testid': `StarRating.${starNumber}`,
                    'data-selected': currentStartCount >= starNumber,
                    Svg: StarIcon,
                    key: starNumber,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    onClick: onClick(starNumber),
                };

                return (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <IconRedesigned
                                clickable={!isSelected}
                                {...commonProps}
                            />
                        }
                        off={<IconDeprecated {...commonProps} />}
                    />
                );
            })}
        </div>
    );
});
