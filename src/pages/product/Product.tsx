import { Box, Flex, HStack } from '@chakra-ui/react';
// import { mockProductData } from '../../constants/constants';
import PageHeading from '../../common/PageHeader/PageHeading';
import Tabs from '../../common/Tabs/Tabs';
import Button from '../../common/Button/Button';
import { useState } from 'react';
import { Input } from '../../common/Form/Input';
import { BsSearch } from 'react-icons/bs';
import { Table } from '../../common/Table/Table';
import { useNavigate } from 'react-router';
import PageMainContainer from '../../common/PageMain/PageMain';
import { useGetProducts } from '../../service/product/productHook';
import Pagination from '../../common/Pagination/Pagination';

const dataFields = [
    { name: 'Product Name', key: 'name', img: 'img', withImg: true },    
    // { name: 'Product ID', key: 'id', idChange: true},    
    { name: 'Product SKU/ID', key: 'sku', idChange: true },
    { name: 'Stock', key: 'quantity', numShortForm: true},
    { name: 'Category', key: 'category_name'},
    { name: 'Price', key: 'price', money: true },
    { name: 'Last Updated', key: 'updated_at', date: true }, 
    { name: 'Status', key: 'status'},
]

const ProductTable = ({
    filter,
    filterCatgory = '',
    products = [],
    setFilter,
    isLoading,
    currentPage,
    totalPages
}:any) => {

    const navigate = useNavigate()

    const changePage = ({ selected = 0 }) => {
        setFilter({ ...filter, page: selected + 1 });
    }

    const editProduct = (datum:any) => { navigate(`/main/product-management/edit/${datum?.id}`) }
    const viewProduct = (datum:any) => { navigate(`/main/product-management/view/${datum?.id}`) }
// search_query
    return (
        <Box w='100%'>
            <Box overflowX="auto" className='scroll-custom'>
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <Input 
                            name="search"
                            value={filter?.search}
                            placeholder="Search product by name, category, SKU/ID or keywords" 
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
                tableData={products}
                emptyText={'No data found'}
                loading={isLoading}
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

            <Pagination
                onPageChange={changePage}
                currentPage={currentPage}
                pageCount={totalPages}
            />

        </Box>
    );
};


export default function Product() {

    const navigate = useNavigate()
    const [filter, setFilter] = useState<any>({})

    const { data: initData = {}, isLoading } = useGetProducts(filter)
    const { data: productData = {} } = initData
    const products:any[] = productData?.data

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
                        (
                            <ProductTable
                                filter={filter}
                                setFilter={setFilter}
                                products={products ?? []}
                                isLoading={isLoading}
                                currentPage={productData?.current_page}
                                totalPages={productData?.total}
                            />
                        ),
                        (<></>),
                        <></>,
                        <></>,
                        <></>,
                    ]}
                />

            </Box>
        </PageMainContainer>
    )
}
