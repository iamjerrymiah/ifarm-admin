import { Box, Text } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import PageHeading from "../../common/PageHeader/PageHeading";
import { TextColor } from "../../constants/colors";
import Button from "../../common/Button/Button";
import { useNavigate } from "react-router";
import CreateTicketForm from "./form/CreateTicketForm";

export default function CreateTicket() {

    const naviagte = useNavigate()

    return (
        <PageMainContainer title="Customer Support & Feedback" description="Customer Support & Feedback">
            <Box w='100%' pb={10}>
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
                        onClick={()=>naviagte(-1)}
                    />
                    <Button 
                        text='Cancel'
                        variant='outline'
                        color={'#0E2354'}
                    />
                    <Button 
                        text='Save as Draft'
                        bgColor={'#101828'}
                    />
                    <Button 
                        text='Submit Ticket'
                        // onClick={}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <CreateTicketForm />
                </Box>

            </Box>
        </PageMainContainer>
    )
}
