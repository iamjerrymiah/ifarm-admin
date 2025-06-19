import { Box, HStack, SimpleGrid, Stack, Tag, Text } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import PageHeading from "../../common/PageHeader/PageHeading";
import { useNavigate } from "react-router";
import Button from "../../common/Button/Button";
import { WithAvatar } from "../product/components/CustomerFeedback";
import Rating from "../../common/Form/Rating";
import { FaPaperclip } from "react-icons/fa";
import { useState } from "react";
import { TextArea } from "../../common/Form/TextArea";
import { Select } from "../../common/Form/Select";

export default function ViewFeedback() {

    const navigate = useNavigate()
    const [data, setData] = useState<any>({})

    return (
        <PageMainContainer title="Customer Support & Feedback" description="Customer Support & Feedback">
            <Box w='100%' pb={10}>
                <PageHeading title='Customer Feedback View' subHeading="Feedback Detail – FB-2024-0847">
                    <HStack>
                        <Button 
                            text='Back'
                            bgColor={'gray'}
                            iconType="back"
                            onClick={()=>navigate(-1)}
                        />
                        <Button 
                            text='Cancel'
                            variant='outline'
                            color={'#0E2354'}
                        />
                        <Button 
                            text='Flag For Review'
                            // onClick={}
                        />
                    </HStack>
                </PageHeading>

                <Box 
                    p={4}
                    w='100%' 
                    fontSize={'13px'} 
                    color={'#475467'}
                    border={'1px solid #D0D5DD'} 
                    borderRadius={'15px'}
                >
                    <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={2}>Feedback Summary</Text>
                    <Stack>
                        <HStack justify={'space-between'}><p>Feedback ID</p> <b>FB-2024-0847</b></HStack>
                        <HStack justify={'space-between'}><p>Submission Date</p> <b>May 28, 2024 at 03:30 PM</b></HStack>
                        <HStack justify={'space-between'}><p>Order Reference</p> <Tag bgColor={'#EEC4011A'} color={'#EEC401'}>ORD-2024-3421</Tag></HStack>
                        <HStack justify={'space-between'}><p>Feedback Type</p> <Tag fontSize={'11px'} bgColor={'#027A481A'} color={'#027A48'}>Product Review</Tag></HStack>
                        <WithAvatar datum={'Olivia Rhye'} sub="olivia@gmail.com" align="center"/>
                        <HStack align={'center'} mt={2}><p>Rating:</p> <Rating rating={5}/></HStack>
                        <HStack justify={'space-between'}><p>Status</p> <Tag fontSize={'11px'} bgColor={'#5925DC1A'} color={'#5925DC'}>Pending</Tag></HStack>
                    </Stack>
                </Box>

                <Box
                    p={4} 
                    mt={8}
                    color={'#475467'}
                    fontSize={'13px'}
                    borderRadius={'15px'} 
                    border={'1px solid #D0D5DD'} 
                >
                    <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={6}>Feedback Content</Text>

                    <Box boxShadow={'md'} py={4} px={2} mb={2}>
                        <HStack w='100%' color={'#475467'} justify={'space-between'}>
                            <b>Customer Feedback</b>
                            {/* <p>28 May, 2025 - 2:30PM</p> */}
                        </HStack>
                        <Text fontSize={'12px'}>
                            I recently purchased the wireless headphones and overall I'm quite satisfied with the quality. 
                            The sound is crisp and the battery life is excellent. However, I did notice that the padding on the ear cups could be more comfortable for extended use. 
                            The packaging was also damaged upon arrival, though the product itself was fine. Would appreciate if this could be addressed for future orders.
                        </Text>
                    </Box>

                    <Box my={4}>
                        <b>Attachments</b>
                        <SimpleGrid spacing={4} columns={[2,3,3,6]}>
                            <Button leftIcon={<FaPaperclip />} size="sm" colorScheme="blue" variant="ghost">screenshot_error.png</Button>
                            <Button leftIcon={<FaPaperclip />} size="sm" colorScheme="blue" variant="ghost">Package_damage.jpg</Button>
                        </SimpleGrid>
                    </Box>

                    <Box p={2} pb={3} fontSize={'13px'} color={'#475467'} bgColor={'#EEC4011A'} boxShadow={'md'}>
                        <b>Admin Notes</b>
                        <Text fontSize={'12px'}>Customer reported packaging damage. Product quality rated highly. Consider reviewing packaging standards.</Text>
                    </Box>
                </Box>

                <Box
                    p={4} 
                    mt={8}
                    h={'240px'}
                    color={'#475467'}
                    fontSize={'13px'}
                    borderRadius={'15px'} 
                    border={'1px solid #D0D5DD'} 
                >
                    <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={6}>Response History</Text>

                    <Box h={'160px'} overflowY={'scroll'} className="scroll-custom">
                        <Box boxShadow={'md'} py={4} px={2} mb={2}>
                            <HStack w='100%' color={'#475467'} justify={'space-between'}>
                                <b>John Smith (Customer)</b>
                                <p>28 May, 2025 - 2:30PM</p>
                            </HStack>
                            <Text fontSize={'12px'}>I'm experiencing issues with payment processing on my recent orders. The payment fails during checkout with a gateway timeout error.</Text>
                        </Box>
                        <Box boxShadow={'md'} py={4} px={2} mb={2}>
                            <HStack w='100%' color={'#475467'} justify={'space-between'}>
                                <b>John Smith (Customer)</b>
                                <p>28 May, 2025 - 2:30PM</p>
                            </HStack>
                            <Text fontSize={'12px'}>I'm experiencing issues with payment processing on my recent orders. The payment fails during checkout with a gateway timeout error.</Text>
                        </Box>
                    </Box>

                </Box>

                <Box p={4} mt={8} borderRadius={'15px'} border={'1px solid #D0D5DD'}>
                    <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={[3,6]}>Admin Actions</Text>
                    <SimpleGrid columns={[1,2]} spacing='8'>
                        <TextArea 
                            label="Respond to Customer"
                            name="notes"
                            value={data?.notes}
                            errors={{}}
                            onChange={()=>{}}
                            placeholder="Type your reply to the customer..."
                            required
                        />
                        <Select 
                            label="Update Status"
                            name="status"
                            value={data?.status}
                            errors={{}}
                            onChange={()=>{}}
                            options={[]}
                            required
                        />

                    </SimpleGrid>
                </Box>

            </Box>
        </PageMainContainer>
    )
}
