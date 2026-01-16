import { UserRole } from '../../model/consts/consts';
import { FeaturesFlags } from '@/shared/types/featuresFlags';
import { JsonSettings } from './jsonSettings';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeaturesFlags;
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    _mounted: boolean;
}
