import { Box, Text } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import PageHeading from "../../common/PageHeader/PageHeading";
import { TextColor } from "../../constants/colors";
import Button from "../../common/Button/Button";
import { useNavigate } from "react-router";
import CreateTicketForm from "./form/CreateTicketForm";
import Form from "../../common/Form/Form";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateSupportTicket } from "../../service/user/customerHook";
import Notify from "../../utils/notify";
import { useCustomFormState } from "../../hooks/useCustomFormState";
import { isObjectPropsEmpty } from "../../utils/utils";

export default function CreateTicket() {

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    // const [attachments, setAttachments] = useState<File[] | string[]>([]);

    const { mutateAsync } = useCreateSupportTicket()
    const handleSubmit = async (data:any) => {
        try {
            const payload : any = await mutateAsync({...data});
            Notify.success("Success")
            queryClient.invalidateQueries({ queryKey: ['support-ticket'] });
            navigate(`/main/customer-support`)
            return payload;
        } catch(e:any) {
            return e
        }
    }

    const { data, onChange, formState, clearFormData, formAction } = useCustomFormState(handleSubmit, {})
    const errors = formState.errors

    const controller: any = (e: any) => {
        const { name, value, type } = e.target;
        onChange(name, value, type)
    }

    return (
        <PageMainContainer title="Customer Support & Feedback" description="Customer Support & Feedback">
            <Form w='100%' pb={10} onSubmit={formAction}>
                <Text 
                    pt={[0,0,0,2]} 
                    px={[0,0,0,4]} 
                    color={TextColor.heading} 
                    fontSize={'24px'} 
                    fontWeight={500} 
                    lineHeight={2}
                >
                    {"Create New Ticket"}
                </Text>
                <PageHeading titleSize="18px" title="Ticket Information" subHeading="Update ticket details here.">
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
                    {/* <Button 
                        text='Save as Draft'
                        bgColor={'#101828'}
                    /> */}
                    <Button 
                        type="submit"
                        text='Submit Ticket'
                        isLoading={formState.pending}
                        disabled={formState.pending || isObjectPropsEmpty(data)}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <CreateTicketForm 
                        data={data}
                        errors={errors}
                        onChange={onChange}
                        controller={controller}
                        // attachments={attachments}
                        // setAttachments={setAttachments}
                    />
                </Box>

            </Form>
        </PageMainContainer>
    )
}
