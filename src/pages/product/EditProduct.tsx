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
import { useEffect, useState } from "react";
import Notify from "../../utils/notify";
import { useCreateProductImage, useDeleteProductImage } from "../../service/product/images";
import { useQueryClient } from "@tanstack/react-query";

export default function EditProduct() {

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const [tags, setTags] = useState("")
    const { id } = useParams<{ id: string; }>();

    const [images, setImages] = useState<any[]>([]);
    const onlyFiles = images?.filter((item): item is File => item instanceof File);
    // const onlyObjects = images.filter((item): item is UploadedImage => !(item instanceof File));

    const { mutateAsync: deleteImageAction, isPending: deleteLoad } = useDeleteProductImage()
    const handleRemove = async (index: number, imgId:any) => {
        try{
            const res:any = await deleteImageAction({id: imgId})

            const updated:any = [...images];
            updated.splice(index, 1);
            setImages(updated);

            queryClient.invalidateQueries({ queryKey: ['products'] });
            Notify.success("Deleted")
            return res
        } catch(e:any){ Notify.error(e?.message ?? "Failed"); return e }
    };

    const { mutateAsync: imageAction, isPending: imagePend } = useCreateProductImage()
    const handleImageUpload = async() => {
        const payload = {'images[]': onlyFiles};
        try{
            const res:any = await imageAction([id, payload])
            Notify.success("Image(s) Uploaded")
            queryClient.invalidateQueries({ queryKey: ['products'] });
            return res
        } catch(e:any){ Notify.error(e?.message ?? "Failed"); return e }
    }

    const { data: product = {}, isLoading } = useGetProduct(id)
    const { mutateAsync } = useUpdateProduct()
    const handleSubmit = async (data:any) => {
        const arrayTag = tags?.split(", ")?.map(item => item?.trim())
        try {
            const payload : any = await mutateAsync({...data, tags: arrayTag});
            Notify.success("Success")
            queryClient.invalidateQueries({ queryKey: ['products'] });
            navigate(`/main/product-management`)

            return payload;
        } catch(e:any) { return e; }
    }

    const { data, onChange, formState, setFormData, clearFormData, formAction } = useCustomFormState(handleSubmit, product?.data)
    const errors = formState.errors

    const controller: any = (e: any) => {
        const { name, value, type } = e.target;
        onChange(name, value, type)
    }

    useEffect(() => { 
    if(!isLoading) { 
        setFormData({...product?.data}); 
        const tagsArr = product?.data?.tags?.map((e:any) => e.name)
        setTags(tagsArr?.join(", ")) //tags handling

        setImages(product?.data?.images) //image handling
    } }, [isLoading])

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
                        text='Save & Edit'
                        isLoading={formState.pending}
                        disabled={formState.pending || isObjectPropsEmpty(data)}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <ProductForm 
                        edit
                        tags={tags}
                        data={data}
                        errors={errors}
                        images={images}
                        setTags={setTags}
                        onChange={onChange}
                        setImages={setImages}
                        controller={controller}
                        uploadLoad={imagePend}
                        deleteLoad={deleteLoad}
                        handleDelete={handleRemove}
                        handleUpload={handleImageUpload}
                        isImageExisted={product?.data?.images?.length > 0}
                    />
                </Box>
            </Form>
        </PageMainContainer>
    )
}
