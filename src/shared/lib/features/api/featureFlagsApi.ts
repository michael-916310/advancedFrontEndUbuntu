import { rtkApi } from '@/shared/api/rtkApi';
import { FeaturesFlags } from '@/shared/types/featuresFlags';

interface updateFeatureFlagsOptions {
    userId: string;
    features: Partial<FeaturesFlags>;
}

const featureFlagsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlags: build.mutation<void, updateFeatureFlagsOptions>({
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: { features },
            }),
        }),
    }),
});

export const updateFeatureFlagsMutation =
    featureFlagsApi.endpoints.updateFeatureFlags.initiate;
