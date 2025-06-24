import { Box, HStack, Stack, Tag, Text } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import PageHeading from "../../common/PageHeader/PageHeading";
import { useNavigate, useParams } from "react-router";
import Button from "../../common/Button/Button";
import { WithAvatar } from "../product/components/CustomerFeedback";
import Rating from "../../common/Form/Rating";
import { useGetFeedback, useHideFeedback } from "../../service/user/feedbackHook";
import { allLower, capCase, prettyDateFormat } from "../../utils/utils";
import StatusChanger from "../../common/Table/StatusChanger";
import Notify from "../../utils/notify";
import { useConfirmAction } from "../../hooks/useActions";
import ConfirmModal from "../../common/Modal/ConfirmModal";

export default function ViewFeedback() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string; }>();
    const { isOpenConfirm, openConfirm, closeConfirm, current } = useConfirmAction()

    const { data: feedbackData = {}, isLoading } = useGetFeedback(id)
    const { data: feedback = {} } = feedbackData;

    const shouldHide = (data:any) => { openConfirm(data) }

    const { mutateAsync: hideAction } = useHideFeedback()
    const hideProduct = async () => {
        try {
            const res:any = await hideAction({id: current?.id})
            Notify.success("Success")
            return res
        } catch(e:any) { Notify.error(e?.message ?? "Failed"); return e; }
    }
   

    return (
        <PageMainContainer title="Customer Support & Feedback" description="Customer Support & Feedback">
            <Box w='100%' pb={10}>
                <PageHeading 
                    isLoading={isLoading}
                    title='Customer Feedback View' 
                    subHeading={`Feedback Detail – ${feedback?.feedback_identifier ?? "N/A"}`}
                >
                    <HStack>
                        <Button 
                            text='Back'
                            bgColor={'gray'}
                            iconType="back"
                            onClick={()=>navigate(-1)}
                        />
                        {!feedback?.is_hidden &&
                            <Button 
                                text='Hide Feedback'
                                variant='outline'
                                color={'#EEC401'}
                                border={'1px solid #EEC401'}
                                onClick={() => shouldHide(feedback)}
                            />
                        }
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
                        <HStack justify={'space-between'}><p>Feedback ID</p> <b>{feedback?.feedback_identifier ?? ""}</b></HStack>
                        <HStack justify={'space-between'}><p>Submission Date</p> <b>{prettyDateFormat(feedback?.created_at) ?? ""}</b></HStack>
                        <HStack justify={'space-between'}><p>Order Reference</p> <Tag bgColor={'#EEC4011A'} color={'#EEC401'}>{feedback?.order?.number ?? ""}</Tag></HStack>
                        <HStack justify={'space-between'}><p>Feedback Type</p> <Tag fontSize={'11px'} bgColor={'#027A481A'} color={'#027A48'}>{capCase(feedback?.feedback_type) ?? ""}</Tag></HStack>
                        <WithAvatar 
                            datum={capCase(feedback?.customer_name) ?? ""} 
                            sub={allLower(feedback?.customer_email) ?? ""}
                            align="center"
                        />
                        <HStack align={'center'} mt={2}><p>Rating:</p> <Rating rating={Number(feedback?.rating ?? 0)}/></HStack>
                        <HStack justify={'space-between'}><p>Status</p> <StatusChanger datum={feedback?.status ?? ""}/></HStack>
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
                        <Text fontSize={'12px'}>{feedback?.comment ?? ""}</Text>
                    </Box>

                    {/* <Box my={4}>
                        <b>Attachments</b>
                        <SimpleGrid spacing={4} columns={[2,3,3,6]}>
                            <Button leftIcon={<FaPaperclip />} size="sm" colorScheme="blue" variant="ghost">screenshot_error.png</Button>
                            <Button leftIcon={<FaPaperclip />} size="sm" colorScheme="blue" variant="ghost">Package_damage.jpg</Button>
                        </SimpleGrid>
                    </Box> */}

                    {/* <Box p={2} pb={3} fontSize={'13px'} color={'#475467'} bgColor={'#EEC4011A'} boxShadow={'md'}>
                        <b>Admin Notes</b>
                        <Text fontSize={'12px'}>Customer reported packaging damage. Product quality rated highly. Consider reviewing packaging standards.</Text>
                    </Box> */}
                </Box>

                <ConfirmModal 
                    isOpen={isOpenConfirm}
                    onClose={closeConfirm}
                    onConfirm={hideProduct}
                />

                {/* <Box
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

                </Box> */}

                {/* <Box p={4} mt={8} borderRadius={'15px'} border={'1px solid #D0D5DD'}>
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
                </Box> */}

            </Box>
        </PageMainContainer>
    )
}
