import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import PageHeading from '../../common/PageHeader/PageHeading'
import Button from '../../common/Button/Button'
import DataInformation from './components/DataInformation'
import { Table } from '../../common/Table/Table'
import TransactionChart from '../payment/components/TransactionChart'
import PageMainContainer from '../../common/PageMain/PageMain'
import { useNavigate } from 'react-router'
import { useGetAuthState } from '../../service/auth/authHook'
import { useGetDashboardStats } from '../../service/dashboardHook'
import { formatNumberToShortForm } from '../../utils/utils'
import { useGetOrders } from '../../service/order/orderHook'

const dataFields = [
    { name: 'Order Number', key: 'number', },    
    { name: 'Order Date', key: 'created_at', date: true},   
    { name: 'Payment Method', key: 'payment_method', case: true}, 
    { name: 'Payment Status', key: 'payment_status', case: true},
    { name: 'Total Amount (₦)', key: 'total_fee', money: true },
    // { name: 'Products Ordered', key: 'product', case: true }, 
    { name: 'Order Status', key: 'status'},
    { name: 'Delivery Method', key: 'delivery_method'},
]

export default function Dashboard() {

    const navigate = useNavigate()

    const { user } = useGetAuthState()
    const { data: statData = {}, isLoading: statLoad} = useGetDashboardStats({})
    const { data: stats = {} } = statData;

    const { data: initData = {}, isLoading: orderLoad } = useGetOrders({})
    const { data: orderData = {} } = initData
    const orders:any[] = orderData?.data

    const addProduct = () => { navigate(`/main/product-management/add`) }

    return (
        <PageMainContainer title="Dashboard" description="Dashboard">
            <Box w={'100%'}>
                <PageHeading 
                    title={`Welcome back. ${user?.name ?? ""}`}
                    subHeading='Track, manage and forecast your customers and orders.'
                >
                    <HStack>
                        <Button 
                            text='Add Product'
                            iconType='add'
                            onClick={addProduct}
                        />
                    </HStack>
                </PageHeading>

                <SimpleGrid spacing={5} columns={[1,2,2,4]}>
                    <DataInformation isLoading={statLoad} title='Total Orders' value={formatNumberToShortForm(Number(stats?.total_orders || 0), 3) ?? 0} />
                    <DataInformation isLoading={statLoad} title='Inventory Status' value={formatNumberToShortForm(Number(stats?.total_inventories || 0), 3) ?? 0} vsColor='#B42318' dataValue={[45,5,30,1]}/>
                    <DataInformation isLoading={statLoad} title='Pending Deliveries' value={formatNumberToShortForm(Number(stats?.pending_deliveries || 0), 3) ?? 0}/>
                    <DataInformation isLoading={statLoad} title='Total Products' value={formatNumberToShortForm(Number(stats?.total_products || 0), 3) ?? 0} />
                </SimpleGrid>

                <Box bg="white" borderRadius="md" mt={6} mb={10} overflowX={'scroll'} className='scroll-custom'>
                    <Text color={'#101828'} fontWeight={600} fontSize="18px" mb={2}>Revenue Growth</Text>
                    <TransactionChart />
                </Box>

                <Table
                    title='Recent Orders'
                    tableFields={dataFields}
                    tableData={orders}
                    emptyText={'No data found'}
                    loading={orderLoad}
                />
            </Box>
        </PageMainContainer>
    )
}
