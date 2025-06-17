import { Box, Text } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import { TextColor } from "../../constants/colors";
import Button from "../../common/Button/Button";
import ProductForm from "./form/ProductForm";
import PageMainContainer from "../../common/PageMain/PageMain";

export default function AddProduct() {
    return (
        <PageMainContainer title="Production Management" description="Production Management">
            <Box w='100%' pb={10}>
                <Text pt={[0,0,0,2]} px={[0,0,0,4]} color={TextColor.heading} fontSize={'24px'} fontWeight={500} lineHeight={2}>{"Create New Product"}</Text>
                <PageHeading titleSize="18px" title="Product Creation Form" subHeading="Update product details here.">
                    <Button 
                        text='Cancel'
                        variant='outline'
                        color={'#0E2354'}
                    />
                    <Button 
                        text='Save as Draft'
                        bgColor={'#101828'}
                    />
                    <Button 
                        text='Save & Publish'
                        // onClick={}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <ProductForm />
                </Box>
                
            </Box>
        </PageMainContainer>
    )
}
