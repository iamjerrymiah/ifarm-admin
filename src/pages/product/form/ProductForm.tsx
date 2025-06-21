import { Box, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Input } from "../../../common/Form/Input";
import { Select } from "../../../common/Form/Select";
import FormSection from "../../../common/Form/FormSection";
import Switch from "../../../common/Form/Switch";
import { TextArea } from "../../../common/Form/TextArea";
import Button from "../../../common/Button/Button";
import { useGetCategories } from "../../../service/product/categories";
import { useMemo } from "react";
import CreatableSelect from 'react-select/creatable';
import { TextColor } from "../../../constants/colors";
import { allCaps, formatNumberToShortForm } from "../../../utils/utils";
import ImageUploader from "../../../common/Form/ImageUploader";


export default function ProductForm({
    edit,
    tags,
    data = {},
    errors = {},
    setTags,
    onChange,
    controller,
    images,
    setImages,
    handleDelete,
    handleUpload,
    uploadLoad,
    deleteLoad,
    isImageExisted
}: {
    edit?:boolean; 
    data:any; 
    tags:string; 
    setTags:any; 
    controller:any; 
    errors:any; 
    onChange?:any;
    images?: File[] | string[] | any;
    setImages?: any;
    isImageExisted?: boolean;
    uploadLoad?: boolean;
    deleteLoad?: boolean;
    handleDelete?: (index: number, imgId?:any) => void;
    handleUpload?: () => Promise<any>
}) {

    const { data: categoryData = {} } = useGetCategories({})
    const { data: categories = [] } = categoryData;

    const catNames = useMemo(() => categories?.map((e:any) => e.name), [categories])
    const catId = useMemo(() => categories.map((e:any) => e.id), [categories])

    const numberHundredArray = Array(100).fill(1).map((n, i) => n + i)

    const shouldEnableButton = () => {
        if (images.length === 0) return true;
        return images.some((item:any) => item instanceof File);
    };
    const isAllowed = shouldEnableButton()

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
                        name="category_id"
                        value={data?.category_id}
                        errors={errors}
                        options={catId}
                        displayValues={catNames}
                        onChange={e => {
                            const { name, value, type } = e.target;
                            const cat = categories?.find((x:any) => x.id == value);
                            if(cat)
                            {
                                onChange('category_id', cat?.id);
                            }
                            onChange(name, value, type);
                        }}
                        required
                    />

                    <FormControl>
                        <FormLabel fontSize='13px' paddingBottom='15px' color={TextColor.label}>Tags/Keywords</FormLabel>
                        <CreatableSelect
                            isMulti
                            // required
                            placeholder="Type and press enter..."
                            value={(tags || '')?.split(', ')?.filter((c:any) => c)?.map((tag:any) => ({ label: tag, value: tag }))}
                            onChange={(selectedOptions:any) => {
                            const sizeString = selectedOptions?.map((option:any) => option?.value).join(', ');
                                setTags(sizeString);
                            }}
                            styles={{
                            control: (base:any) => ({
                                ...base,
                                borderColor: errors?.colors ? "crimson" : base.borderColor,
                            }),
                            }}
                        />
                    </FormControl>
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
                        value={formatNumberToShortForm(Number(data?.discount), 1)}
                        onChange={controller}
                        errors={errors}
                        options={numberHundredArray}
                        // required
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
                        value={allCaps(data?.unit_of_measure)}
                        onChange={controller}
                        errors={errors}
                        options={["DOZ","GMS","KG","MTR","UNT","PCS","PRS","BOX","TBZ"]}
                        displayValues={["Dozen","Grams","Kilograms","Meters","Units","Pieces","Pairs","Box","Tablets"]}
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
                        subLabel="Toggle to mark as “Featured” on the storefront."
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
                        required
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

            {edit &&
                <FormSection 
                    title="Media & Assets" 
                    node={isAllowed ?  
                        (<Button 
                            text={"Save Images" }
                            disabled={uploadLoad || images?.length <= 0}
                            isLoading={uploadLoad}
                            onClick={handleUpload}
                        />) : <></>
                    }
                >
                    <Box>
                        <ImageUploader
                            edit={edit}
                            images={images}
                            isMultiple={true}
                            setImages={setImages}
                            onDelete={handleDelete}
                            deleteLoad={deleteLoad}
                            isImageExisted={isImageExisted}
                        />
                    </Box>
                </FormSection>
            }

            
        </Box>
    )
}
