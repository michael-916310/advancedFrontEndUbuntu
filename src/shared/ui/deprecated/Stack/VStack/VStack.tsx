import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

/**
 *  @deprecated
 */
export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Flex {...props} direction="column" align={align} />;
};
