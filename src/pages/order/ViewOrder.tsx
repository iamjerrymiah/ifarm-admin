import { Box, Flex, Grid, GridItem, HStack, Stack, Tag, Text } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import MenuDropdown from "../../common/Menu/MenuDropdown";
import { GoChevronDown } from "react-icons/go";
import { Table } from "../../common/Table/Table";
import { MdOutlineCalendarToday, MdOutlineCheck } from "react-icons/md";

const dataFields = [
    { name: 'Date & Time', key: 'date', date: true}, 
    { name: 'Status Update', key: 'status', },       
    { name: 'Updated By', key: 'updateBy'},
]

export default function ViewOrder() {
    return (
        <Box w='100%'>
            <PageHeading title="Order Detail">
                <Button 
                    text='Assign Dispatch Agent '
                    variant='outline'
                    color={'#0E2354'}
                />
                <Button 
                    text='Print Invoice'
                    bgColor={'#101828'}
                />
                <Button 
                    rightIcon={
                        <MenuDropdown 
                            withName="Actions"
                            buttonIcon={GoChevronDown}
                            buttonColor="white"
                            options={[
                                {name: "Preparing", onUse:()=>{}},
                                {name: "Dispatched", onUse:()=>{}},
                                {name: "Delivered", onUse:()=>{}},
                                {name: "Cancelled", onUse:()=>{}},
                            ]}
                        />
                    }
                />
            </PageHeading>

            <Grid
                gap={[8,8,8,4]}
                py={4} 
                color={'#101828'}
                templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "2fr 1fr" }} 
            >
                <GridItem>
                    <Box
                        p={4}
                        borderRadius={'15px'}
                        border={'1px solid #D0D5DD'}
                    >
                        <Stack w={'100%'} justify={'space-between'} spacing={2} direction={['column', 'row']}>
                            <Flex gap={2} fontSize={'13px'}>
                                <Text>Order Number #8483982</Text>
                                <Tag bgColor={'#ECFDF3'} size='sm' color={'#F15046'}>
                                    <Flex fontSize={'10px'} gap={1} color={'#027A48'}> 
                                        <MdOutlineCheck />
                                        <Text>Delivered</Text> 
                                    </Flex>
                                </Tag>
                            </Flex>
                            <Flex pl={2} gap={2} borderLeft={'1px solid #D0D5DD'}>
                                <MdOutlineCalendarToday />
                                <Text fontSize={'13px'}>May 20, 2025 – 10:15 AM</Text>
                            </Flex>
                        </Stack>
                    </Box>
                </GridItem>
                    <Box
                        px={4}
                        py={2}
                        borderRadius={'15px'}
                        border={'1px solid #D0D5DD'}
                    >
                        <Text>Customer Details</Text>
                    </Box>
                <GridItem>

                </GridItem>
            </Grid>

            <Table
                title="Order Timeline & Logs"
                tableFields={dataFields}
                tableData={[]}
                emptyText={'No data found'}
                loading={false}
                numbered
            />
        </Box>
    )
}
