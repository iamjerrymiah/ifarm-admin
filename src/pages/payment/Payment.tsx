import { Box, Flex, Grid, GridItem, Select, SimpleGrid } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import { Table } from "../../common/Table/Table";
import StatCard from "./components/StatCard";
import TransactionChart from "./components/TransactionChart";
import PageMainContainer from "../../common/PageMain/PageMain";
import { useGetTransaction, useGetTransactionStat } from "../../service/transaction/transactionHook";
import { formatNumberToShortForm } from "../../utils/utils";
import Pagination from "../../common/Pagination/Pagination";
import { useState } from "react";
import DateRangePicker from "./components/DateRangePicker";

const dataFields = [  
    { name: 'Transaction ID', key: 'id', idChange: true},    
    { name: 'Date & Time', key: 'date', date: true},
    { name: 'Customer', key: 'customer', img: 'img', withImg: true },  
    { name: 'Price', key: 'price', money: true },
    { name: 'Order ID', key: 'orderId' },
    { name: 'Payment Method', key: 'paymentMethod', case: true }, 
    { name: 'Status', key: 'status'},
]

export default function Payment() {

    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const [range, setRange] = useState({
        start_date: formatDate(oneMonthAgo),
        end_date: formatDate(today),
    });

    const [filter, setFilter] = useState<any>({})
    const [statFilter, setStatFilter] = useState<any>(range)

    const { data: transactionData = {}, isLoading } = useGetTransaction(filter)
    const { data: transactions = {} } = transactionData;

    const { data:statData = {}, isLoading:statLoad } = useGetTransactionStat(statFilter)
    const { data: stats = {} } = statData;

    const changePage = ({ selected = 0 }) => {
        setFilter({ ...filter, page: selected + 1 });
    }

    // const handleDateRangeChange = (range: { start_date: string; end_date: string }) => {
    //     // setStatFilter({ ...range })
    // };

    const onFilter = () => {
        setStatFilter({ ...range });
    }


    return (
        <PageMainContainer title="Payment & Revenue" description="Payment & Revenue">
            <Box w='100%'>
                <PageHeading title='Payment & Revenue' childrenProps={{ overflowX: 'scroll' }}>
                    <DateRangePicker
                        today={today} 
                        range={range}
                        setRange={setRange}
                        onFilter={onFilter}
                        formatDate={formatDate}
                        // onChange={handleDateRangeChange} 
                    />
                </PageHeading>

                <Box pb={10}>
        
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
                        <StatCard 
                            label="Total Sales" 
                            isLoading={statLoad}
                            endDate={statFilter?.end_date} 
                            startDate={statFilter?.start_date}
                            value={`₦${formatNumberToShortForm(Number(stats?.total_sales || 0), 3) ?? 0}`} 
                        />
                        <StatCard 
                            label="Orders" 
                            isLoading={statLoad} 
                            endDate={statFilter?.end_date}
                            startDate={statFilter?.start_date}
                            value={formatNumberToShortForm(Number(stats?.total_orders || 0), 3) ?? 0}
                        />
                        <StatCard 
                            label="Total Revenue" 
                            isLoading={statLoad}
                            endDate={statFilter?.end_date} 
                            startDate={statFilter?.start_date}
                            value={`₦${formatNumberToShortForm(Number(stats?.total_revenue || 0), 3) ?? 0}`}
                            // growth="+24%" 
                            line="#FFF3F1" 
                            bgColor="#FAFBFB" 
                        />
                        <StatCard 
                            label="Page Views" 
                            isLoading={statLoad}
                            endDate={statFilter?.end_date} 
                            startDate={statFilter?.start_date}
                            value={formatNumberToShortForm(Number(stats?.page_views || 0), 3) ?? 0} 
                            // growth="+24%" 
                            line="#FFF3F1" 
                            bgColor="#FAFBFB" 
                        />
                    </SimpleGrid>

                    <Grid 
                        gap={[5]} 
                        templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "2fr 1fr" }} 
                    >
                        <GridItem overflowX={'scroll'} className="scroll-custom">
                            <Box bg="white" borderRadius="md" >
                                <Flex justify="space-between" mb={4}>
                                    <Select 
                                        size="sm" 
                                        w="auto" 
                                        color={'#101828'} 
                                        border={'0px solid'} 
                                        fontWeight={500} 
                                        fontSize="18px"
                                    >
                                        <option>Transaction Analytics </option>
                                        <option>Customer Analytics </option>
                                    </Select>

                                    <Select size="sm" w="auto" defaultValue="12 months">
                                        <option>12 months</option>
                                        <option>30 days</option>
                                        <option>7 days</option>
                                    </Select>
                                </Flex>
                                <TransactionChart />
                            </Box>
                        </GridItem>

                        <GridItem pt={[0,0,0,10]} overflowX={'scroll'} className="scroll-custom">
                            <SimpleGrid columns={[1,2,2,1]} spacing={4}>
                                <StatCard 
                                    label="Net Revenue" 
                                    isLoading={statLoad}
                                    endDate={statFilter?.end_date}
                                    startDate={statFilter?.start_date}
                                    value={`₦${formatNumberToShortForm(Number(stats?.net_revenue || 0), 3) ?? 0}`}
                                    line="#FFF" 
                                    borderColor="#F0F2F5" 
                                />
                                <StatCard 
                                    label="Sales" 
                                    isLoading={statLoad}
                                    endDate={statFilter?.end_date}
                                    startDate={statFilter?.start_date}
                                    value={`₦${formatNumberToShortForm(Number(stats?.sales || 0), 3) ?? 0}`}
                                    line="#FFF" 
                                    borderColor="#F0F2F5" 
                                />
                            </SimpleGrid>
                        </GridItem>

                    </Grid>

                </Box>

                <Table
                    title="Recent Transactions" 
                    tableFields={dataFields}
                    tableData={transactions?.data ?? []}
                    emptyText={'No data found'}
                    loading={isLoading}
                    numbered
                />

                <Pagination
                    onPageChange={changePage}
                    currentPage={transactions?.current_page}
                    pageCount={transactions?.total}
                />
            </Box>
        </PageMainContainer>
    )
}
