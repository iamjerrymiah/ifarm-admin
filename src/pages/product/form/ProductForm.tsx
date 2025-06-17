import { Box, Stack } from "@chakra-ui/react";
import { Input } from "../../../common/Form/Input";
import { Select } from "../../../common/Form/Select";
import FormSection from "../../../common/Form/FormSection";
import Switch from "../../../common/Form/Switch";
import { CheckBox } from "../../../common/Form/CheckBox";
import { TextArea } from "../../../common/Form/TextArea";


export default function ProductForm({
    edit,
    data = {},
    errors = {},
    controller,
}: {edit?:boolean; data?:any; controller?:any; errors?:any}) {

    return (
        <Box w='100%'>
            <FormSection title="General Information">
                <Box>
                    <Input 
                        label="Product Name"
                        name=""
                        value={data?.name}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Product SKU/ID"
                        name=""
                        value={data?.skuId}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Short Description"
                        name=""
                        value={data?.shortDescription}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                </Box>
            </FormSection>

            <FormSection title="Category & Tags">
                <Box>
                    <Select 
                        label="Category Selection"
                        name=""
                        value={data?.category}
                        onChange={controller}
                        errors={errors}
                        options={[]}
                        required
                    />
                    <Input 
                        label="Tags/Keywords"
                        name=""
                        value={data?.tags}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                </Box>
            </FormSection>

            <FormSection title="Pricing & Inventory">
                <Box>
                    <Input 
                        label="Price"
                        type='money'
                        name=""
                        value={data?.price}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Select 
                        label="Discount Options"
                        name=""
                        value={data?.discount}
                        onChange={controller}
                        errors={errors}
                        options={[]}
                        required
                    />
                    <Input 
                        label="Stock Quantity"
                        name=""
                        value={data?.stockQuantity}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Select 
                        label="Unit of Measure"
                        name=""
                        value={data?.tags}
                        onChange={controller}
                        errors={errors}
                        options={[]}
                        required
                    />
                </Box>
            </FormSection>

            <FormSection title="Media & Assets">
                <Box>

                </Box>
            </FormSection>

            <FormSection title="Attributes & Specifications ">
                <Box>
                    <Input 
                        label="Custom Attributes"
                        name=""
                        value={data?.attribute}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Specifications Table"
                        name=""
                        value={data?.spec}
                        onChange={controller}
                        errors={errors}
                        placeholder="(Optional) Additional detailed specifications (e.g., weight, dimensions)"
                    />
                </Box>
            </FormSection>

            <FormSection title=" Status, Scheduling & SEO">
                <Stack spacing={3}>
                    <Switch 
                        rightLabel="Product Status"
                        subLabel="Toggle for Active/Inactive."
                        name="status"
                        value={data?.status}
                        onChange={controller}
                    />
                    <Input 
                        label="Publication Date"
                        type="date"
                        name=""
                        value={data?.date}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <CheckBox 
                        label="Featured Product"
                        subLabel="Checkbox to mark as “Featured” on the storefront."
                        name="featured"
                        value={data?.featured}
                        onChange={controller}
                    />
                    <Input 
                        label="SEO Title"
                        name=""
                        value={data?.seo}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <TextArea 
                        label="Meta Description"
                        name="metaDescription"
                        value={data?.metaDescription}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="URL Slug"
                        name=""
                        value={data?.url}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                </Stack>
            </FormSection>

            
        </Box>
    )
}
