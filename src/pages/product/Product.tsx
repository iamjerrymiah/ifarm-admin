import { Box, Flex, HStack, Skeleton } from '@chakra-ui/react';
import PageHeading from '../../common/PageHeader/PageHeading';
import Button from '../../common/Button/Button';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Table } from '../../common/Table/Table';
import { useNavigate } from 'react-router';
import PageMainContainer from '../../common/PageMain/PageMain';
import { useDeleteProduct, useGetProducts } from '../../service/product/productHook';
import Pagination from '../../common/Pagination/Pagination';
import { useGetCategories } from '../../service/product/categories';
import FilterTab from '../../common/Tabs/FilterTab';
import FilterInput from '../../common/Form/FilterInput';
import Notify from '../../utils/notify';
import { useConfirmAction } from '../../hooks/useActions';
import ConfirmModal from '../../common/Modal/ConfirmModal';

const dataFields = [
    { name: 'Product Name', key: 'name', img: 'default_image', withImg: true },    
    // { name: 'Product ID', key: 'id', idChange: true},    
    { name: 'Product SKU/ID', key: 'sku', idChange: true },
    { name: 'Stock', key: 'quantity', numShortForm: true},
    { name: 'Category', key: 'category', key1: "name"},
    { name: 'Price', key: 'price', money: true },
    { name: 'Discount', key: 'discount', money: true },
    { name: 'Last Updated', key: 'updated_at', date: true }, 
    { name: 'Status', key: 'status'},
]

const ProductTable = ({
    filter,
    products = [],
    setFilter,
    isLoading,
    currentPage,
    totalPages
}:any) => {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    const resetFilter = () => { setFilter({}) }

    const changePage = ({ selected = 0 }) => {
        setFilter({ ...filter, page: selected + 1 });
    }

    const onFilter = () => {
        setFilter({ ...filter, search_query: search });
    }

    const { isOpenConfirm, openConfirm, closeConfirm, current } = useConfirmAction()

    const editProduct = (datum:any) => { navigate(`/main/product-management/edit/${datum?.id}`) }
    const viewProduct = (datum:any) => { navigate(`/main/product-management/view/${datum?.id}`) }

    const shouldDelete = (data:any) => { openConfirm(data) }

    const { mutateAsync: deleteAction } = useDeleteProduct()
    const deleteProduct = async () => {
        try {
            const res:any = await deleteAction({id: current?.id})
            Notify.success("Deleted")
            return res
        } catch(e:any) { Notify.error(e?.message ?? "Failed"); return e; }
    }

// search_query
    return (
        <Box w='100%'>
            <Box overflowX="auto" className='scroll-custom'>
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <FilterInput 
                            placeholder="Search product by name, SKU/ID or keywords" 
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
                        onUse: (datum: any) => { shouldDelete(datum) },
                    },
                ]}
            />

            <Pagination
                onPageChange={changePage}
                currentPage={currentPage}
                pageCount={totalPages}
            />

            <ConfirmModal 
                isOpen={isOpenConfirm}
                onClose={closeConfirm}
                onConfirm={deleteProduct}
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

    const { data: categoryData = {}, isLoading: catLoad } = useGetCategories({})
    const { data: categories = [] } = categoryData;

    const addProduct = () => { navigate(`/main/product-management/add`) }

    const mockCat = [{name: "All Product", id: "", description: ""}]
    const mergedCategories = [...mockCat, ...categories];

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

                <HStack
                    px={0}
                    pb={0}
                    mb={2}
                    overflowX="auto"
                    className="scroll-custom"
                    borderBottom="1px solid #EAECF0"
                >
                    
                    {catLoad ? <Box w='full' borderRadius='md'> <Skeleton borderRadius='md' h='40px' mb={2} /></Box> :
                    <>
                        {mergedCategories?.map((head:any, index:any) => {
                            const isActive = (head?.name === "All Product" && !filter?.category_id) || filter?.category_id === head?.id;
                            return (
                                <FilterTab 
                                    key={index}
                                    minW={['50%','200px']}
                                    head={head?.name}
                                    isActive={isActive}
                                    firstValue="All Product"
                                    setFilter={setFilter}
                                    filterWith={{ category_id: head?.id }}
                                />
                            );
                        })}
                    </>
                    }

                </HStack>

                <ProductTable
                    filter={filter}
                    setFilter={setFilter}
                    products={products ?? []}
                    isLoading={isLoading}
                    currentPage={productData?.current_page}
                    totalPages={productData?.total}
                />

            </Box>
        </PageMainContainer>
    )
}
