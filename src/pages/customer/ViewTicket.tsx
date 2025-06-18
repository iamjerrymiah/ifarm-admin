import { Box, Flex, HStack, SimpleGrid, Stack, Tag, Text, VStack } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import { useNavigate } from "react-router";
import { FaPaperclip } from "react-icons/fa";
import { Select } from "../../common/Form/Select";
import { TextArea } from "../../common/Form/TextArea";
import { useState } from "react";
import { Input } from "../../common/Form/Input";

export default function ViewTicket() {
    
    const navigate = useNavigate()
    const [data, setData] = useState<any>({})

    return (
        <PageMainContainer title="Customer Support & Feedback" description="Customer Support & Feedback">
            <Box w='100%' pb={10}>

                <PageHeading title='Customer Support & Feedback' subHeading="Ticket Detail – #T1001">
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
                            text='Save Changes'
                            // onClick={}
                        />
                    </HStack>
                </PageHeading>

                <Box w='100%' fontSize={'13px'} color={'#475467'}>
                    <Flex gap={6} direction={['column', 'row']}>
                        <Stack spacing={2} flex={1} p={4} border={'1px solid #D0D5DD'} borderRadius={'15px'}>
                            <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={2}>Ticket Overview</Text>
                            <HStack justify={'space-between'}><p>Subject</p> <b>Payment Processing Issue</b></HStack>
                            <HStack justify={'space-between'}><p>Status</p> <Tag bgColor={'#FFFAEB'} color={'#B54708'}>In Progress</Tag></HStack>
                            <HStack justify={'space-between'}><p>Priority</p> <Tag bgColor={'#FEF3F2'} color={'#B42318'}>High</Tag></HStack>
                            <HStack justify={'space-between'}><p>Category</p> <b>Billing</b></HStack>
                            <HStack justify={'space-between'}><p>Created</p> <b>May 28, 2025 - 2:30 PM</b></HStack>
                            <HStack justify={'space-between'}><p>Assigned Agent</p> <b>Sarah Johnson</b></HStack>
                        </Stack>

                        <Stack spacing={4} flex={1} p={4} border={'1px solid #D0D5DD'} borderRadius={'15px'}>
                            <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={2}>Customer Information</Text>
                            <HStack justify={'space-between'}><p>Name</p> <b>John Smith</b></HStack>
                            <HStack justify={'space-between'}><p>Email</p> <b>john.smith@email.com</b></HStack>
                            <HStack justify={'space-between'}><p>Phone</p> <b>+234 123-4567</b></HStack>
                            <HStack justify={'space-between'}><p>Customer ID</p> <b>#C1234</b></HStack>
                            <HStack justify={'space-between'}><p>Account Type</p> <b>Premium</b></HStack>
                        </Stack>
                    </Flex>
                </Box>

                <Box 
                    p={4} 
                    mt={6}
                    color={'#475467'}
                    w={['100%','100%','100%','60%']}
                    fontSize={'13px'}
                    borderRadius={'15px'} 
                    border={'1px solid #D0D5DD'} 
                >
                    <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={3}>Issue Description</Text>
                    <Text>
                        I'm experiencing issues with payment processing on my recent orders. The payment fails during checkout,
                        and I receive an error message saying “Payment gateway timeout.” I’ve tried multiple credit cards, but the
                        issue persists. This has been happening for the past 3 days.
                    </Text>

                    <SimpleGrid spacing={4} mt={4} columns={[2,4]}>
                        <Button leftIcon={<FaPaperclip />} size="sm" colorScheme="blue" variant="ghost">screenshot_error.png</Button>
                        <Button leftIcon={<FaPaperclip />} size="sm" colorScheme="blue" variant="ghost">Error_details.pdf</Button>
                    </SimpleGrid>

                </Box>

                <Box
                    p={4} 
                    mt={6}
                    h={'240px'}
                    color={'#475467'}
                    fontSize={'13px'}
                    borderRadius={'15px'} 
                    border={'1px solid #D0D5DD'} 
                >
                    <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={6}>Communication Timeline</Text>

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
                    <SimpleGrid columns={[1,2]} spacing='8'>
                        <VStack align={'start'}>
                            <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={[3,6]}>Update Ticket</Text>

                            <Box w='100%'>
                                <Select 
                                    label="Status"
                                    name="status"
                                    value={data?.status}
                                    errors={{}}
                                    onChange={()=>{}}
                                    options={[]}
                                    required
                                />
                                <Select 
                                    label="Reassign Agent"
                                    name="agent"
                                    value={data?.agent}
                                    errors={{}}
                                    onChange={()=>{}}
                                    options={[]}
                                    required
                                />
                                <TextArea 
                                    label="Internal Notes"
                                    name="notes"
                                    value={data?.notes}
                                    errors={{}}
                                    onChange={()=>{}}
                                    placeholder="Add internal notes visible only to agents"
                                    required
                                />
                            </Box>

                        </VStack>

                        <VStack align={'start'}>
                            <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={[3,6]}>Reply Customer</Text>

                            <Box w='100%'>
                                <TextArea 
                                    label="Message"
                                    name="message"
                                    value={data?.message}
                                    errors={{}}
                                    onChange={()=>{}}
                                    placeholder="Type your reply to the customer..."
                                    required
                                />
                                <Input 
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={data?.email}
                                    errors={{}}
                                    onChange={()=>{}}
                                    required
                                />
                            </Box>
                            
                        </VStack>
                    </SimpleGrid>
                </Box>

            </Box>
        </PageMainContainer>
    )
}
