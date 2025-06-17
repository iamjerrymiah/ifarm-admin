import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import Rating from "../../../common/Form/Rating";

export default function CustomerReviews() {
    return (
        <Box
            p={4}
            mt={8}
            border={'1px solid #D0D5DD'}
            borderRadius={'16px'}
        >
            <Text fontSize={'16px'} color={'#101828'} fontWeight={500} mb={6}>Customer Reviews</Text>
            <Stack spacing={4} pb={4}>
                <Box p={3} boxShadow={'lg'}>
                    <HStack w='100%' justify={'space-between'}>
                        <Text color={'#344054'} fontSize={'14px'}>Alice Green</Text>
                        <Rating rating={5} />
                    </HStack>

                    <Text color={'#475467'} fontSize={'12px'}>Excellent germination rate! All varieties grew beautifully.</Text>
                    <Text color={'#475467'} fontSize={'12px'}>May 20, 2024</Text>
                </Box>

                <Box p={3} boxShadow={'lg'}>
                    <HStack w='100%' justify={'space-between'}>
                        <Text color={'#344054'} fontSize={'14px'}>Tom Parker</Text>
                        <Rating rating={3.5} />
                    </HStack>

                    <Text color={'#475467'} fontSize={'12px'}>Great selection of seeds. The Cherokee Purple variety was outstanding.</Text>
                    <Text color={'#475467'} fontSize={'12px'}>May 18, 2024</Text>
                </Box>
            </Stack>
        </Box>
    )
}
