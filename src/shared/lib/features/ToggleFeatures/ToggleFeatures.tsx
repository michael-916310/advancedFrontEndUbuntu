import { FC, ReactElement } from 'react';
import { FeaturesFlags } from '@/shared/types/featuresFlags';
import { getFeatureFlag } from '../setGetFeatures';

interface ToggleFeaturesProps {
    feature: keyof FeaturesFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeatures: FC<ToggleFeaturesProps> = ({
    feature,
    on,
    off,
}) => {
    if (getFeatureFlag(feature)) {
        return on;
    }

    return off;
};
