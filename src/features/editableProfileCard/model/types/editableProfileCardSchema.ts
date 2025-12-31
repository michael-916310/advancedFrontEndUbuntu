import { Profile } from '@/entities/Profile';
import { ValidationProfileError } from '@/features/editableProfileCard/model/consts/consts';

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateError?: ValidationProfileError[];
}
