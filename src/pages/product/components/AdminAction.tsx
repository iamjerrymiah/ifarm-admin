import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Select } from "../../../common/Form/Select";
import PageHeading from "../../../common/PageHeader/PageHeading";
import Button from "../../../common/Button/Button";
import { GrLineChart } from "react-icons/gr";

export default function AdminAction({ editProduct }:{
    editProduct: ()=>void;
}) {
    return (
        <Box
            p={4}
            mt={6}
            border={'1px solid #D0D5DD'}
            borderRadius={'16px'}
        >
            <Text fontSize={'16px'} color={'#101828'} fontWeight={500} mb={6}>Admin Actions</Text>
            <Select 
                upperLabel="Update Inventory"
                name="inventory"
                // value={"inventory"}
                onChange={()=>{}}
                options={[]}
                placeholder="Enter quantity"
            />
            <PageHeading title="">
                <Button 
                    text='Export Report'
                    variant='outline'
                    color={'#0E2354'}
                />
                <Button 
                    text='Achieve Product'
                    bgColor={'#101828'}
                />
                <Button 
                    text='Edit Product'
                    onClick={editProduct}
                />
            </PageHeading>

            <Box mt={4}>
                <Text fontSize={'16px'} color={'#101828'} fontWeight={500} mb={6}>Sales Performance </Text>
                <HStack w='100%' justify={'space-between'}>
                    <Text color={'#475467'} fontSize={'13px'}>This Month:</Text>
                    <Flex gap={2}>
                        <Text color={'#101828'} fontSize={'sm'}>45 Sold</Text>
                        <GrLineChart color="#499459"/>
                    </Flex>
                </HStack>
            </Box>
        </Box>
    )
}
