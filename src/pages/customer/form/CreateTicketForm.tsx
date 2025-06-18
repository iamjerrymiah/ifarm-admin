import { Box } from "@chakra-ui/react";
import FormSection from "../../../common/Form/FormSection";
import { Input } from "../../../common/Form/Input";
import { TextArea } from "../../../common/Form/TextArea";
import { Select } from "../../../common/Form/Select";
import Switch from "../../../common/Form/Switch";

export default function CreateTicketForm({
    edit,
    data = {},
    errors = {},
    controller,
}:{edit?:boolean; data?:any; errors?:any; controller?:any;}) {

    return (
        <Box w='100%'>
            <FormSection title="Customer Information">
                <Box>
                    <Input 
                        label="Customer Name"
                        name=""
                        value={data?.name}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Customer Email"
                        type="email"
                        name=""
                        value={data?.email}
                        onChange={controller}
                        errors={errors}
                        required
                    />
                    <Input 
                        label="Phone Number (Optional)"
                        type="number"
                        name=""
                        value={data?.phone}
                        onChange={controller}
                        errors={errors}
                    />
                </Box>
            </FormSection>

            <FormSection title="Ticket Details">
                <Select 
                    label="Category"
                    name=""
                    value={data?.category}
                    onChange={controller}
                    errors={errors}
                    options={["Billing", "Technical Support", "Order Inquiry", "General"]}
                    required
                />
                <Select 
                    label="Priority Level"
                    name=""
                    value={data?.priorityLevel}
                    onChange={controller}
                    errors={errors}
                    options={["Low", "Medium", "High", "Urgent"]}
                    required
                />
                <Input 
                    label="Subject Line"
                    name=""
                    value={data?.subjectLine}
                    onChange={controller}
                    errors={errors}
                    required
                />
                <TextArea 
                    label="Description"
                    name=""
                    value={data?.description}
                    onChange={controller}
                    errors={errors}
                    required
                />
            </FormSection>
            
            <FormSection title="Attachment (Optional)">
                <></>
            </FormSection>
            
            <FormSection title="Assignment & Tracking">
                <Select 
                    label="Assigned Support Agent"
                    name=""
                    value={data?.assignedAgent}
                    onChange={controller}
                    errors={errors}
                    options={[]}
                    required
                />
                <Input 
                    label="Expected Resolution Date (Optional)"
                    type="date"
                    name=""
                    value={data?.date}
                    onChange={controller}
                    errors={errors}
                />
                <Select 
                    label="Ticket Status"
                    name=""
                    value={data?.ticketStatus}
                    onChange={controller}
                    errors={errors}
                    options={[]}
                    required
                />
                <Input 
                    label="Internal Notes (Admin Only)"
                    name=""
                    value={data?.notes}
                    onChange={controller}
                    errors={errors}
                />
            </FormSection>
            
            <FormSection title="Notifications & Follow-Up">
                <Select 
                    label="Customer Notification Preference"
                    name=""
                    value={data?.notificationPreference}
                    onChange={controller}
                    errors={errors}
                    options={[]}
                    required
                />
                <Switch 
                    label="Escalate urgent cases"
                    name=""
                    value={data?.urgentCase}
                    onChange={controller}
                />
                <Switch 
                    label="Send Auto Response Email"
                    name=""
                    value={data?.sendEmail}
                    onChange={controller}
                />
            </FormSection>

        </Box>
    )
}
