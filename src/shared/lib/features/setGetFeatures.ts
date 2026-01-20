import { FeaturesFlags } from '@/shared/types/featuresFlags';

let featuresFlags: FeaturesFlags = {};

export function setFeatureFlags(value?: FeaturesFlags) {
    if (value) {
        featuresFlags = value;
    }
}

export function getFeatureFlag(flag: keyof FeaturesFlags) {
    return featuresFlags?.[flag];
}
