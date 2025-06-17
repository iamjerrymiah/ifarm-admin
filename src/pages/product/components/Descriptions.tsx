import { Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";

function OrderText({title, value}:any) {
    return (
        <HStack align={'flex-start'} spacing={2} fontSize={'sm'}>
            <Text w={'30%'} color={'#101828'}>{title}</Text>
            <Text color={'#475467'}>{value}</Text>
        </HStack>
    )
}

export default function Descriptions() {
    return (
            <Grid
                gap={[3]} 
                templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "1fr 2fr" }} 
            >
                <GridItem>
                    <Stack spacing={0}>
                        <OrderText title="Weight:" value={"03"}/>
                        <OrderText title="Color:" value={"Red"}/>
                        <OrderText title="Type:" value={"Organic"}/>
                        <OrderText title="Category:" value={"Vegetables"}/>
                        <OrderText title="Stock Status:" value={"Available"}/>
                        <OrderText title="Tags:" value={"Vegetables, Healthy, Nigerian"}/>
                    </Stack>
                </GridItem>
                <GridItem>
                    <Text fontSize={'13px'} color={'#475467'}>
                        Experience the authentic taste of Nigeria with our premium tomatoes, handpicked at peak ripeness from local farms. 
                        Bathed in the warm Nigerian sun, these tomatoes sport a vivid, inviting red hue and a firm yet juicy texture that perfectly balances sweetness with a hint of tanginess. 
                        Whether tossed into a fresh salad, blended into a vibrant sauce, or simply enjoyed on their own, each tomato bursts with the natural, wholesome flavor that only careful, 
                        sustainable farming can deliver. Enjoy a nutrient-packed, farm-to-table delight that not only nourishes your body but also supports local agricultural communities.
                    </Text>
                </GridItem>
            </Grid>
    )
}
