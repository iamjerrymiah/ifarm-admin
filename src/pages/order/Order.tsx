import { Box, Flex, HStack } from '@chakra-ui/react'
import PageHeading from '../../common/PageHeader/PageHeading'
import Button from '../../common/Button/Button'
import Tabs from '../../common/Tabs/Tabs'
import { Input } from '../../common/Form/Input'
import { BsSearch } from 'react-icons/bs'
import { Table } from '../../common/Table/Table'
import { useState } from 'react'
import PageMainContainer from '../../common/PageMain/PageMain'


const dataFields = [
    { name: 'Order', key: 'order', },    
    { name: 'Order Date', key: 'date', date: true},    
    { name: 'Payment Status', key: 'paymentStatus'},
    { name: 'Customer', key: 'customer', img: 'img', withImg: true },
    { name: 'Total Amount (₦)', key: 'totalAmount', money: true },
    { name: 'Products Ordered', key: 'product', case: true }, 
    { name: 'Order Status', key: 'status'},
    { name: 'Delivery Method', key: 'deliveryMethod'},
    { name: 'Assigned Dispatch', key: 'assignedDispatch'},
]

function OrderTable({filter}:any) {
    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <Input 
                            name="search"
                            value={filter?.search}
                            placeholder="Search order by ID, status or keywords" 
                            leftElement={(<BsSearch />)}
                        />
                    </Flex>
                    <Flex gap={2}>
                        <Button 
                            text='Filter'
                            size={'md'}
                            iconType='filter'
                            variant='outline'
                            color={'#344054'}
                        />
                    </Flex>
                </Flex>
            </Box>


            <Table
                tableFields={dataFields}
                tableData={[]}
                emptyText={'No data found'}
                loading={false}
                numbered
                options={[
                    {
                        name: 'View',
                        onUse: (datum: any) => {  },
                    },                    
                    {
                        name: 'Edit',
                        onUse: (datum: any) => {  },
                    },
                    {
                        name: 'Delete',
                        color: 'red.500',
                        onUse: (datum: any) => { },
                    },
                ]}
            />

        </Box>
    )
}

export default function Order() {
    const [filter, setFilter] = useState<any>({})

    return (
        <PageMainContainer title="Order Management" description="Order Management">
            <Box w='100%'>
                <PageHeading title='Order Management'>
                    <HStack>
                        <Button 
                            text='Export'
                            iconType='export'
                            variant='outline'
                            color={'#0E2354'}
                        />
                        {/* <Button 
                            text='Add Order'
                            iconType='add'
                        /> */}
                    </HStack>
                </PageHeading>

                <Tabs 
                    headings={["All Order", "Preparing", "Dispatched", "Delivered", "Cancelled"]}
                    panels={[
                        <OrderTable filter={filter} />,
                        <></>,
                        <></>,
                        <></>,
                        <></>,
                    ]}
                />
            </Box>
        </PageMainContainer>
    )
}
