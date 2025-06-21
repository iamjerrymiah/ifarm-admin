import { Box, HStack, Skeleton, Stack, Text } from "@chakra-ui/react";
import Rating from "../../../common/Form/Rating";
import EmptyListHero from "../../../common/Hero/EmptyListHero";
import { prettyDateFormat } from "../../../utils/utils";

export default function CustomerReviews({ isLoading, reviews = [] }: { isLoading: boolean; reviews: any[] }) {
    return (
        <Box
            p={4}
            mt={8}
            border={'1px solid #D0D5DD'}
            borderRadius={'16px'}
        >
            <Text fontSize={'16px'} color={'#101828'} fontWeight={500} mb={6}>Customer Reviews</Text>
            {isLoading ? <Skeleton borderRadius={'md'} h={'80px'} w='100%' /> :
            <Stack 
                spacing={4} 
                pb={4}
                h={'260px'}
                overflowY={'scroll'}
                className="scroll-custom"
            >
                {reviews?.length <=0 ? <EmptyListHero text="No reviews available"/> :
                    reviews?.map((review:any, i:any) => (
                        <Box key={i} p={3} boxShadow={'lg'}>
                            <HStack w='100%' justify={'space-between'} mb={2}>
                                <Text color={'#344054'} fontSize={'14px'}>{review?.user?.name ?? ""}</Text>
                                <Rating rating={Number(review?.rating ?? 0)} />
                            </HStack>

                            <Text color={'#475467'} fontSize={'12px'}>{review?.comment ?? ""}</Text>
                            <Text color={'#475467'} fontSize={'12px'}>{prettyDateFormat(review?.created_at) ?? ""}</Text>
                        </Box>
                    ))}

            </Stack> 
            }
        </Box>
    )
}
