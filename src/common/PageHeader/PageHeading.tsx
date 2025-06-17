'use client';

import { Box, HStack, Stack, StackDirection, StackProps as ChakraStackProps, BoxProps, Text } from '@chakra-ui/react'
import React from 'react'
import { TextColor } from '../../constants/colors';

interface PageHeadingProps {
    title?: string;
    subHeading?: string;
    titleSize?: string;
    fontSize?: string;
    children?: React.ReactNode;
    direction?: StackDirection;
    color?: string;
    node?: React.ReactNode;
    childrenProps?: BoxProps;
    noBB?: boolean;
}

function PageHeading({ title, subHeading, titleSize, fontSize, children, color, direction, node, childrenProps, noBB, ...props }: PageHeadingProps & ChakraStackProps) {
    return (
        <Stack
            direction={direction ?? ['column', 'column', 'column', 'row']}
            w='full'
            justify='space-between'
            bgColor={'white'}
            pt={[0,0,0,2]}
            pb={2}
            px={[0,0,0,4]}
            mb={4}
            pos='sticky'
            top={0}
            zIndex={10}
            boxShadow={noBB ? 'none' : 'sm'}
            {...props}
        >
            {
                node ? <Box mt='2'>{node}</Box> :
                <Stack>
                    <Text color={color ?? TextColor.heading} fontSize={titleSize ?? '24px'} fontWeight={500} lineHeight={2}>{title}</Text>
                    <Text mt={'-4'} color={'#475467'} fontWeight={400} fontSize={['13px', '14px']}>{subHeading}</Text>
                </Stack>
            }
            {children &&
                <HStack {...childrenProps}>
                    {children}
                </HStack>
            }
        </Stack>
    )
}

export default PageHeading