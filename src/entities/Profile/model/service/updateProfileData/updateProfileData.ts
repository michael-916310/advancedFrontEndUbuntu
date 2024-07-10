import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile, ValidationProfileError } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidationProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { rejectWithValue, extra, getState } = thunkApi;

  const formData = getProfileForm(getState());

  const errors = validateProfileData(formData);

  if (errors.length > 0) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.put<Profile>('/profile', formData);

    return response.data;
  } catch (e) {
    console.log(e);

    return rejectWithValue([ValidationProfileError.SERVER_ERROR]);
  }
});
