import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import Tabs from "../../common/Tabs/Tabs";
import LefthandImagery from "./components/LefthandImagery";
import RighthandDetails from "./components/RighthandDetails";
import { Table } from "../../common/Table/Table";
import AdminAction from "./components/AdminAction";
import CustomerReviews from "./components/CustomerReviews";
import Descriptions from "./components/Descriptions";
import CustomerFeedback from "./components/CustomerFeedback";
import PageMainContainer from "../../common/PageMain/PageMain";
import { useGetProduct } from "../../service/product/productHook";
import TransparentLoader from "../../common/Loader/TransparentLoader";

const mockData = {
    name: "Tomatoes",
    availablity: "In Stock",
    rating: 4,
    numReviews: 5,
    oldPrice: "₦108,000",
    price: "₦90,000",
    category: "Vegetables",
    tags: "Vegetables, Healthy, Nigerian"
}

const dataFields = [  
    { name: 'Order', key: 'order', idChange: true},   
    { name: 'Order Date', key: 'date', date: true }, 
    { name: 'Payment Status', key: 'status'},
    { name: 'Customer', key: 'name', img: 'img', withImg: true },   
    { name: 'Products Ordered', key: 'ordered'},
    { name: 'Shipment Status', key: 'shipmentStatus' },
    { name: 'Total Amount (₦)', key: 'amount', money: true },
]


export default function ViewProduct() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string; }>();

    const { data: productData = {}, isLoading } = useGetProduct(id)
    const product = productData?.data

    const editProduct = () => { navigate(`/main/product-management/edit/${id}`) }

    const mainImage = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'; // Sample image
    const thumbnails = [mainImage, mainImage, mainImage, mainImage, mainImage, mainImage, mainImage];

    if(isLoading) {return(<TransparentLoader />)}

    return (
        <PageMainContainer title="Production Management" description="Production Management">
            <Box w='100%' pb={10}>
                <PageHeading titleSize="20px" title="View Product" subHeading="Update product details here.">
                    <Button 
                        text='Back'
                        iconType="back"
                        bgColor={'gray'}
                        onClick={() => navigate(-1)}
                    />
                    <Button 
                        text='Delete'
                        bgColor={'#101828'}
                    />
                    <Button 
                        text='Edit Product'
                        onClick={editProduct}
                    />
                </PageHeading>

                <Grid
                    mt={8} 
                    gap={[8,8,8,5]} 
                    templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "1.5fr 1fr" }} 
                >
                    <GridItem>
                        <LefthandImagery 
                            mainImage={mainImage} 
                            thumbnails={thumbnails}
                        />
                    </GridItem>

                    <GridItem>
                        <RighthandDetails 
                            data={mockData}
                        />
                    </GridItem>
                </Grid>

                <Tabs
                    mt={10} 
                    headings={["Descriptions", "Customer Feedback",]}
                    panels={[
                        <Descriptions />,
                        <CustomerFeedback />,
                    ]}
                />

                <Table
                    mt={6}
                    title="Recent Orders"
                    tableFields={dataFields}
                    tableData={[]}
                    emptyText={'No data found'}
                    loading={false}
                    numbered
                />
                <AdminAction editProduct={editProduct} />
                <CustomerReviews />

            </Box>
        </PageMainContainer>
    )
}
