import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginUserName } from '../../model/selectors/getLoginUserName/getLoginUserName';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';

const initialReducer: ReducerList = {
    loginForm: loginReducer,
};

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUserName);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        // @ts-ignore
        const result = await dispatch(loginByUserName({ username, password }));

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, username, password, onSuccess]);

    return (
        <DynamicModuleLoader reducers={initialReducer} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack gap="16">
                        <Text title={t('Форма авторизации')} />
                        {error && (
                            <Text
                                variant="error"
                                text={t('Не верный логин или пароль')}
                            />
                        )}
                        <Input
                            autofocus
                            placeholder={t('Введите username')}
                            type="text"
                            className={cls.input}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <Input
                            placeholder={t('Введите пароль')}
                            type="text"
                            className={cls.input}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <Button
                            variant="outline"
                            className={cls.LoginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </Button>
                    </VStack>
                }
                off={
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        <TextDeprecated title={t('Форма авторизации')} />
                        {error && (
                            <TextDeprecated
                                theme={TextTheme.ERROR}
                                text={t('Не верный логин или пароль')}
                            />
                        )}
                        <InputDeprecated
                            autofocus
                            placeholder={t('Введите username')}
                            type="text"
                            className={cls.input}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <InputDeprecated
                            placeholder={t('Введите пароль')}
                            type="text"
                            className={cls.input}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <ButtonDeprecated
                            theme={ButtonTheme.OUTLINE}
                            className={cls.LoginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>
                    </div>
                }
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
