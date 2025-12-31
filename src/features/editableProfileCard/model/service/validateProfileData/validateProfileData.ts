import { Profile } from '@/entities/Profile';

import { ValidationProfileError } from '../../../model/consts/consts';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidationProfileError.NO_DATA];
    }

    const { first, lastname, age, country } = profile;

    const errors: Array<ValidationProfileError> = [];

    if (!first || !lastname) {
        errors.push(ValidationProfileError.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidationProfileError.INCORRECT_AGE);
    }

    if (!country) {
        errors.push(ValidationProfileError.INCORRECT_COUNTRY);
    }

    return errors;
};
