import { Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import { prettyDateFormat } from "../../../utils/utils";

function OrderText({title, value}:any) {
    return (
        <HStack align={'flex-start'} spacing={2} fontSize={'sm'}>
            <Text w={'30%'} color={'#101828'}>{title}</Text>
            <Text color={'#475467'}>{value}</Text>
        </HStack>
    )
}

export default function Descriptions({data = {}}:any) {
    const splittedTags = data?.tags?.join(", ");

    return (
            <Grid
                gap={[3]} 
                templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "1fr 2fr" }} 
            >
                <GridItem>
                    <Stack spacing={0}>
                        <OrderText title="Publication Date:" value={prettyDateFormat(data?.publication_date) ?? ""}/>
                        <OrderText title="Unit of Measurement:" value={data?.unit_of_measure ?? ""}/>
                        <OrderText title="Tags:" value={splittedTags ?? ""}/>
                        <OrderText title="Specifications:" value={data?.specifications}/>
                        <OrderText title="Custom Attributes:" value={data?.custom_attributes ?? ""}/>
                        <OrderText title="SEO Title:" value={data?.seo_title ?? ""}/>
                        {/* <OrderText title="SEO Description:" value={data?.seo_description ?? ""}/> */}
                    </Stack>
                </GridItem>
                <GridItem>
                    <Text fontSize={'13px'} color={'#475467'}>{data?.long_description ?? ''}</Text>
                </GridItem>
            </Grid>
    )
}
