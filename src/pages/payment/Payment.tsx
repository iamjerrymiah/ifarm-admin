import { Box, Flex, Grid, GridItem, Select, SimpleGrid } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import { Table } from "../../common/Table/Table";
import StatCard from "./components/StatCard";
import TransactionChart from "./components/TransactionChart";
import PageMainContainer from "../../common/PageMain/PageMain";

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
    return (
        <PageMainContainer title="Payment & Revenue" description="Payment & Revenue">
            <Box w='100%'>
                <PageHeading title='Payment & Revenue'></PageHeading>

                <Box pb={10}>
        
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
                        <StatCard label="Total Sales" value="₦1,400,294" />
                        <StatCard label="Orders" value="50,00" />
                        <StatCard label="Total Revenue" value="₦11,44,294" growth="+24%" line="#FFF3F1" bgColor="#FAFBFB" />
                        <StatCard label="Page Views" value="44,294" growth="+24%" line="#FFF3F1" bgColor="#FAFBFB" />
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
                                <StatCard label="Net Revenue" value="₦10,400,294" line="#FFF" borderColor="#F0F2F5" />
                                <StatCard label="Sales" value="₦10,200,24" line="#FFF" borderColor="#F0F2F5" />
                            </SimpleGrid>
                        </GridItem>

                    </Grid>

                </Box>

                <Table
                    title="Recent Transactions " 
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
        </PageMainContainer>
    )
}
