import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react"
import Rating from "../../../common/Form/Rating"
import Button from "../../../common/Button/Button";

export function WithAvatar ({datum, img, rating}:{
    datum:any;
    img?:any;
    rating:number
}) {
    return (
        <Flex align="flex-start">
            <Avatar src={img} name={datum} size="md" />
                <Box ml={2}>
                    <Text fontWeight={500} color='#101828'>{datum}</Text>
                    <Rating rating={rating}/>
                </Box>
        </Flex>
    )
}

export default function CustomerFeedback() {
    return (
        <Box
            w='100%'
            h='350px'
            overflowY={'scroll'}
            className="scroll-custom"
        >
            <Box p={4} borderBottom={'1px solid #E6E6E6'}>
                <HStack w='100%' justify={'space-between'}>
                    <WithAvatar datum='Adeola, Lagos' rating={4.5}/>
                    <Text color={'#D0D5DD'} fontSize={'12px'}>2 mins</Text>
                </HStack>
                <Text pl={[0,4]} mt={2} fontSize={'13px'} color={'#475467'}>
                    I’ve never tasted tomatoes so vibrant and delicious! 
                    They burst with just the right balance of sweetness and tang, 
                    and I love knowing every bite supports local farmers.
                </Text>
            </Box>

            <Box p={4} borderBottom={'1px solid #E6E6E6'}>
                <HStack w='100%' justify={'space-between'}>
                    <WithAvatar datum='Chinedu, Abuja' rating={5}/>
                    <Text color={'#D0D5DD'} fontSize={'12px'}>5 mins</Text>
                </HStack>
                <Text pl={[0,4]} mt={2} fontSize={'13px'} color={'#475467'}>
                    These tomatoes are a game-changer in my kitchen. Their firm texture and 
                    juicy interior make my salads and sauces come alive. 
                    Plus, the sustainable farming practices give me peace of mind with every purchase.
                </Text>
            </Box>

            <Box p={4} borderBottom={'1px solid #E6E6E6'}>
                <HStack w='100%' justify={'space-between'}>
                    <WithAvatar datum='Tunde, Port Harcourt' rating={4}/>
                    <Text color={'#D0D5DD'} fontSize={'12px'}>20 mins</Text>
                </HStack>
                <Text pl={[0,4]} mt={2} fontSize={'13px'} color={'#475467'}>
                    I’m amazed by the authentic, homegrown taste of these tomatoes. 
                    They remind me of the freshest produce I enjoyed growing up. 
                    Consistent quality and rich flavor make them a staple on my table.
                </Text>
            </Box>

            <Box p={4} borderBottom={'1px solid #E6E6E6'}>
                <HStack w='100%' justify={'space-between'}>
                    <WithAvatar datum='Ngozi, Benin City' rating={2.5}/>
                    <Text color={'#D0D5DD'} fontSize={'12px'}>30 Apr, 2021</Text>
                </HStack>
                <Text pl={[0,4]} mt={2} fontSize={'13px'} color={'#475467'}>
                    From their bold color to their naturally sweet flavor, these tomatoes have exceeded my expectations. 
                    Knowing they're lovingly grown by Nigerian farmers makes them even more special.
                </Text>
            </Box>

            <Button 
                mt={4}
                size={'md'}
                text="Load More"
                color={'#03723D'}
                fontSize={'14px'}
                fontWeight={600}
                bgColor={'#03723D1A'}
            />

        </Box>
    )
}
