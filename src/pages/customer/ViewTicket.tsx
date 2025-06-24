import { 
    Box, 
    Flex, 
    HStack, 
    IconButton, 
    Image, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalOverlay, 
    SimpleGrid, 
    Skeleton, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import { useNavigate, useParams } from "react-router";
import { Select } from "../../common/Form/Select";
import { TextArea } from "../../common/Form/TextArea";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../../common/Form/Input";
import FormSection from "../../common/Form/FormSection";
import { useQueryClient } from "@tanstack/react-query";
import { 
    useCreateTicketAttachment, 
    useCreateTicketCommunication, 
    useDeleteTicketAttachment, 
    useGetSupportTicket, 
    useGetTicketCommunications, 
    useUpdateSupportTicket 
} from "../../service/user/customerHook";
import Notify from "../../utils/notify";
import { useCustomFormState } from "../../hooks/useCustomFormState";
import Form from "../../common/Form/Form";
import { allCaps, allLower, capCase, formAltController, isObjectPropsEmpty, prettyDateFormat } from "../../utils/utils";
import StatusChanger from "../../common/Table/StatusChanger";
import EmptyListHero from "../../common/Hero/EmptyListHero";
import { useGetUsers } from "../../service/user/userHook";
import Switch from "../../common/Form/Switch";
import ImageUploader from "../../common/Form/ImageUploader";
import { FiEye } from "react-icons/fi";

export default function ViewTicket() {
    
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string; }>();

    const [images, setImages] = useState<any[]>([]);
    const onlyFiles = images?.filter((item): item is File => item instanceof File);

    const { data: ticket = {}, isLoading } = useGetSupportTicket(id)
    const { data: communicationData = {}, isLoading: commLoad } = useGetTicketCommunications(id)
    const { data: communications = [] } = communicationData;

    const { mutateAsync: deleteImageAction, isPending: deleteLoad } = useDeleteTicketAttachment()
    const handleRemove = async (index: number, imgId:any) => {
        try{
            const res:any = await deleteImageAction({id: imgId})

            const updated:any = [...images];
            updated.splice(index, 1);
            setImages(updated);

            queryClient.invalidateQueries({ queryKey: ['support-ticket'] });
            Notify.success("Deleted")
            return res
        } catch(e:any){ Notify.error(e?.message ?? "Failed"); return e }
    };

    const { mutateAsync: imageAction, isPending: imagePend } = useCreateTicketAttachment()
    const handleImageUpload = async() => {
        const payload = {'attachments[]': onlyFiles};
        try{
            const res:any = await imageAction([id, payload])
            Notify.success("Image(s) Uploaded")
            queryClient.invalidateQueries({ queryKey: ['support-ticket'] });
            return res
        } catch(e:any){ Notify.error(e?.message ?? "Failed"); return e }
    }

    const { mutateAsync } = useUpdateSupportTicket()
    const handleSubmit = async (data:any) => {
        try {
            const payload : any = await mutateAsync({...data, assigned_to: data?.assignedTo});
            Notify.success("Success")
            queryClient.invalidateQueries({ queryKey: ['support-ticket'] });
            navigate(`/main/customer-support`)

            return payload;
        } catch(e:any) { return e; }
    }

    const { data, onChange, formState, setFormData, clearFormData, formAction } = useCustomFormState(handleSubmit, ticket?.data)
    const errors = formState.errors

    const controller: any = (e: any) => {
        const { name, value, type } = e.target;
        onChange(name, value, type)
    }

    //customer reply handlers
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [reply, setReply] = useState<any>({})
    const [rErrors, setRErrors] = useState<any>({})
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const { mutateAsync: replyAction, isPending: replyLoad } = useCreateTicketCommunication()
    const handleCustomerReply = async (data:any) => {
        try{
            const res:any = await replyAction([id, {...data, attachment: file}])
            Notify.success("Success")
            setReply((prev:any) => ({...prev, message: ""}))
            setFile(null)
            queryClient.invalidateQueries({ queryKey: ['support-ticket'] });
            return res;
        } catch(e:any) { Notify.error(e?.message); return e; }
    }

    const rController: any = (e: any) => {
        const { name, value, type } = e.target;
        delete rErrors[name] ;
        setRErrors({...rErrors})
        formAltController(name, value, type, setReply, false)
    }

    const handlePreview = (src: string) => { setPreview(src); onOpen(); };

    //dependencies
    const { data: initData = {} } = useGetUsers({})
    const { data: userData = {} } = initData
    const users:any[] = userData?.data

    const userNames = useMemo(() => users?.map((e:any) => e?.name), [users])
    const userId = useMemo(() => users?.map((e:any) => e?.id), [users])

    useEffect(() => { 
    if(!isLoading) { 
        setFormData({ ...ticket?.data, assignedTo: ticket?.data?.assigned_to?.id }); 
        setImages(ticket?.data?.attachments) //image handling
    } }, [isLoading])

    const shouldEnableButton = () => {
        if (images?.length === 0) return true;
        return images?.some((item:any) => item instanceof File);
    };

    const isAllowed = shouldEnableButton()
    const tick = ticket?.data ?? {}

    return (
        <PageMainContainer title="Customer Support & Feedback" description="Customer Support & Feedback">
            <Form w='100%' pb={10} onSubmit={formAction}>

                <PageHeading 
                    isLoading={isLoading}
                    title='Customer Support & Feedback' 
                    subHeading={`Ticket Detail – #${tick?.ticket_reference ?? "N/A"}`}
                >
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
                            onClick={clearFormData}
                        />
                        <Button 
                            type="submit"
                            text='Save Changes'
                            isLoading={formState.pending}
                            disabled={formState.pending || isObjectPropsEmpty(data)}
                        />
                    </HStack>
                </PageHeading>

                <Box w='100%' fontSize={'13px'} color={'#475467'}>
                    <Flex gap={6} direction={['column','column','column','row']}>
                        <Stack spacing={2} flex={1} p={4} border={'1px solid #D0D5DD'} borderRadius={'15px'}>
                            <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={2}>Ticket Overview</Text>
                            <HStack justify={'space-between'}><p>Subject</p> <b>{tick?.subject ?? ""}</b></HStack>
                            <HStack justify={'space-between'}><p>Status</p> <StatusChanger datum={tick?.status}/></HStack>
                            <HStack justify={'space-between'}><p>Priority</p> <StatusChanger datum={tick?.priority} /></HStack>
                            <HStack justify={'space-between'}><p>Category</p> <b>{capCase(tick?.category ?? "")}</b></HStack>
                            <HStack justify={'space-between'}><p>Created</p> <b>{prettyDateFormat(tick?.created_at)}</b></HStack>
                            <HStack justify={'space-between'}><p>Assigned Agent</p> <b>{capCase(tick?.assigned_to?.name ?? "")}</b></HStack>
                        </Stack>

                        <Stack spacing={4} flex={1} p={4} border={'1px solid #D0D5DD'} borderRadius={'15px'}>
                            <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={2}>Customer Information</Text>
                            <HStack justify={'space-between'}><p>Name</p> <b>{capCase(tick?.customer_name) ?? ""}</b></HStack>
                            <HStack justify={'space-between'}><p>Email</p> <b>{allLower(tick?.customer_email) ?? ""}</b></HStack>
                            <HStack justify={'space-between'}><p>Phone</p> <b>{tick?.customer_phone ?? ""}</b></HStack>
                            <HStack justify={'space-between'}><p>Customer Notification Preference</p> <b>{allCaps(tick?.customer_notification_preference) ?? ""}</b></HStack>
                            <HStack justify={'space-between'}><p>Expected Resolution Date</p> <b>{prettyDateFormat(tick?.expected_resolution_date) ?? ""}</b></HStack>
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
                    <Text>{tick?.description ?? ""}</Text>
                </Box>

                <Box
                    p={4} 
                    mt={6}
                    h={communications?.length <=0 ? "100%" : '240px'}
                    color={'#475467'}
                    fontSize={'13px'}
                    borderRadius={'15px'} 
                    border={'1px solid #D0D5DD'} 
                >
                    <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={6}>Communication Timeline</Text>

                    <Box h={communications?.length <=0 ? "100%" : '160px'} overflowY={'scroll'} className="scroll-custom">
                        {commLoad ? <Skeleton borderRadius={'md'} h={'80px'} w='100%' /> :
                        <>
                            {communications?.length <=0 ? <EmptyListHero text="No timeline available"/> :
                                communications?.map((comm:any, i:any) => (
                                    <Box key={i} boxShadow={'md'} py={4} px={2} mb={2}>
                                        <HStack mb={1} w='100%' color={'#475467'} justify={'space-between'}>
                                            <b>{capCase(comm?.customer_name) ?? ""} ({capCase(comm?.user_type) ?? ""})</b>
                                            <HStack>
                                                {comm?.attachment_url && 
                                                    <IconButton
                                                        size="sm"
                                                        aria-label="Preview"
                                                        icon={<FiEye />}
                                                        onClick={() => {handlePreview(comm?.attachment_url)}}
                                                    />
                                                }
                                                <p>{prettyDateFormat(comm?.created_at) ?? ""}</p>
                                            </HStack>
                                        </HStack>
                                        <Text fontSize={'12px'}>{comm?.message ?? ""}</Text>
                                        
                                    </Box>
                            ))}
                        </>
                        }
                    </Box>
                </Box>

                <VStack mt={2} py={3} align={'flex-start'} borderBottom={'1px solid #E4E7EC'}>
                    <HStack w='100%' justify={'space-between'}>
                        <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={[2]}>Reply Customer</Text>
                        <Button 
                            text="Send Reply"
                            disabled={replyLoad}
                            isLoading={replyLoad}
                            onClick={() => handleCustomerReply(reply)}
                        />
                    </HStack>

                    <SimpleGrid w='100%' spacing={[2,6]} columns={[1,2]}>
                        <TextArea 
                            label="Message"
                            name="message"
                            value={reply?.message}
                            errors={rErrors}
                            onChange={rController}
                            placeholder="Type your reply to the customer..."
                            // required
                        />
                        <Box fontSize={'12px'}>
                            <Input 
                                mb={'-3'}
                                label="File (Optional)"
                                type="file"
                                name="file"
                                value={reply?.file}
                                errors={rErrors}
                                onChange={handleChange}
                                // required
                            />
                            <p>{file?.name}</p>
                        </Box>
                    </SimpleGrid>
                </VStack>

                <Box my={5}>
                    <FormSection title="Update Ticket">
                        <Box w='100%'>
                            <Select 
                                label="Category"
                                name="category"
                                value={data?.category}
                                onChange={controller}
                                errors={errors}
                                options={["Billing", "TechnicalSupport", "OrderInquiry", "General"]}
                                displayValues={["Billing", "Technical Support", "Order Inquiry", "General"]}
                                required
                            />
                            <Select 
                                label="Priority Level"
                                name="priority"
                                value={data?.priority}
                                onChange={controller}
                                errors={errors}
                                options={["Low", "Medium", "High", "Urgent"]}
                                required
                            />
                            <Select 
                                label="Status"
                                name="status"
                                value={data?.status}
                                errors={errors}
                                onChange={controller}
                                options={["open", "close"]}
                                required
                            />
                            <Input 
                                label="Expected Resolution Date"
                                type="date"
                                name="expected_resolution_date"
                                value={data?.expected_resolution_date}
                                onChange={controller}
                                errors={errors}
                                required
                            />
                            <Select 
                                label="Customer Notification Preference"
                                name="customer_notification_preference"
                                value={data?.customer_notification_preference}
                                onChange={controller}
                                errors={errors}
                                options={["email", "sms"]}
                                required
                            />
                            <Select 
                                label="Reassign Agent"
                                name="assignedTo"
                                value={data?.assignedTo}
                                errors={errors}
                                options={userId}
                                displayValues={userNames}
                                onChange={e => {
                                    const { name, value, type } = e.target;
                                    const user = users?.find((x:any) => x.id == value);
                                    if(user){onChange('assigned_to', user?.id);}
                                    onChange(name, value, type);
                                }}
                                required
                            />
                            <TextArea 
                                label="Internal Notes"
                                name="admin_note"
                                value={data?.admin_note}
                                errors={errors}
                                onChange={controller}
                                placeholder="Add internal notes visible only to agents"
                                // required
                            />
                            <Switch 
                                label="Escalate urgent cases"
                                name="escalate_urgent_cases"
                                value={data?.escalate_urgent_cases}
                                onChange={controller}
                            />
                            <Switch 
                                label="Send Auto Response Email"
                                name="send_auto_response_email"
                                value={data?.send_auto_response_email}
                                onChange={controller}
                            />
                        </Box>
                    </FormSection>

                    <FormSection 
                        title="Attachment (Optional)"
                        node={isAllowed ?  
                            (<Button 
                                text={"Save Images" }
                                disabled={imagePend || images?.length <= 0}
                                isLoading={imagePend}
                                onClick={handleImageUpload}
                            />) : <></>
                        }
                    >
                       <>
                        <ImageUploader
                            edit={true}
                            images={images}
                            isMultiple={true}
                            setImages={setImages}
                            onDelete={handleRemove}
                            deleteLoad={deleteLoad}
                            isImageExisted={ticket?.data?.attachments?.length > 0}
                        />
                       </>
                    </FormSection>
                </Box>

            </Form>

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody p={4}>
                        <Image src={preview || ''} width="100%" borderRadius="md" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </PageMainContainer>
    )
}



{/* <Box p={4} mt={8} borderRadius={'15px'} border={'1px solid #D0D5DD'}>
    <SimpleGrid columns={[1,2]} spacing='8'>
        <VStack align={'start'}>
            <Text fontSize={'16px'} fontWeight={500} color={'#101828'} mb={[3,6]}>Update Ticket</Text>
        </VStack>
    </SimpleGrid>
</Box> */}

{/* <SimpleGrid spacing={4} mt={4} columns={[2,4]}>
    <Button leftIcon={<FaPaperclip />} size="sm" colorScheme="blue" variant="ghost">screenshot_error.png</Button>
    <Button leftIcon={<FaPaperclip />} size="sm" colorScheme="blue" variant="ghost">Error_details.pdf</Button>
</SimpleGrid> */}