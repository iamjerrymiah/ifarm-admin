import { Box } from "@chakra-ui/react";
import FormSection from "../../../common/Form/FormSection";
import { Input } from "../../../common/Form/Input";
import { TextArea } from "../../../common/Form/TextArea";
import { Select } from "../../../common/Form/Select";
import Switch from "../../../common/Form/Switch";
import { useGetUsers } from "../../../service/user/userHook";
import { useMemo } from "react";

export default function CreateTicketForm({
    edit,
    data = {},
    errors = {},
    onChange,
    controller,
    attachments,
    setAttachments
}:{
    edit?:boolean; 
    data?:any; 
    errors?:any; 
    onChange?:any;
    controller?:any;
    attachments?: File[] | string[] | any;
    setAttachments?: any;
}) {

    const { data: initData = {} } = useGetUsers({})
    const { data: userData = {} } = initData
    const users:any[] = userData?.data

    const userNames = useMemo(() => users?.map((e:any) => e?.name), [users])
    const userId = useMemo(() => users?.map((e:any) => e?.id), [users])

    return (
        <Box w='100%'>
            <FormSection title="Customer Information">
                <Box>
                    <Input 
                        label="Customer Name"
                        name="customer_name"
                        value={data?.customer_name}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Customer Email"
                        type="email"
                        name="customer_email"
                        value={data?.customer_email}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Phone Number"
                        // type="number"
                        name="customer_phone"
                        value={data?.customer_phone}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                </Box>
            </FormSection>

            <FormSection title="Ticket Details">
                <Select 
                    label="Category"
                    name="category"
                    value={data?.category}
                    onChange={controller}
                    errors={errors}
                    options={["billing", "TechnicalSupport", "orderInquiry", "general"]}
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
                <Input 
                    label="Subject Line"
                    name="subject"
                    value={data?.subject}
                    onChange={controller}
                    errors={errors}
                    required
                />
                <TextArea 
                    label="Description"
                    name="description"
                    value={data?.description}
                    onChange={controller}
                    errors={errors}
                    required
                />
            </FormSection>
            
            <FormSection title="Assignment & Tracking">
                <Select 
                    label="Assigned Support Agent"
                    name="assigned_to"
                    value={data?.assigned_to}
                    errors={errors}
                    options={userId}
                    displayValues={userNames}
                    onChange={e => {
                        const { name, value, type } = e.target;
                        const user = users?.find((x:any) => x.id == value);
                        if(user)
                        {
                            onChange('assigned_to', user?.id);
                        }
                        onChange(name, value, type);
                    }}
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
                    label="Ticket Status"
                    name="status"
                    value={data?.status}
                    onChange={controller}
                    errors={errors}
                    options={["open", "close"]}
                    required
                />
                <Input 
                    label="Internal Notes (Admin Only)"
                    name="admin_note"
                    value={data?.admin_note}
                    onChange={controller}
                    errors={errors}
                />
            </FormSection>
            
            <FormSection title="Notifications & Follow-Up">
                <Select 
                    label="Customer Notification Preference"
                    name="customer_notification_preference"
                    value={data?.customer_notification_preference}
                    onChange={controller}
                    errors={errors}
                    options={["email", "sms"]}
                    required
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
            </FormSection>

        </Box>
    )
}
