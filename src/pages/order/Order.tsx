import { Box, Flex, HStack } from '@chakra-ui/react'
import PageHeading from '../../common/PageHeader/PageHeading'
import Button from '../../common/Button/Button'
import Tabs from '../../common/Tabs/Tabs'
import { Input } from '../../common/Form/Input'
import { BsSearch } from 'react-icons/bs'
import { Table } from '../../common/Table/Table'
import { useState } from 'react'
import PageMainContainer from '../../common/PageMain/PageMain'
import { useNavigate } from 'react-router'
import { useGetOrders } from '../../service/order/orderHook'
import Pagination from '../../common/Pagination/Pagination'


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

function OrderTable({
    orders = [],
    filter, 
    setFilter, 
    isLoading, 
    currentPage, 
    totalPages 
}:any) {

    const navigate = useNavigate()
    const viewOrder = (datum:any) => { navigate(`/main/order-management/view/${datum?.id}`) }

    const changePage = ({ selected = 0 }) => {
        setFilter({ ...filter, page: selected + 1 });
    }

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
                tableData={orders}
                emptyText={'No data found'}
                loading={isLoading}
                numbered
                options={[
                    {
                        name: 'View',
                        onUse: (datum: any) => { viewOrder(datum) },
                    },
                    // {
                    //     name: 'Delete',
                    //     color: 'red.500',
                    //     onUse: (datum: any) => { },
                    // },
                ]}
            />

            <Pagination
                onPageChange={changePage}
                currentPage={currentPage}
                pageCount={totalPages}
            />

        </Box>
    )
}

export default function Order() {

    const [filter, setFilter] = useState<any>({})

    const { data: initData = {}, isLoading } = useGetOrders(filter)
    const { data: orderData = {} } = initData
    const orders:any[] = orderData?.data

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
                    </HStack>
                </PageHeading>

                <Tabs 
                    headings={["All Order", "Preparing", "Dispatched", "Delivered", "Cancelled"]}
                    panels={[
                        <OrderTable 
                            filter={filter}
                            setFilter={setFilter}
                            orders={[{id: 'jdjfkfjsj'}, orders]}
                            isLoading={isLoading}
                            currentPage={orderData?.current_page}
                            totalPages={orderData?.total}
                        />,
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
