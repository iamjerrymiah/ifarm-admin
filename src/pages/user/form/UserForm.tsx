import { Box } from "@chakra-ui/react";
import FormSection from "../../../common/Form/FormSection";
import { Input } from "../../../common/Form/Input";
import { Select } from "../../../common/Form/Select";
import Switch from "../../../common/Form/Switch";

export default function UserForm({
    edit,
    data = {},
    errors = {},
    controller,
}:{edit?:boolean; data?:any; errors?:any; controller?:any;}) {

    return (
        <Box w='100%'>
            <FormSection title="Basic Details">
                <Box>
                    <Input 
                        label="Full Name"
                        name=""
                        value={data?.name}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Username"
                        name=""
                        value={data?.username}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Email"
                        type="email"
                        name=""
                        value={data?.email}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Pasword"
                        type="password"
                        name=""
                        value={data?.password}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Confirm Password"
                        type="password"
                        name=""
                        value={data?.confirmPassword}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                </Box>
            </FormSection>

            <FormSection title="Account Information">
                <Select 
                    label="User Role"
                    name=""
                    value={data?.role}
                    onChange={controller}
                    errors={errors}
                    options={[]}
                    required
                />
                <Select 
                    label="Account Status"
                    name=""
                    value={data?.accountStatus}
                    onChange={controller}
                    errors={errors}
                    options={[]}
                    required
                />
            </FormSection>

            <FormSection title="Profile Picture">
                <Box></Box>
            </FormSection>

            <FormSection title="Contact & Additional Information">
                <Box>
                    <Input 
                        label="Phone Number"
                        type="number"
                        name=""
                        value={data?.phone}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Address"
                        name=""
                        value={data?.address}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Additional Notes"
                        name=""
                        value={data?.note}
                        onChange={controller}
                        errors={errors}
                        placeholder="Any additional remarks"
                    />
                </Box>
            </FormSection>

            <FormSection title="Permissions & Settings">
                <Box>
                    <Switch 
                        label="Manage Orders"
                        name=""
                        value={data?.manageOrder}
                        onChange={controller}
                    />
                    <Switch 
                        label="Manage Users"
                        name=""
                        value={data?.manageUsers}
                        onChange={controller}
                    />
                    <Switch 
                        label="Manage Products"
                        name=""
                        value={data?.manageProduct}
                        onChange={controller}
                    />
                </Box>
            </FormSection>

            <FormSection title="Notification Preferences">
                <Box>
                    <Switch 
                        label="Email Notifications"
                        name=""
                        value={data?.emailNotification}
                        onChange={controller}
                    />
                    <Switch 
                        label="SMS Notifications"
                        name=""
                        value={data?.smsNotification}
                        onChange={controller}
                    />
                </Box>
            </FormSection>
        </Box>
    )
}
