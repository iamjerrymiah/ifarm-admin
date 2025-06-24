import { Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import { allCaps, prettyDateFormat } from "../../../utils/utils";

export function OrderText({title, value, w, fs}:any) {
    return (
        <HStack align={'flex-start'} spacing={2} fontSize={fs ?? 'sm'}>
            <Text w={w ?? '30%'} color={'#101828'}>{title}</Text>
            <Text w='100%' color={'#475467'}>{value}</Text>
        </HStack>
    )
}

export default function Descriptions({data = {}}:any) {
    const tagsArr = data?.tags?.map((e:any) => e.name)
    const splittedTags = tagsArr?.join(", ");

    return (
            <Grid
                gap={[5]} 
                templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "1fr" }} 
            >
                <GridItem>
                    <Stack spacing={2}>
                        <OrderText w={['80%','40%','40%','80%']} title="Publication Date:" value={prettyDateFormat(data?.publication_date) ?? ""}/>
                        <OrderText w={['80%','40%','40%','80%']} title="Unit of Measurement:" value={allCaps(data?.unit_of_measure) ?? ""}/>
                        <OrderText w={['80%','40%','40%','80%']} title="Tags:" value={splittedTags ?? ""}/>
                        <OrderText w={['80%','40%','40%','80%']} title="Specifications:" value={data?.specifications}/>
                        <OrderText w={['80%','40%','40%','80%']} title="Custom Attributes:" value={data?.custom_attributes ?? ""}/>
                        <OrderText w={['80%','40%','40%','80%']} title="SEO Title:" value={data?.seo_title ?? ""}/>
                        {/* <OrderText title="SEO Description:" value={data?.seo_description ?? ""}/> */}
                    </Stack>
                </GridItem>
                <GridItem>
                    <Text fontSize={'13px'} color={'#475467'}>{data?.long_description ?? ''}</Text>
                </GridItem>
            </Grid>
    )
}
