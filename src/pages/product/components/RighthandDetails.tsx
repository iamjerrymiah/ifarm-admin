import { Badge, Divider, Flex, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react'
import { ElementColor, TextColor } from '../../../constants/colors'
import Rating from '../../../common/Form/Rating'
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa'

export default function RighthandDetails({
    data = {}
}:{data:any}) {
    return (
        <VStack 
            alignItems="flex-start" 
            h={['100%','100%','100%','400px']} 
            overflowY={['hidden','hidden','hidden','scroll']} 
            className="scroll-custom"
        >
            <HStack>
                <Text color={TextColor.heading} fontSize={'26px'} fontWeight={600}>{data?.name}</Text>
                <Badge bgColor={'#03723D33'} color={'#03723D'} px={2} py={1} borderRadius={'4px'}>{data?.availablity}</Badge>
            </HStack>

            <Flex mt={'5px'}>
                <Rating rating={data?.rating} numReviews={data?.numReviews} dot/>
                <Text fontSize="sm">SKU: 251,594</Text>
            </Flex>

            <HStack spacing={4} mt={'6px'}>
                <HStack>
                    <Text color="#D0D5DD" as="s" fontSize="lg">{data?.oldPrice}</Text>
                    <Text fontSize="2xl" fontWeight="bold" color={ElementColor.primary}>{data?.price}</Text>
                </HStack>

                <Badge px={2} py={1} bgColor={'#EA4B481A'} borderRadius={'30px'} color="#EA4B48">64% Off</Badge>
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
                Our tomatoes are handpicked at peak ripeness and undergo strict quality checks before shipping. Enjoy the succulent taste of produce delivered within hours of harvest.
            </Text>

            <VStack color={'#475467'} alignItems="flex-start" fontSize={'13px'} mt={'5px'}>
                <HStack><Text color={'#101828'}>Category:</Text> <p>{data?.category}</p></HStack>
                <HStack><Text color={'#101828'}>Tags:</Text> <p>{data?.tags}</p></HStack>
            </VStack>
        </VStack>
    )
}
