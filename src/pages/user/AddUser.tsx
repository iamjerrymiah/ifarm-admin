import { Box, Text } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import { TextColor } from "../../constants/colors";
import Button from "../../common/Button/Button";
import PageHeading from "../../common/PageHeader/PageHeading";
import UserForm from "./form/UserForm";

export default function AddUser() {
    return (
        <PageMainContainer title="User Management" description="User Management">
            <Box w='100%' pb={10}>
                <Text pt={[0,0,0,2]} px={[0,0,0,4]} color={TextColor.heading} fontSize={'24px'} fontWeight={500} lineHeight={2}>{"Add New User"}</Text>
                <PageHeading titleSize="18px" title="User Information" subHeading="Update user details here.">
                    <Button 
                        text='Cancel'
                        variant='outline'
                        color={'#0E2354'}
                    />
                    <Button 
                        text='Save & Create'
                        // onClick={}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <UserForm />
                </Box>
            </Box>
        </PageMainContainer>
    )
}
