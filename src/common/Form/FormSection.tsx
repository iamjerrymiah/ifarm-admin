import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

export default function FormSection({title, children, node}:{
    title: string;
    node?: React.ReactNode;
    children: React.ReactNode;
}) {
    const width = ['100%','100%','100%','80%']
    return (
        <Grid
            gap={[2]}
            py={4} 
            borderBottom={'1px solid #E4E7EC'}
            templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "1fr 2fr" }} 
        >
            <GridItem>
                <Flex w='100%' gap={4} justify={['space-between','space-between','space-between','start']}>
                    <Text fontSize={'16px'} color={'#101828'} fontWeight={500} mb={4}>{title}</Text>
                    <Box>{node}</Box>
                </Flex>
            </GridItem>
            <GridItem w={width}>
                {children}
            </GridItem>
        </Grid>
    )
}
