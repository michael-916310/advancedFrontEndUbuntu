import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';
import { StarRating as StarRatingDeprecated } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input as InputRedesigned } from '@/shared/ui/redesigned/Input';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onAccept,
        feedbackTitle,
        hasFeedback,
        onCancel,
        title,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <TextRedesigned title={feedbackTitle} />
                    <InputRedesigned
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
        />
    );

    const content = (
        <>
            <VStack align="center" gap="8" max>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <>
                            <TextRedesigned
                                title={
                                    starsCount ? t('Спасибо за оценку!') : title
                                }
                            />
                            <StarRatingDeprecated
                                selectedStars={starsCount}
                                size={40}
                                onSelect={onSelectStars}
                            />
                        </>
                    }
                    off={
                        <>
                            <TextDeprecated
                                title={
                                    starsCount ? t('Спасибо за оценку!') : title
                                }
                            />
                            <StarRatingDeprecated
                                selectedStars={starsCount}
                                size={40}
                                onSelect={onSelectStars}
                            />
                        </>
                    }
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <HStack max gap="16" justify="end">
                                    <ButtonRedesigned
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                        variant="outline"
                                    >
                                        {t('Закрыть')}
                                    </ButtonRedesigned>
                                    <ButtonRedesigned
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandle}
                                    >
                                        {t('Отправить')}
                                    </ButtonRedesigned>
                                </HStack>
                            }
                            off={
                                <HStack max gap="16" justify="end">
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                        theme={ButtonTheme.OUTLINE_RED}
                                    >
                                        {t('Закрыть')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandle}
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <ButtonRedesigned
                                    fullWidth
                                    onClick={acceptHandle}
                                    size="l"
                                >
                                    {t('Отправить')}
                                </ButtonRedesigned>
                            }
                            off={
                                <ButtonDeprecated
                                    fullWidth
                                    onClick={acceptHandle}
                                    size={ButtonSize.L}
                                >
                                    {t('Отправить')}
                                </ButtonDeprecated>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <CardRedesigned
                    border="partial"
                    className={className}
                    data-testid="RatingCard"
                    fullHeight
                    padding="24"
                    max
                >
                    {content}
                </CardRedesigned>
            }
            off={
                <CardDeprecated
                    className={className}
                    data-testid="RatingCard"
                    max
                >
                    {content}
                </CardDeprecated>
            }
        />
    );
});
