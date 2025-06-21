import { Box, HStack, Stack, StackDirection, StackProps as ChakraStackProps, BoxProps, Text, Spinner } from '@chakra-ui/react'
import React from 'react'
import { ElementColor, TextColor } from '../../constants/colors';

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
    isLoading?: boolean;
}

function PageHeading({ title, subHeading, titleSize, fontSize, children, color, direction, node, isLoading, childrenProps, noBB, ...props }: PageHeadingProps & ChakraStackProps) {
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
                <HStack gap={3}>
                    <Stack>
                        <Text color={color ?? TextColor.heading} fontSize={titleSize ?? ['20px', '24px']} fontWeight={500} lineHeight={2}>{title}</Text>
                        <Text mt={'-4'} color={'#475467'} fontWeight={400} fontSize={['12px', '14px']}>{subHeading}</Text>
                    </Stack>
                    {isLoading && <Spinner w='20px' h='20px' thickness='10px' speed='1s' color={ElementColor.primary}/> }
                </HStack>
            }
            {children &&
                <HStack {...childrenProps} className='scroll-custom'>
                    {children}
                </HStack>
            }
        </Stack>
    )
}

export default PageHeading