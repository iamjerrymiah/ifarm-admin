import { Box, Flex, HStack } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import Tabs from "../../common/Tabs/Tabs";
import { useState } from "react";
import { Input } from "../../common/Form/Input";
import { BsSearch } from "react-icons/bs";
import { Table } from "../../common/Table/Table";
import PageMainContainer from "../../common/PageMain/PageMain";
import { useNavigate } from "react-router";

const supportFields = [
    { name: 'Name', key: 'name', img: 'img', withImg: true },    
    { name: 'Ticket ID', key: 'id', idChange: true},    
    { name: 'Subject', key: 'subject', case: true},
    { name: 'Date Submitted', key: 'date', date: true }, 
    { name: 'Priority', key: 'priority', case: true },
    { name: 'Status', key: 'status'},
    { name: 'Assigned To', key: 'assignedTo', case: true },
]

const feedbackFields = [
    { name: 'Name', key: 'name', img: 'img', withImg: true },    
    { name: 'Feedback ID', key: 'id', idChange: true},
    { name: 'Date Submitted', key: 'date', date: true },     
    { name: 'Type', key: 'type', case: true},
    { name: 'Rating', key: 'rating' },
    { name: 'Summary', key: 'summary' },
    { name: 'Status', key: 'status'},
]

function SupportTicketTable ({filter}:any){
    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <Input 
                            name="search"
                            value={filter?.search}
                            placeholder="Search subject or customer" 
                            leftElement={(<BsSearch />)}
                        />
                    </Flex>
                    <Flex gap={2}>
                        <Button 
                            text='Filter'
                            size={'md'}
                            iconType='filter'
                            variant='outline'
                            color={'#344054'}
                        />
                    </Flex>
                </Flex>
            </Box>


            <Table
                tableFields={supportFields}
                tableData={[]}
                emptyText={'No data found'}
                loading={false}
                numbered
                options={[
                    {
                        name: 'View',
                        onUse: (datum: any) => {  },
                    },                    
                    {
                        name: 'Edit',
                        onUse: (datum: any) => {  },
                    },
                    {
                        name: 'Delete',
                        color: 'red.500',
                        onUse: (datum: any) => { },
                    },
                ]}
            />

        </Box>
    )
}


function FeedbackTable ({filter}:any) {
    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <Input 
                            name="search"
                            value={filter?.search}
                            placeholder="Search subject or customer" 
                            leftElement={(<BsSearch />)}
                        />
                    </Flex>
                    <Flex gap={2}>
                        <Button 
                            text='Filter'
                            size={'md'}
                            iconType='filter'
                            variant='outline'
                            color={'#344054'}
                        />
                    </Flex>
                </Flex>
            </Box>


            <Table
                tableFields={feedbackFields}
                tableData={[]}
                emptyText={'No data found'}
                loading={false}
                numbered
                options={[
                    {
                        name: 'View',
                        onUse: (datum: any) => {  },
                    },                    
                    {
                        name: 'Edit',
                        onUse: (datum: any) => {  },
                    },
                    {
                        name: 'Delete',
                        color: 'red.500',
                        onUse: (datum: any) => { },
                    },
                ]}
            />

        </Box>    
    )
}


export default function Customer() {

    const navigate = useNavigate()
    const [filter, setFilter] = useState<any>({})
    const createTicket = () => { navigate(`/main/customer-support/ticket/create`) }

    return (
        <PageMainContainer title="Customer Support & Feedback" description="Customer Support & Feedback">
            <Box w='100%'>
                <PageHeading title='Customer Support & Feedback'>
                    <HStack>
                        <Button 
                            text='Export'
                            iconType='export'
                            variant='outline'
                            color={'#0E2354'}
                        />
                        <Button 
                            text='Create New Ticket'
                            onClick={createTicket}
                        />
                    </HStack>
                </PageHeading>

                <Tabs 
                    headings={["Support Ticket", "Customer Feedback"]}
                    panels={[
                        (<SupportTicketTable filter={filter}/>),
                        (<FeedbackTable filter={filter}/>),
                    ]}
                />
            </Box>
        </PageMainContainer>
    )
}
