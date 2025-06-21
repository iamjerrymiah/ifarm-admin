import { Box, Flex, Grid, GridItem, HStack, Image, Stack, Text } from "@chakra-ui/react"
import { MdOutlineCalendarToday } from "react-icons/md"
import { WithAvatar } from "../../product/components/CustomerFeedback"
import Button from "../../../common/Button/Button"
import StatusChanger from "../../../common/Table/StatusChanger"
import { capCase, moneyFormat, prettyDateFormat } from "../../../utils/utils"
import { OrderText } from "../../product/components/Descriptions"

import imag from "../../../assets/image/noImage.png"

export default function OrderGrid ({data}:any){
    // const imag = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'
    
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
                        <HStack gap={2} fontSize={'13px'}>
                            <Text>Order Number #{data?.number ?? "N/A"}</Text>
                            <StatusChanger datum={data?.status} />
                            <StatusChanger datum={data?.payment_status} />
                        </HStack>
                        <HStack pl={2} gap={1}>
                            <Button 
                                text='Print Invoice'
                                bgColor={'#101828'}
                            />
                            <Flex pl={2} gap={2} borderLeft={'1px solid #D0D5DD'}>
                                <MdOutlineCalendarToday />
                                <Text fontSize={'13px'}>{prettyDateFormat(data?.created_at) ?? ""}</Text>
                            </Flex>
                        </HStack>
                    </Stack>

                    <Box
                        borderRadius={'15px'}
                        border={'1px solid #D0D5DD'}
                        overflowY={'scroll'}
                        className="scroll-custom"
                        h={'229px'}
                    >
                        {data?.products?.map((prod:any) => (
                            <HStack 
                                key={prod?.product_id} 
                                p={4} 
                                w='100%' 
                                justify={'space-between'} 
                                borderBottom={'1px solid #D0D5DD'}
                            >
                                <Flex gap={2} align={'center'}>
                                    <Image 
                                        // src={prod?.product_image ?? imag}
                                        src={imag}
                                        alt=""
                                        h={'80px'}
                                        w={'70px'}
                                        objectFit={'contain'}
                                        borderRadius={'10px'}
                                    />
                                    <Stack>
                                        <Text fontSize={'sm'}>{capCase(prod?.product_name) ?? ""}</Text>
                                        <Text fontSize={'12px'} color={'#475467'}>{capCase(prod?.product_category) ?? ""}</Text>
                                    </Stack>
                                </Flex>

                                <Stack spacing={'-2'}>
                                    <Text fontSize={'sm'}>₦{moneyFormat(prod?.amount) ?? "0.0"}</Text>
                                    <Text fontSize={'13px'} color={'#475467'}>Qty {prod?.quantity ?? "0"}</Text>
                                </Stack>
                            </HStack>
                        ))}

                        
                    </Box>

                    <Box mt={3} color={'#475467'}>
                        <Flex direction={['column', 'row']} gap={[4,8]} fontSize={'13px'} w='100%' justify={'space-between'}>
                            <Box pl={[0,5]} w='100%'>
                                <Stack spacing={0} mb={3} >
                                    <OrderText fs='11px' w={['40%', '30%']} title="Payment Method:" value={capCase(data?.payment_method) ?? ""}/>
                                    <OrderText fs='11px' w={['40%', '30%']} title="Delivery Method:" value={capCase(data?.delivery_method, "_") ?? ""}/>
                                    <OrderText fs='11px' w={['40%', '30%']} title="Delivery Address:" value={capCase(data?.delivery_address) ?? ""}/>
                                </Stack>
                                <Text><b>Order Note: </b> {data?.note ?? ""}</Text>
                            </Box>
                            <Stack w={['100%', '50%']}>
                                <Flex gap={4}><Text w='40%'>Sub total</Text> <Text w='100%'>₦{moneyFormat(data?.total_amount) ?? "0.0"}</Text></Flex>
                                <Flex gap={4}><Text w='40%'>Delivery</Text> <Text w='100%'>₦{moneyFormat(data?.delivery_fee) ?? "0.0"}</Text></Flex>
                                <Flex gap={4}><Text w='40%'>Tax</Text> <Text w='100%'>₦{moneyFormat(data?.tax_fee) ?? "0.0"}</Text></Flex>
                                <Flex gap={4} borderTop={'1px solid #D0D5DD'}><b style={{width: '40%'}}>Total</b> <b style={{width: '100%'}}>₦{moneyFormat(data?.total_fee) ?? "0.0"}</b></Flex>
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
                    h={['100%','100%','100%','425px']}
                    borderRadius={'15px'}
                    border={'1px solid #D0D5DD'}
                    overflowY={'scroll'}
                    className="scroll-custom"
                >
                    <Text mb={5}>Customer Details</Text>

                    <Stack spacing={3}>
                        <WithAvatar img={data?.user?.image_url} datum={data?.user?.name} align="center"/>
                        <Stack spacing={5} fontSize={'13px'} mt={4}>
                            <Box color={'#475467'}>
                                <b style={{ paddingBottom: 5 }}>Contact Info</b> 
                                <p>Email: {data?.user?.email ?? ""}</p> 
                                <p>Phone: {data?.user?.phone ?? ""}</p>
                                <p>Username: {data?.user?.username ?? ""}</p> 
                            </Box>
                            <Box color={'#475467'}>
                                <b style={{ paddingBottom: 5 }}>Address</b> 
                                <p>{data?.user?.address ?? "N/A"}</p> 
                            </Box>
                            <Box color={'#475467'}>
                                <b style={{ paddingBottom: 5 }}>Additional Info</b> 
                                <p>{data?.user?.additional_info ?? "N/A"}</p> 
                            </Box>
                            <Box color={'#475467'}>
                                <b style={{ paddingBottom: 5 }}>Status</b> 
                                <StatusChanger datum={data?.user?.status ?? ""} />
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </GridItem>
        </Grid>
    )
}