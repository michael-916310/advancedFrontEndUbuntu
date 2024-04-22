import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback } from 'react';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username, password, isLoading, error,
  } = useSelector(getLoginState);

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

  const onLoginClick = useCallback(
    // @ts-ignore
    () => dispatch(loginByUserName({ username, password })),
    [dispatch, username, password],
  );

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('Форма авторизации')} />
      {error && (
        <Text theme={TextTheme.ERROR} text={t('Не верный логин или пароль')} />
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
        theme={ButtonTheme.OUTLINE}
        className={cls.LoginBtn}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  );
});

export default LoginForm;
