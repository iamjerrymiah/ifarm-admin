import { Box, Text } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import { TextColor } from "../../constants/colors";
import Button from "../../common/Button/Button";
import ProductForm from "./form/ProductForm";
import PageMainContainer from "../../common/PageMain/PageMain";
import { useCustomFormState } from "../../hooks/useCustomFormState";
import Form from "../../common/Form/Form";
import { useNavigate } from "react-router";
import { isObjectPropsEmpty } from "../../utils/utils";
import { useCreateProduct } from "../../service/product/productHook";
import Notify from "../../utils/notify";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function AddProduct() {

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const [tags, setTags] = useState("")
    const [images, setImages] = useState<File[] | string[]>([]);

    const { mutateAsync } = useCreateProduct()
    const handleSubmit = async (data:any) => {
        const arrayTag = tags?.split(", ")?.map(item => item?.trim())
        try {
            const payload : any = await mutateAsync({...data, tags: arrayTag});
            Notify.success("Success")
            queryClient.invalidateQueries({ queryKey: ['products'] });
            navigate(`/main/product-management`)
            return payload;
        } catch(e:any) {
            return e
        }
    }

    const { data, onChange, formState, clearFormData, formAction } = useCustomFormState(handleSubmit, {})
    const errors = formState.errors

    const controller: any = (e: any) => {
        const { name, value, type } = e.target;
        onChange(name, value, type)
    }

    return (
        <PageMainContainer title="Production Management" description="Production Management">

            <Form w='100%' pb={10} onSubmit={formAction}>
                <Text pt={[0,0,0,2]} px={[0,0,0,4]} color={TextColor.heading} fontSize={'24px'} fontWeight={500} lineHeight={2}>{"Create New Product"}</Text>
                <PageHeading titleSize="18px" title="Product Creation Form" subHeading="Update product details here.">
                    <Button 
                        text='Back'
                        iconType="back"
                        bgColor={'gray'}
                        onClick={() => navigate(-1)}
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
                        text='Save & Publish'
                        isLoading={formState.pending}
                        disabled={formState.pending || isObjectPropsEmpty(data)}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <ProductForm 
                        tags={tags}
                        data={data}
                        errors={errors}
                        images={images}
                        setTags={setTags}
                        onChange={onChange}
                        setImages={setImages}
                        controller={controller}
                        // handleDelete={handleRemove}
                    />
                </Box>
                
            </Form>

        </PageMainContainer>
    )
}
