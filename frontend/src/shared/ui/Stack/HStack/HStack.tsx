import React from 'react';
import { Flex, FlexProps } from 'shared/ui/Stack/Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>

const HStack = (props: HStackProps) => {
    return (
        // @ts-ignore
        <Flex direction="row" {...props} />
    );
};

export { HStack };
