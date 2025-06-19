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

const dataFields = [  
    { name: 'Order', key: 'order', idChange: true},   
    { name: 'Order Date', key: 'date', date: true }, 
    { name: 'Payment Status', key: 'status'},
    { name: 'Customer', key: 'name', img: 'img', withImg: true },   
    { name: 'Products Ordered', key: 'ordered'},
    { name: 'Shipment Status', key: 'shipmentStatus' },
    { name: 'Total Amount (₦)', key: 'amount', money: true },
]

export default function Dashboard() {

    const navigate = useNavigate()

    const { user } = useGetAuthState()
    const { data: statData = {}, isLoading: statLoad} = useGetDashboardStats({})
    const { data: stats = {} } = statData;

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
                    tableFields={dataFields}
                    tableData={[]}
                    emptyText={'No data found'}
                    loading={false}
                    numbered
                />
            </Box>
        </PageMainContainer>
    )
}
