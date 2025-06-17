import { Box, Flex, HStack } from '@chakra-ui/react';
import { mockProductData } from '../../constants/constants';
import PageHeading from '../../common/PageHeader/PageHeading';
import Tabs from '../../common/Tabs/Tabs';
import Button from '../../common/Button/Button';
import { useState } from 'react';
import { Input } from '../../common/Form/Input';
import { BsSearch } from 'react-icons/bs';
import { Table } from '../../common/Table/Table';
import { useNavigate } from 'react-router';
import PageMainContainer from '../../common/PageMain/PageMain';

const dataFields = [
    { name: 'Product Name', key: 'name', img: 'img', withImg: true },    
    { name: 'Product ID', key: 'id', idChange: true},    
    { name: 'Category', key: 'category'},
    { name: 'Price', key: 'price', money: true },
    { name: 'Stock', key: 'stock', case: true },
    { name: 'Last Updated', key: 'date', date: true }, 
    { name: 'Status', key: 'status'},
]

const ProductTable = ({filter}:any) => {

    const navigate = useNavigate()

    const editProduct = (datum:any) => { navigate(`/main/product-management/edit/${'jkiiw8ye683394'}`) }
    const viewProduct = (datum:any) => { navigate(`/main/product-management/view/${'lsfivslkdeurh9'}`) }

    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <Input 
                            name="search"
                            value={filter?.search}
                            placeholder="Search product by name, category, ID or keywords" 
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
                tableData={mockProductData}
                emptyText={'No data found'}
                loading={false}
                numbered
                options={[
                    {
                        name: 'View',
                        onUse: (datum: any) => { viewProduct(datum) },
                    },                    
                    {
                        name: 'Edit',
                        onUse: (datum: any) => { editProduct(datum) },
                    },
                    {
                        name: 'Delete',
                        color: 'red.500',
                        onUse: (datum: any) => { },
                    },
                ]}
            />

        </Box>
    );
};


export default function Product() {

    const navigate = useNavigate()
    const [filter, setFilter] = useState<any>({})

    const addProduct = () => { navigate(`/main/product-management/add`) }

    return (
        <PageMainContainer title="Production Management" description="Production Management">
            <Box w='100%'>
                <PageHeading title='Production Management'>
                    <HStack>
                        <Button 
                            text='Export'
                            iconType='export'
                            variant='outline'
                            color={'#0E2354'}
                        />
                        <Button 
                            text='Add Product'
                            iconType='add'
                            onClick={addProduct}
                        />
                    </HStack>
                </PageHeading>

                <Tabs 
                    headings={["All Product", "Vegetables", "Poultry", "Fish", "Meat"]}
                    panels={[
                        (<ProductTable filter={filter}/>),
                        (<ProductTable filter={filter}/>),
                        <></>,
                        <></>,
                        <></>,
                    ]}
                />

            </Box>
        </PageMainContainer>
    )
}
