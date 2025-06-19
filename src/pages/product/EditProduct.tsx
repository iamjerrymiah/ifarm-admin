import { Box, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import { TextColor } from "../../constants/colors";
import ProductForm from "./form/ProductForm";
import PageMainContainer from "../../common/PageMain/PageMain";
import { useCustomFormState } from "../../hooks/useCustomFormState";
import { useGetProduct, useUpdateProduct } from "../../service/product/productHook";
import Form from "../../common/Form/Form";
import { isObjectPropsEmpty } from "../../utils/utils";
import { useEffect } from "react";
import Notify from "../../utils/notify";

export default function EditProduct() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string; }>();

    const { data: product = {}, isLoading } = useGetProduct(id)
    const { mutateAsync } = useUpdateProduct()
    const handleSubmit = async (data:any) => {
        try {
            const payload : any = await mutateAsync({...data});
            Notify.success("Success")
            navigate(`/main/product-management`)

            return payload;
        } catch(e:any) {
            return e
        }
    }

    const { data, onChange, formState, setFormData, clearFormData, formAction } = useCustomFormState(handleSubmit, product?.data)
    const errors = formState.errors

    const controller: any = (e: any) => {
        const { name, value, type } = e.target;
        onChange(name, value, type)
    }

    useEffect(() => { if(!isLoading) { setFormData({...product?.data}) } }, [isLoading])

    return (
        <PageMainContainer title="Production Management" description="Production Management">
            <Form w='100%' pb={10} onSubmit={formAction}>
                <Text pt={[0,0,0,2]} px={[0,0,0,4]} color={TextColor.heading} fontSize={'24px'} fontWeight={500} lineHeight={2}>{"Edit Product"}</Text>
                <PageHeading 
                    isLoading={isLoading}
                    titleSize="18px" 
                    title="Product Editing Form" 
                    subHeading="Update product details here."
                >
                    <Button 
                        text='Back'
                        iconType="back"
                        bgColor={'gray'}
                        onClick={() => navigate(`/main/product-management`)}
                    />
                    <Button 
                        text='Cancel'
                        variant='outline'
                        color={'#0E2354'}
                        onClick={clearFormData}
                    />
                    <Button 
                        text='Save as Draft'
                        bgColor={'#101828'}
                    />
                    <Button 
                        type="submit"
                        text='Save & Edit'
                        isLoading={formState.pending}
                        disabled={formState.pending || isObjectPropsEmpty(data)}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <ProductForm 
                        edit
                        data={data}
                        errors={errors}
                        onChange={onChange}
                        controller={controller}
                    />
                </Box>
            </Form>
        </PageMainContainer>
    )
}
