import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

export default function FormSection({title, children}:{
    title: string;
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
                <Text fontSize={'16px'} color={'#101828'} fontWeight={500} mb={4}>{title}</Text>
            </GridItem>
            <GridItem w={width}>
                {children}
            </GridItem>
        </Grid>
    )
}
