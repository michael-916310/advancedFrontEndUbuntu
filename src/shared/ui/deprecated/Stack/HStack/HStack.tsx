import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 *  @deprecated
 */
export const HStack = (props: HStackProps) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Flex {...props} direction="row" />;
};
