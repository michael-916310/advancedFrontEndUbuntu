import { UserRole } from '../../model/consts/consts';
import { FeaturesFlags } from '@/shared/types/featuresFlags';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeaturesFlags;
}

export interface UserSchema {
    authData?: User;
    _mounted: boolean;
}
