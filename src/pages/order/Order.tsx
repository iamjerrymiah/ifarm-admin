import { Box, Flex, HStack } from '@chakra-ui/react'
import PageHeading from '../../common/PageHeader/PageHeading'
import Button from '../../common/Button/Button'
import { BsSearch } from 'react-icons/bs'
import { Table } from '../../common/Table/Table'
import { useState } from 'react'
import PageMainContainer from '../../common/PageMain/PageMain'
import { useNavigate } from 'react-router'
import { useGetOrders } from '../../service/order/orderHook'
import Pagination from '../../common/Pagination/Pagination'
import FilterTab from '../../common/Tabs/FilterTab'
import FilterInput from '../../common/Form/FilterInput'


const dataFields = [
    { name: 'Order Number', key: 'number', },    
    { name: 'Order Date', key: 'created_at', date: true},   
    { name: 'Payment Mode', key: 'payment_mode', case: true}, 
    { name: 'Payment Status', key: 'payment_status', case: true},
    // { name: 'Customer', key: 'customer', img: 'img', withImg: true },
    { name: 'Amount (₦)', key: 'total_amount', money: true },
    { name: 'Tax Fee (₦)', key: 'tax_fee', money: true },
    { name: 'Delivery Fee (₦)', key: 'delivery_fee', money: true },
    { name: 'Total Amount (₦)', key: 'total_fee', money: true },
    // { name: 'Products Ordered', key: 'product', case: true }, 
    { name: 'Order Status', key: 'status'},
    { name: 'Delivery Method', key: 'delivery_method'},
    { name: 'Assigned Dispatch', key: 'assigned_dispatch'},
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
    const [search, setSearch] = useState("")

    const viewOrder = (datum:any) => { navigate(`/main/order-management/view/${datum?.id}`) }

    const changePage = ({ selected = 0 }) => {
        setFilter({ ...filter, page: selected + 1 });
    }

    const resetFilter = () => { setFilter({}) }

    const onFilter = () => {
        setFilter({ ...filter, search_query: search });
    }

    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <FilterInput 
                            placeholder="Search order by number or keywords" 
                            onChange={(e:any) => setSearch(e.target.value)}
                            leftElement={(<BsSearch />)}
                        />
                    </Flex>
                    <Flex gap={2}>
                        <Button 
                            size={'md'}
                            iconType='reset'
                            bgColor={'gray.400'}
                            color={'white'}
                            onClick={resetFilter}
                        />
                        <Button 
                            text='Filter'
                            size={'md'}
                            iconType='filter'
                            variant='outline'
                            color={'#344054'}
                            onClick={onFilter}
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

    const headings = ["All Order", "Preparing", "Dispatched", "Delivered", "Cancelled"]

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

                <HStack
                    px={0}
                    pb={0}
                    mb={2}
                    overflowX="auto"
                    className="scroll-custom"
                    borderBottom="1px solid #EAECF0"
                >
                    {headings.map((head, index) => {
                        const isActive = (head === "All Order" && !filter?.status) || filter?.status === head;
                        return (
                            <FilterTab 
                                key={index}
                                head={head}
                                isActive={isActive}
                                firstValue="All Order"
                                setFilter={setFilter}
                                filterWith={{ status: head }}
                            />
                        );
                    })}

                </HStack>

                <OrderTable 
                    filter={filter}
                    setFilter={setFilter}
                    orders={orders}
                    isLoading={isLoading}
                    currentPage={orderData?.current_page}
                    totalPages={orderData?.total}
                />
                
            </Box>
        </PageMainContainer>
    )
}

