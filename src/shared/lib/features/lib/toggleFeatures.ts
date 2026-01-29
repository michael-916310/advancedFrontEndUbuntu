import { getFeatureFlag } from './setGetFeatures';
import { FeaturesFlags } from '../../../types/featuresFlags';

interface ToggleFeaturesOptions<T> {
    name: keyof FeaturesFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>({
    name,
    on,
    off,
}: ToggleFeaturesOptions<T>): T {
    if (getFeatureFlag(name)) {
        return on();
    }

    return off();
}
