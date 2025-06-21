import { Box, Text } from "@chakra-ui/react";
import PageMainContainer from "../../common/PageMain/PageMain";
import { TextColor } from "../../constants/colors";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import UserForm from "./form/UserForm";
import Form from "../../common/Form/Form";
import { useNavigate, useParams } from "react-router";
import { useGetUser, useUpdateUser } from "../../service/user/userHook";
import Notify from "../../utils/notify";
import { useCustomFormState } from "../../hooks/useCustomFormState";
import { useEffect, useState } from "react";
import { isObjectPropsEmpty } from "../../utils/utils";

export default function EditUser() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string; }>();

    const { data: user = {}, isLoading } = useGetUser(id)
    const { mutateAsync } = useUpdateUser()
    const handleSubmit = async (data:any) => {
        try {
            const payload : any = await mutateAsync({
                ...data,
                image: file?.file,
                sms_notification: data?.sms_notification == true ? 1 : 0,
                email_notification: data?.email_notification == true ? 1 : 0
            });
            Notify.success("Success")
            navigate(`/main/user-management`)

            return payload;
        } catch(e:any) {
            return e
        }
    }

    const { data, onChange, formState, setFormData, clearFormData, formAction } = useCustomFormState(handleSubmit, user?.data)
    const errors = formState.errors

    const controller: any = (e: any) => {
        const { name, value, type } = e.target;
        onChange(name, value, type)
    }

    useEffect(() => { if(!isLoading) { setFormData({...user?.data}) } }, [isLoading])
    
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

    return (
        <PageMainContainer title="User Management" description="User Management">

            <Form w='100%' pb={10} onSubmit={formAction}>
                <Text pt={[0,0,0,2]} px={[0,0,0,4]} color={TextColor.heading} fontSize={'24px'} fontWeight={500} lineHeight={2}>{"Edit User"}</Text>
                <PageHeading 
                    isLoading={isLoading}
                    titleSize="18px" 
                    title="User Information" 
                    subHeading="Update user details here."
                >
                    <Button 
                        text='Back'
                        iconType="back"
                        bgColor={'gray'}
                        onClick={() => navigate(`/main/user-management`)}
                    />
                    <Button 
                        text='Cancel'
                        variant='outline'
                        color={'#0E2354'}
                        onClick={clearFormData}
                    />
                    <Button 
                        type="submit"
                        text='Save & Edit'
                        isLoading={formState.pending}
                        disabled={formState.pending || isObjectPropsEmpty(data)}
                    />
                </PageHeading>

                <Box px={[0,0,0,4]} mt={8}>
                    <UserForm 
                        edit
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
