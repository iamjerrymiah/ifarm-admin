import { Box, Flex, Grid, GridItem, HStack, Image, Stack, Tag, Text } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import MenuDropdown from "../../common/Menu/MenuDropdown";
import { GoChevronDown } from "react-icons/go";
import { Table } from "../../common/Table/Table";
import { MdOutlineCalendarToday, MdOutlineCheck } from "react-icons/md";
import { WithAvatar } from "../product/components/CustomerFeedback";
import { useParams } from "react-router";

const dataFields = [
    { name: 'Date & Time', key: 'date', date: true}, 
    { name: 'Status Update', key: 'status', },       
    { name: 'Updated By', key: 'updateBy'},
]

export default function ViewOrder() {
    
    const { id } = useParams<{ id: string; }>();

    return (
        <Box w='100%'>
            <PageHeading title="Order Detail">
                <Button 
                    text='Assign Dispatch Agent '
                    variant='outline'
                    color={'#0E2354'}
                />
                <Button 
                    text='Print Invoice'
                    bgColor={'#101828'}
                />
                <Button 
                    rightIcon={
                        <MenuDropdown 
                            withName="Actions"
                            buttonIcon={GoChevronDown}
                            buttonColor="white"
                            options={[
                                {name: "Preparing", onUse:()=>{}},
                                {name: "Dispatched", onUse:()=>{}},
                                {name: "Delivered", onUse:()=>{}},
                                {name: "Cancelled", onUse:()=>{}},
                            ]}
                        />
                    }
                />
            </PageHeading>

            <OrderGrid />

            <Table
                title="Order Timeline & Logs"
                tableFields={dataFields}
                tableData={[]}
                emptyText={'No data found'}
                loading={false}
                numbered
            />
        </Box>
    )
}

function OrderGrid (){
    const imag = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'
    return (
        <Grid
            gap={[8,8,8,4]}
            py={4} 
            color={'#101828'}
            templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "2.5fr 1fr" }} 
        >
            <GridItem>
                <Box
                    p={4}
                    borderRadius={'15px'}
                    border={'1px solid #D0D5DD'}
                >
                    <Stack mb={4} w={'100%'} justify={'space-between'} spacing={2} direction={['column', 'row']}>
                        <Flex gap={2} fontSize={'13px'}>
                            <Text>Order Number #8483982</Text>
                            <Tag bgColor={'#ECFDF3'} size='sm' color={'#F15046'}>
                                <Flex fontSize={'10px'} gap={1} color={'#027A48'}> 
                                    <MdOutlineCheck />
                                    <Text>Delivered</Text> 
                                </Flex>
                            </Tag>
                        </Flex>
                        <Flex pl={2} gap={2} borderLeft={'1px solid #D0D5DD'}>
                            <MdOutlineCalendarToday />
                            <Text fontSize={'13px'}>May 20, 2025 – 10:15 AM</Text>
                        </Flex>
                    </Stack>

                    <Box
                        borderRadius={'15px'}
                        border={'1px solid #D0D5DD'}
                        overflowY={'scroll'}
                        className="scroll-custom"
                        h={'229px'}
                    >
                        <HStack p={4} w='100%' justify={'space-between'} borderBottom={'1px solid #D0D5DD'}>
                            <Flex gap={2} align={'center'}>
                                <Image 
                                    src={imag}
                                    alt=""
                                    h={'80px'}
                                    w={'70px'}
                                    objectFit={'contain'}
                                    borderRadius={'10px'}
                                />
                                <Stack>
                                    <Text fontSize={'sm'}>Seasonal Tomato Basket</Text>
                                    <Text fontSize={'12px'} color={'#475467'}>Vegetable</Text>
                                </Stack>
                            </Flex>

                            <Stack spacing={'-2'}>
                                <Text fontSize={'sm'}>₦3,500</Text>
                                <Text fontSize={'13px'} color={'#475467'}>Qty 1</Text>
                            </Stack>
                        </HStack>

                        <HStack p={4} w='100%' justify={'space-between'} borderBottom={'1px solid #D0D5DD'}>
                            <Flex gap={2} align={'center'}>
                                <Image 
                                    src={imag}
                                    alt=""
                                    h={'80px'}
                                    w={'70px'}
                                    objectFit={'contain'}
                                    borderRadius={'10px'}
                                />
                                <Stack>
                                    <Text fontSize={'sm'}>Grass-Fed Beef Cuts</Text>
                                    <Text fontSize={'12px'} color={'#475467'}>Meats</Text>
                                </Stack>
                            </Flex>

                            <Stack spacing={'-2'}>
                                <Text fontSize={'sm'}>₦3,500</Text>
                                <Text fontSize={'13px'} color={'#475467'}>Qty 1</Text>
                            </Stack>
                        </HStack>
                        
                    </Box>

                    <Box mt={3} color={'#475467'}>
                        <Flex direction={['column', 'row']} gap={[4,8]} fontSize={'13px'} w='100%' justify={'space-between'}>
                            <Text pl={[0,5]}><b>Order Note:</b> Please deliver in the morning. Contact me if needed.Please deliver in the morning. Contact me if needed.Please deliver in the morning. Contact me if needed.</Text>
                            <Stack w={['100%', '50%']}>
                                <Flex gap={4}><Text w='50%'>Sub total</Text> <Text>₦5,000</Text></Flex>
                                <Flex gap={4}><Text w='50%'>Shipping</Text> <Text>₦1,500</Text></Flex>
                                <Flex gap={4}><Text w='50%'>Tax</Text> <Text>₦0.00</Text></Flex>
                                <Flex gap={4} borderTop={'1px solid #D0D5DD'}><b style={{width: '50%'}}>Total</b> <b>₦6,500</b></Flex>
                            </Stack>
                        </Flex>
                    </Box>
                </Box>
            </GridItem>

            <GridItem>
                <Box
                    px={4}
                    py={2}
                    pb={8}
                    h={['100%','100%','100%','413px']}
                    borderRadius={'15px'}
                    border={'1px solid #D0D5DD'}
                    overflowY={'scroll'}
                    className="scroll-custom"
                >
                    <Text mb={5}>Customer Details</Text>

                    <Stack spacing={3}>
                        <WithAvatar datum={'Adeola Martins'} align="center"/>
                        <Stack spacing={5} fontSize={'14px'} mt={4}>
                            <Box color={'#475467'}>
                                <b style={{ paddingBottom: 5 }}>Contact Info</b> 
                                <p>Email: adeola@example.com</p> 
                                <p>Phone: +234 802 123 4567</p>
                            </Box>
                            <Box color={'#475467'}>
                                <b style={{ paddingBottom: 5 }}>Delivery Address</b> 
                                <p>23B Lekki Phase 1, Lagos, Nigeria</p> 
                            </Box>
                            <Box color={'#475467'}>
                                <b style={{ paddingBottom: 5 }}>Payment Mode</b> 
                                <p>Transfer</p> 
                            </Box>
                            <Box color={'#475467'}>
                                <b style={{ paddingBottom: 5 }}>Payment</b> 
                                <Tag bgColor={'#ECFDF3'} size='sm' color={'#F15046'}>
                                    <Flex fontSize={'10px'} gap={1} color={'#027A48'}> 
                                        <MdOutlineCheck />
                                        <Text>Paid</Text> 
                                    </Flex>
                                </Tag>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </GridItem>
        </Grid>
    )
}
