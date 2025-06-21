import { Box } from "@chakra-ui/react";
import FormSection from "../../../common/Form/FormSection";
import { Input } from "../../../common/Form/Input";
import { Select } from "../../../common/Form/Select";
import Switch from "../../../common/Form/Switch";
import { allLower } from "../../../utils/utils";
import ProfileImageUploader from "../../../common/Form/ProfileImageUploader";

export default function UserForm({
    edit,
    data = {},
    errors = {},
    setFile,
    onChange,
    controller,
}:{
    edit?:boolean; 
    data?:any; 
    errors?:any; 
    setFile:any;
    onChange?:any; 
    controller?:any;
}) {

    return (
        <Box w='100%'>
            <FormSection title="Basic Details">
                <Box>
                    <Input 
                        label="Full Name"
                        name="name"
                        value={data?.name}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Username"
                        name="username"
                        value={data?.username}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Email"
                        type="email"
                        name="email"
                        value={data?.email}
                        onChange={controller}
                        errors={errors}
                        disabled={edit}
                        required
                    />
                    {!edit &&
                    <>
                        <Input 
                            label="Pasword"
                            type="password"
                            name="password"
                            value={data?.password}
                            onChange={controller}
                            errors={errors}
                            required
                        />
                        <Input 
                            label="Confirm Password"
                            type="password"
                            name="password_confirmation"
                            value={data?.password_confirmation}
                            onChange={controller}
                            errors={errors}
                            required
                        />
                    </>
                    }
                </Box>
            </FormSection>

            <FormSection title="Account Information">
                <Select 
                    label="User Role"
                    name="role"
                    value={data?.role}
                    onChange={controller}
                    errors={errors}
                    options={["customer", "administrator"]}
                    required
                />
                <Select 
                    label="Account Status"
                    name="status"
                    value={data?.status}
                    onChange={controller}
                    errors={errors}
                    options={['active', 'inactive']}
                    required
                />
            </FormSection>

            <FormSection title="Profile Picture">
                <Box>
                    <ProfileImageUploader 
                        name="file"
                        setFile={setFile}
                        avatarName={data?.name ?? ""}
                        avatarSrc={data?.image_url}
                    />
                </Box>
            </FormSection>

            <FormSection title="Contact & Additional Information">
                <Box>
                    <Input 
                        label="Phone Number"
                        type="number"
                        name="phone"
                        value={data?.phone}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Address"
                        name="address"
                        value={data?.address}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Additional Notes"
                        name="additional_info"
                        value={data?.additional_info}
                        onChange={controller}
                        errors={errors}
                        placeholder="Any additional remarks"
                    />
                </Box>
            </FormSection>

            {allLower(data?.role) === "administrator" &&
                <FormSection title="Permissions & Settings">
                    <Box>
                        <Switch 
                            label="Manage Orders"
                            name="manage_order"
                            value={data?.manage_order}
                            onChange={controller}
                        />
                        <Switch 
                            label="Manage Users"
                            name="manage_users"
                            value={data?.manage_users}
                            onChange={controller}
                        />
                        <Switch 
                            label="Manage Products"
                            name="manage_product"
                            value={data?.manage_product}
                            onChange={controller}
                        />
                    </Box>
                </FormSection>
            }

            <FormSection title="Notification Preferences">
                <Box>
                    <Switch 
                        label="Email Notifications"
                        name="email_notification"
                        value={data?.email_notification}
                        onChange={controller}
                    />
                    <Switch 
                        label="SMS Notifications"
                        name="sms_notification"
                        value={data?.sms_notification}
                        onChange={controller}
                    />
                </Box>
            </FormSection>
        </Box>
    )
}
