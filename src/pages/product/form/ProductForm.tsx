import { Box, Stack } from "@chakra-ui/react";
import { Input } from "../../../common/Form/Input";
import { Select } from "../../../common/Form/Select";
import FormSection from "../../../common/Form/FormSection";
import Switch from "../../../common/Form/Switch";
import { TextArea } from "../../../common/Form/TextArea";
import Button from "../../../common/Button/Button";


export default function ProductForm({
    edit,
    data = {},
    errors = {},
    onChange,
    controller,
}: {edit?:boolean; data:any; controller:any; errors:any; onChange?:any;}) {

    const numberHundredArray = Array(100).fill(1).map((n, i) => n + i)

    return (
        <Box w='100%'>
            <FormSection title="General Information">
                <Box>
                    <Input 
                        label="Product Name"
                        name="name"
                        value={data?.name}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Product SKU/ID"
                        name="sku"
                        value={data?.sku}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Short Description"
                        name="short_description"
                        value={data?.short_description}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <TextArea 
                        label="Long Description"
                        name="long_description"
                        value={data?.long_description}
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
                        // required
                    />
                    <Input 
                        label="Tags/Keywords"
                        name="seo_keywords"
                        value={data?.seo_keywords}
                        onChange={controller}
                        errors={errors}
                        // required
                    />
                </Box>
            </FormSection>

            <FormSection title="Pricing & Inventory">
                <Box>
                    <Input 
                        label="Price"
                        type='money'
                        name="price"
                        value={data?.price}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Select 
                        label="Discount Options"
                        name="discount"
                        value={data?.discount}
                        onChange={controller}
                        errors={errors}
                        options={numberHundredArray}
                        required
                    />
                    <Input 
                        label="Stock Quantity"
                        name="quantity"
                        value={data?.quantity}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Select 
                        label="Unit of Measure"
                        name="unit_of_measure"
                        value={data?.unit_of_measure}
                        onChange={controller}
                        errors={errors}
                        options={["kg"]}
                        required
                    />
                </Box>
            </FormSection>

            <FormSection title="Attributes & Specifications ">
                <Box>
                    <Input 
                        label="Custom Attributes"
                        name="custom_attributes"
                        value={data?.custom_attributes}
                        onChange={controller}
                        errors={errors}
                    />
                    <Input 
                        label="Specifications Table"
                        name="specifications"
                        value={data?.specifications}
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
                    <Switch 
                        rightLabel="Featured Product"
                        subLabel="Checkbox to mark as “Featured” on the storefront."
                        name="is_featured"
                        value={data?.is_featured}
                        onChange={controller}
                    />
                    <Input 
                        label="Publication Date"
                        type="date"
                        name="publication_date"
                        value={data?.publication_date}
                        onChange={controller}
                        errors={errors}
                        // required
                    />
                    <Input 
                        label="SEO Title"
                        name="seo_title"
                        value={data?.seo_title}
                        onChange={controller}
                        errors={errors}
                        // required
                    />
                    <TextArea 
                        label="Meta Description"
                        name="seo_description"
                        value={data?.seo_description}
                        onChange={controller}
                        errors={errors}
                        // required
                    />
                    <Input 
                        label="URL Slug"
                        name="url_slug"
                        value={data?.url_slug}
                        onChange={controller}
                        errors={errors}
                        // required
                        leftElement={(<Button text="http://" px={6} borderRadius={'0px'} color={'#667085'} variant={'ghost'}/>)}
                    />
                </Stack>
            </FormSection>

            <FormSection title="Media & Assets">
                <Box>

                </Box>
            </FormSection>

            
        </Box>
    )
}
