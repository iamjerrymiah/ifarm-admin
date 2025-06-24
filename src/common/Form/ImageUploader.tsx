import React, { useRef } from 'react';
import {
  Box, Text, IconButton, Flex, Image, useDisclosure, SimpleGrid, Modal, ModalOverlay, ModalContent,
  ModalBody, ModalCloseButton, Tag, HStack
} from '@chakra-ui/react';
import { FiUploadCloud, FiTrash, FiEye } from 'react-icons/fi';

interface ImageUploaderProps {
    images: File[] | string[] | any;
    setImages: (images: File[] | string[]) => void;
    isMultiple?: boolean;
    edit?: boolean;
    deleteLoad?: boolean;
    onDelete?: (index: number, imgId?:any) => void;
    required?: boolean;
    isImageExisted: boolean | any;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    images,
    setImages,
    isMultiple = false,
    edit = false,
    onDelete,
    deleteLoad = false,
    required = false,
    isImageExisted
}) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [preview, setPreview] = React.useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (!isMultiple) {
            setImages(selectedFiles);
        } else {
            setImages([...(images as File[]), ...selectedFiles]);
        }
    };

    const handleDelete = (index: number, imgId?:any) => {
        if (edit && isImageExisted && imgId && onDelete) {
            onDelete(index, imgId); // Call delete API
        } else {
            const newImages:any = [...images];
            newImages.splice(index, 1);
            setImages(newImages);
        }
    };

    const handlePreview = (src: string) => {
        setPreview(src);
        onOpen();
    };

    const getImageSrc = (image: File | string) => typeof image === 'string' ? image : URL.createObjectURL(image);

    return (
        <>
            <Flex
                direction={'column'}
                border="2px solid #E4E7EC"
                borderRadius="md"
                p={6}
                textAlign="center"
                justify={'center'}
                align={'center'}
                cursor="pointer"
                onClick={() => fileRef.current?.click()}
                mb={4}
            >
                <Tag 
                    borderRadius={'full'} 
                    bgColor={'#F2F4F7'}
                    border={'4px solid #F9FAFB'} 
                    p={2}
                >
                    <FiUploadCloud size={32} color='#475467'/>
                </Tag>
                <Box mt={4} color={'#475467'} fontSize={'13px'}>
                    <HStack>
                        <Text color={'#03723D'} fontWeight={600}>Click to upload</Text>
                        <p>or drag and drop</p>
                    </HStack>
                    <Text fontSize="sm">PNG, JPG or  (max. 800x400px)</Text>
                </Box>
                <input
                    ref={fileRef}
                    type="file"
                    multiple={isMultiple}
                    hidden
                    accept="image/*"
                    required={required}
                    onChange={handleFileChange}
                />
            </Flex>

            {images?.length > 0 && (
                <SimpleGrid columns={[1]} spacing={4}>
                    {images.map((img:any, idx:any) => (
                        <Flex
                            key={idx}
                            p={3}
                            borderWidth="1px"
                            borderRadius="md"
                            align="center"
                            justify="space-between"
                            border={'1px solid #E4E7EC'}
                        >
                            <Flex align="center" gap={3}>
                                <Image
                                    src={isImageExisted && img?.id ? img?.image_url || img?.attachment_url : getImageSrc(img)}
                                    alt=''
                                    boxSize="50px"
                                    objectFit="cover"
                                    borderRadius="md"
                                    // cursor="pointer"
                                    // onClick={() => handlePreview(getImageSrc(img))}
                                />
                                <Text fontSize="sm" noOfLines={1}>
                                    {typeof img === 'string' ? img.split('/').pop() : img.name}
                                </Text>
                            </Flex>
                            <Flex gap={2}>
                                <IconButton
                                    size="sm"
                                    aria-label="Preview"
                                    icon={<FiEye />}
                                    onClick={isImageExisted && img?.id  ? () => {handlePreview(img?.image_url ?? img?.attachment_url)} : () => handlePreview(getImageSrc(img))}
                                />
                                <IconButton
                                    size="sm"
                                    aria-label="Delete"
                                    icon={<FiTrash color='red'/>}
                                    isLoading={deleteLoad}
                                    onClick={() => handleDelete(idx, img?.id)}
                                />
                            </Flex>
                        </Flex>
                    ))}
                </SimpleGrid>
            )}

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody p={4}>
                        <Image src={preview || ''} width="100%" borderRadius="md" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ImageUploader;