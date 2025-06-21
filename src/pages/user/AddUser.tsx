import { Box, Text } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import { TextColor } from "../../constants/colors";
import Button from "../../common/Button/Button";
import PageHeading from "../../common/PageHeader/PageHeading";
import UserForm from "./form/UserForm";
import { useNavigate } from "react-router";
import { useCreateUser } from "../../service/user/userHook";
import Notify from "../../utils/notify";
import { useCustomFormState } from "../../hooks/useCustomFormState";
import Form from "../../common/Form/Form";
import { isObjectPropsEmpty } from "../../utils/utils";
import { useState } from "react";

export default function AddUser() {

    const navigate = useNavigate()

    const [ file, setFileData ] = useState({ 
        file: null 
    } as any)

    const setFile = (file: any) => {
        if (file && file.type.startsWith('image/')) {
            setFileData((prev:any) => ({...prev, file: file, documentName: file?.name }));
        } else {
            // Notify the user about the invalid file type
            Notify.error('Invalid image type. Allowed types: JPEG, PNG, GIF');
            setFileData((prev:any) => ({...prev, file: null }));
        }
    }
    
    const { mutateAsync } = useCreateUser()
    const handleSubmit = async (data:any) => {
        try {
            const payload : any = await mutateAsync({
                ...data,
                image: file?.file,
                enable_sms_notification: data?.enable_sms_notification == true ? 1 : 0,
                enable_email_notification: data?.enable_email_notification == true ? 1 : 0
            });
            Notify.success("Success")
            navigate(`/main/user-management`)

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
        <PageMainContainer title="User Management" description="User Management">

            <Form w='100%' pb={10} onSubmit={formAction}>
                <Text pt={[0,0,0,2]} px={[0,0,0,4]} color={TextColor.heading} fontSize={'24px'} fontWeight={500} lineHeight={2}>{"Add New User"}</Text>
                <PageHeading titleSize="18px" title="User Information" subHeading="Update user details here.">
                    <Button 
                        text='Back'
                        iconType="back"
                        bgColor={'gray'}
                        onClick={() => navigate(-1)}
                    />
                    <Button 
                        text='Cancel'
                        variant='outline'
                        color={'#0E2354'}
                        onClick={clearFormData}
                    />
                    <Button 
                        type="submit"
                        text='Save & Create'
                        isLoading={formState.pending}
                        disabled={formState.pending || isObjectPropsEmpty(data)}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <UserForm 
                        data={data}
                        errors={errors}
                        setFile={setFile}
                        onChange={onChange}
                        controller={controller}
                    />
                </Box>

            </Form>

        </PageMainContainer>
    )
}
