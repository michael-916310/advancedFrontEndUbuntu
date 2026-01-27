import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation('profile');

    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, {}, [cls.error])}
        >
            <TextDeprecated
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                theme={TextTheme.ERROR}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, {}, [cls.loading])}
        >
            <Loader />
        </HStack>
    );
};

export const ProfileCardDeprecated = ({
    className,
    data,
    isLoading,
    error,
    readOnly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
}: ProfileCardProps) => {
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readOnly,
    };

    return (
        <VStack
            gap="8"
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify="center" max className={cls.AvatarWrapper}>
                    <AvatarDeprecated src={data?.avatar} />
                </HStack>
            )}
            <InputDeprecated
                value={data?.first}
                placeholder={t('Ваше имя')}
                className={cls.input}
                onChange={onChangeFirstName}
                readOnly={readOnly}
                data-testid="ProfileCard.firstname"
            />
            <InputDeprecated
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                onChange={onChangeLastName}
                readOnly={readOnly}
                data-testid="ProfileCard.lastname"
            />
            <InputDeprecated
                value={data?.age}
                placeholder={t('Возраст')}
                className={cls.inputNumber}
                onChange={onChangeAge}
                readOnly={readOnly}
                type="number"
            />
            <InputDeprecated
                value={data?.city}
                placeholder={t('Город')}
                className={cls.input}
                onChange={onChangeCity}
                readOnly={readOnly}
            />
            <InputDeprecated
                value={data?.username}
                placeholder={t('Имя пользователя')}
                className={cls.input}
                onChange={onChangeUsername}
                readOnly={readOnly}
            />
            <InputDeprecated
                value={data?.avatar}
                placeholder={t('Ссылка на аватар')}
                className={cls.input}
                onChange={onChangeAvatar}
                readOnly={readOnly}
            />

            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readOnly={readOnly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readOnly={readOnly}
            />
        </VStack>
    );
};
