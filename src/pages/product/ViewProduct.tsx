import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import LefthandImagery from "./components/LefthandImagery";
import RighthandDetails from "./components/RighthandDetails";
import { Table } from "../../common/Table/Table";
import CustomerReviews from "./components/CustomerReviews";
import Descriptions from "./components/Descriptions";
import PageMainContainer from "../../common/PageMain/PageMain";
import { useDeleteProduct, useGetProduct } from "../../service/product/productHook";
import { useGetOrders } from "../../service/order/orderHook";
import { useGetProductReviews } from "../../service/product/reviews";

import imag from "../../assets/image/noImage.png"
import { useState } from "react";
import ConfirmModal from "../../common/Modal/ConfirmModal";
import { useConfirmAction } from "../../hooks/useActions";
import Notify from "../../utils/notify";

const mockData = {
    name: "",
    sku: "",
    price: "0.0",
    discount: "0",
    quantity: "0",
    status: "inactive",
    availablity: "",
    num_reviews: 0,
    is_featured: false,
    ratings_avg_rating: 0,
    publication_date: "",
    unit_of_measure: "",
    specifications: "",
    short_description: "",
    long_description: "",
    custom_attributes: "",
    seo_title: "",
    seo_description: "",
    category: {name: ""},
    tags: [],
    images: [],
}

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

function ViewProductMain ({ id, product = {}, isLoading, orderData = {}, orderLoad, reviews = [], reviewLoad }:any) {

    const navigate = useNavigate()
    const editProduct = () => { navigate(`/main/product-management/edit/${id}`) }
    const { isOpenConfirm, openConfirm, closeConfirm, current } = useConfirmAction()

    // const mainImage = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'; // Sample image
    const thumbnails = [imag,imag,imag,imag,imag];

    const imageUrls = product?.images?.map((img:any) => img.image_url);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const shouldDelete = (data:any) => { openConfirm(data) }

    const { mutateAsync: deleteAction, isPending } = useDeleteProduct()
    const deleteProduct = async () => {
        try {
            const res:any = await deleteAction({id: current?.id})
            Notify.success("Deleted")
            navigate(`/main/product-management`)
            return res
        } catch(e:any) { Notify.error(e?.message ?? "Failed"); return e; }
    }

    return (
        <Box w='100%' pb={10}>
            <PageHeading 
                isLoading={isLoading}
                titleSize="20px" 
                title="View Product" 
                subHeading="Update product details here."
            >
                <Button 
                    text='Back'
                    iconType="back"
                    bgColor={'gray'}
                    onClick={() => navigate(-1)}
                />
                <Button 
                    text='Delete'
                    bgColor={'#101828'}
                    isLoading={isPending}
                    disabled={isPending}
                    onClick={() => shouldDelete({id: id})}
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
                        mainImage={imageUrls[selectedIndex] ?? imag} 
                        thumbnails={imageUrls ?? thumbnails}
                        // mainImage={thumbnails[selectedIndex]}
                        // thumbnails={thumbnails}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                </GridItem>

                <GridItem>
                    <RighthandDetails data={product} />
                </GridItem>
            </Grid>

            <Box mt={5}>
                <Descriptions data={product} />
            </Box>

            <Table
                mt={6}
                title="Recent Orders"
                tableFields={dataFields}
                tableData={orderData?.data ?? []}
                emptyText={'No data found'}
                loading={orderLoad}
                numbered
            />
            {/* <AdminAction editProduct={editProduct} /> */}
            <CustomerReviews reviews={reviews} isLoading={reviewLoad}/>

            <ConfirmModal 
                isOpen={isOpenConfirm}
                onClose={closeConfirm}
                onConfirm={deleteProduct}
            />

        </Box>
    )
}


export default function ViewProduct() {

    const { id } = useParams<{ id: string; }>();
    const { data: productData = {}, isLoading } = useGetProduct(id)

    const { data: initData = {}, isLoading: orderLoad } = useGetOrders({product_id: id})
    const { data: orderData = {} } = initData

    const { data: reviewData = {}, isLoading: reviewLoad } = useGetProductReviews(id)
    const { data: reviews = [] } = reviewData;


    return (
        <PageMainContainer title="Production Management" description="Production Management">
            <ViewProductMain 
                id={id}
                reviews={reviews}
                orderLoad={orderLoad}
                orderData={orderData}
                isLoading={isLoading}
                reviewLoad={reviewLoad}
                product={productData?.data ?? mockData}
            />
        </PageMainContainer>
    )
}
