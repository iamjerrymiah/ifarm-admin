import { Badge, Divider, Flex, HStack, IconButton, Image, Tag, Text, VStack } from '@chakra-ui/react'
import { ElementColor, TextColor } from '../../../constants/colors'
import Rating from '../../../common/Form/Rating'
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa'
import { capCase, formatNumberToShortForm, moneyFormat } from '../../../utils/utils'
import StatusChanger from '../../../common/Table/StatusChanger'

export default function RighthandDetails({
    data = {}
}:{data:any}) {

    const oldPrice = data?.price / (1 - data?.discount / 100);

    return (
        <VStack 
            alignItems="flex-start" 
            h={['100%','100%','100%','400px']} 
            overflowY={['hidden','hidden','hidden','scroll']} 
            className="scroll-custom"
        >
            <HStack>
                <Text color={TextColor.heading} fontSize={'26px'} fontWeight={600}>{capCase(data?.name) ?? ""}</Text>
                <Badge bgColor={'#03723D33'} color={'#03723D'} px={2} py={1} borderRadius={'4px'}>{Number(data?.quantity) <= 0 ? "Out of Stock" : "In Stock" }</Badge>
            </HStack>

            <Flex mt={'5px'}>
                <Rating rating={Number(data?.ratings_avg_rating) ?? 0} dot/>
                <Text fontSize="sm">SKU: {data?.sku ?? ""}</Text>
            </Flex>

            <HStack spacing={4} mt={'6px'}>
                <HStack>
                    <Text color="#D0D5DD" as="s" fontSize="lg">{moneyFormat(oldPrice ?? 0) ?? 0}</Text>
                    <Text fontSize="2xl" fontWeight="bold" color={ElementColor.primary}>₦{moneyFormat(data?.price) ?? "0.0"}</Text>
                </HStack>

                <Badge px={2} py={1} bgColor={'#EA4B481A'} borderRadius={'30px'} color="#EA4B48">{data?.discount ?? "0"}% Off</Badge>
            </HStack>
            <Divider mt={3}/>

            <HStack w='100%' justify={'space-between'} mt={'10px'}>
                <HStack w="100%">
                    <Text fontSize={'13px'} color={ElementColor.primary}>Brand:</Text>
                    <Image src="https://img.icons8.com/fluency/48/leaf.png" w="30px" />
                </HStack>

                <HStack w='100%'>
                    <Text fontSize={'13px'} color={'#1A1A1A'}>Share:</Text>
                    <IconButton bgColor={'#03723D'} borderRadius={'100%'} color={'white'} icon={<FaFacebookF />} aria-label="facebook" />
                    <IconButton color={'#101828'} icon={<FaTwitter />} aria-label="twitter" variant={'ghost'}/>
                    <IconButton color={'#101828'} icon={<FaInstagram />} aria-label="pinterest" variant={'ghost'}/>
                    <IconButton color={'#101828'} icon={<FaPinterestP />} aria-label="pinterest" variant={'ghost'}/>
                </HStack>
            </HStack>

            <Text mt={'10px'} fontSize="13px" color="#475467">
                {data?.short_description ?? ""}
            </Text>

            <VStack color={'#475467'} alignItems="flex-start" fontSize={'13px'} mt={'5px'}>
                <HStack><Text color={'#101828'}>Quantity:</Text> <p>{formatNumberToShortForm(data?.quantity ?? 0, 5) ?? "0"}</p></HStack>
                <HStack>
                    <Text color={'#101828'}>Stock Status:</Text> 
                    <StatusChanger datum={data?.status}/>
                    {/* {allLower(data?.status) === 'active' ? <Tag size={'sm'} colorScheme='whatsapp' py={1} px={2} color={'#027A48'}>{data?.status}</Tag> : <Tag size={'sm'} colorScheme='red' py={1} px={2} color={'#F15046'}>{"Inactive"}</Tag>}  */}
                </HStack>
                <HStack><Text color={'#101828'}>Category:</Text> <p>{data?.category?.name ?? ""}</p></HStack>
            </VStack> 
        </VStack>
    )
}
