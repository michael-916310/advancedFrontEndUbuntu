import { StoryFn } from '@storybook/react';
import { FeaturesFlags } from '@/shared/types/featuresFlags';
import { setFeatureFlags } from '@/shared/lib/features';

export const FeatureFlagsDecorator =
    (features: FeaturesFlags) => (StoryToWrap: StoryFn) => {
        setFeatureFlags(features);

        return <StoryToWrap />;
    };
