import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback } from 'react';
import {
  DynamicModuleLoader,
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginUserName } from '../../model/selectors/getLoginUserName/getLoginUserName';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

const initialReducer: ReducerList = {
  loginForm: loginReducer,
};

export interface LoginFormProps {
  className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  const onLoginClick = useCallback(
    // @ts-ignore
    () => dispatch(loginByUserName({ username, password })),
    [dispatch, username, password],
  );

  return (
    <DynamicModuleLoader reducers={initialReducer} removeAfterUnmount>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')} />
        {error && (
          <Text
            theme={TextTheme.ERROR}
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
          theme={ButtonTheme.OUTLINE}
          className={cls.LoginBtn}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t('Войти')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
