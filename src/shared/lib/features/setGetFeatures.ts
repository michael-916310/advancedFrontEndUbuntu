import { FeatureFlags } from '@/shared/types/featureFlags';

let featuresFlags: FeatureFlags;

export function setFeatureFlags(value?: FeatureFlags) {
    if (value) {
        featuresFlags = value;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featuresFlags[flag];
}
