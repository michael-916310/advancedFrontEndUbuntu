import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadOnly,
  getProfileValidateErrors,
  profileActions,
  ProfileCard,
  profileReducer,
  ValidationProfileError,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducer: ReducerList = {
  profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();

  const form = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readOnly = useSelector(getProfileReadOnly);
  const validateErrors = useSelector(getProfileValidateErrors);
  const { id } = useParams<{ id: string }>();

  const validateErrorTranslates = {
    [ValidationProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidationProfileError.INCORRECT_AGE]: t('Не корректный возраст'),
    [ValidationProfileError.INCORRECT_COUNTRY]: t('Страна обязательна'),
    [ValidationProfileError.SERVER_ERROR]: t('Ошибка сервера'),
    [ValidationProfileError.NO_DATA]: t('Данные не указаны'),
  };

  useInitialEffect(
    () => {
      if (id) {
        dispatch(fetchProfileData(id));
      }
    },
  );

  const onChangeFirstName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ first: value ?? '' }));
  }, [dispatch]);

  const onChangeLastName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value ?? '' }));
  }, [dispatch]);

  const onChangeAge = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value ?? 0) }));
  }, [dispatch]);

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value ?? '' }));
  }, [dispatch]);

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value ?? '' }));
  }, [dispatch]);

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value ?? '' }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency?: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onChangeCountry = useCallback((country?: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        {validateErrors?.length && validateErrors?.map(
          (item) => <Text key={item} theme={TextTheme.ERROR} text={validateErrorTranslates[item]} />,
        )}
        <ProfileCard
          data={form}
          isLoading={isLoading}
          error={error}
          readOnly={readOnly}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
