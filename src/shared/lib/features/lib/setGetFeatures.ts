import { FeaturesFlags } from '@/shared/types/featuresFlags';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';

const defaultFeaturesFlags: FeaturesFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

let featuresFlags: FeaturesFlags = {
    ...defaultFeaturesFlags,
};

export function setFeatureFlags(value?: FeaturesFlags) {
    if (value) {
        featuresFlags = value;
    }
}

export function getFeatureFlag(flag: keyof FeaturesFlags) {
    return featuresFlags?.[flag];
}

export function getAllFeatureFlags() {
    return featuresFlags;
}
