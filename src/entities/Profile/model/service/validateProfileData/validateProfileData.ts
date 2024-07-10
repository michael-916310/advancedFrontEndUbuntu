import { Profile, ValidationProfileError } from '../../types/profile';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidationProfileError.NO_DATA];
  }

  const {
    first, lastname, age, country,
  } = profile;

  const errors: Array<ValidationProfileError> = [];

  if (!first || !lastname) {
    errors.push(ValidationProfileError.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidationProfileError.INCORRECT_AGES);
  }

  if (!country) {
    errors.push(ValidationProfileError.INCORRECT_COUNTRY);
  }

  return errors;
};
