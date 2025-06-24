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
import { useDeleteSupportTicket, useGetSupportTickets } from "../../service/user/customerHook";
import FilterInput from "../../common/Form/FilterInput";
import Pagination from "../../common/Pagination/Pagination";
import ConfirmModal from "../../common/Modal/ConfirmModal";
import Notify from "../../utils/notify";
import { useConfirmAction } from "../../hooks/useActions";
import { useGetFeedbacks, useHideFeedback } from "../../service/user/feedbackHook";

const supportFields = [
    { name: 'Customer Name', key: 'customer_name', case: true},     
    { name: 'Ticket ID', key: 'ticket_reference', idChange: true},
    { name: 'Customer Email', key: 'customer_email'}, 
    { name: 'Customer Phone', key: 'customer_phone'},
    { name: 'Subject', key: 'subject', case: true},
    { name: 'Category', key: 'category', case: true },
    { name: 'Priority', key: 'priority', case: true },
    { name: 'Status', key: 'status'},
    { name: 'Date Submitted', key: 'created_at', date: true }, 
    { name: 'Assigned To', key: 'assigned_to', key1: "name", case: true },
]

const feedbackFields = [
    { name: 'Customer Name', key: 'customer_name', case: true},    
    { name: 'Feedback ID', key: 'feedback_identifier'},
    { name: 'Customer Email', key: 'customer_email'}, 
    { name: 'Customer Phone', key: 'customer_phone'},
    { name: 'Date Submitted', key: 'created_at', date: true },     
    { name: 'Type', key: 'feedback_type'},
    { name: 'Is Hidden?', key: 'is_hidden', boolean: true },
    { name: 'Status', key: 'status'},
]

function SupportTicketTable ({
    filter, 
    setFilter, 
    tickets = [], 
    isLoading, 
    currentPage, 
    totalPages
}:any){

    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    const resetFilter = () => { setFilter({}) }
    const changePage = ({ selected = 0 }) => { setFilter({ ...filter, page: selected + 1 }); }
    const onFilter = () => { setFilter({ ...filter, search_query: search }); }
    
    const { isOpenConfirm, openConfirm, closeConfirm, current } = useConfirmAction()
    const viewSupportTicket = (data:any) => { navigate(`/main/customer-support/ticket/view/${data?.id}`) }

    const shouldDelete = (data:any) => { openConfirm(data) }

    const { mutateAsync: deleteAction } = useDeleteSupportTicket()
    const deleteProduct = async () => {
        try {
            const res:any = await deleteAction({id: current?.id})
            Notify.success("Deleted")
            return res
        } catch(e:any) { Notify.error(e?.message ?? "Failed"); return e; }
    }
   
    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <FilterInput 
                            placeholder="Search subject or customer" 
                            onChange={(e:any) => setSearch(e.target.value)}
                            leftElement={(<BsSearch />)}
                        />
                    </Flex>
                    <Flex gap={2}>
                        <Button 
                            size={'md'}
                            iconType='reset'
                            bgColor={'gray.400'}
                            color={'white'}
                            onClick={resetFilter}
                        />
                        <Button 
                            text='Filter'
                            size={'md'}
                            iconType='filter'
                            variant='outline'
                            color={'#344054'}
                            onClick={onFilter}
                        />
                    </Flex>
                </Flex>
            </Box>


            <Table
                tableFields={supportFields}
                tableData={tickets}
                emptyText={'No data found'}
                loading={isLoading}
                numbered
                options={[
                    {
                        name: 'View',
                        onUse: (datum: any) => { viewSupportTicket(datum) },
                    }, 
                    {
                        name: 'Delete',
                        color: 'red.500',
                        onUse: (datum: any) => { shouldDelete(datum) },
                    },
                ]}
            />

            <Pagination
                onPageChange={changePage}
                currentPage={currentPage}
                pageCount={totalPages}
            />

            <ConfirmModal 
                isOpen={isOpenConfirm}
                onClose={closeConfirm}
                onConfirm={deleteProduct}
            />

        </Box>
    )
}


function FeedbackTable ({filter, setFilter, feedbacks = [], isLoading, currentPage, totalPages}:any) {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    const resetFilter = () => { setFilter({}) }
    const changePage = ({ selected = 0 }) => { setFilter({ ...filter, page: selected + 1 }); }
    const onFilter = () => { setFilter({ ...filter, search_query: search }); }
    
    const { isOpenConfirm, openConfirm, closeConfirm, current } = useConfirmAction()
    const viewFeedback = (data:any) => { navigate(`/main/customer-support/feedback/view/${data?.id}`) }

    const shouldHide = (data:any) => { openConfirm(data) }

    const { mutateAsync: hideAction } = useHideFeedback()
    const hideProduct = async () => {
        try {
            const res:any = await hideAction({id: current?.id})
            Notify.success("Success")
            return res
        } catch(e:any) { Notify.error(e?.message ?? "Failed"); return e; }
    }
   

    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <FilterInput 
                            placeholder="Search subject or customer" 
                            onChange={(e:any) => setSearch(e.target.value)}
                            leftElement={(<BsSearch />)}
                        />
                    </Flex>
                    <Flex gap={2}>
                        <Button 
                            size={'md'}
                            iconType='reset'
                            bgColor={'gray.400'}
                            color={'white'}
                            onClick={resetFilter}
                        />
                        <Button 
                            text='Filter'
                            size={'md'}
                            iconType='filter'
                            variant='outline'
                            color={'#344054'}
                            onClick={onFilter}
                        />
                    </Flex>
                </Flex>
            </Box>


            <Table
                tableFields={feedbackFields}
                tableData={feedbacks}
                emptyText={'No data found'}
                loading={isLoading}
                numbered
                options={[
                    {
                        name: 'View',
                        onUse: (datum: any) => { viewFeedback(datum) },
                    }, 
                    {
                        name: 'Hide',
                        color: '#EEC401',
                        onUse: (datum: any) => { shouldHide(datum) },
                    },
                ]}
            />

            <Pagination
                onPageChange={changePage}
                currentPage={currentPage}
                pageCount={totalPages}
            />

            <ConfirmModal 
                isOpen={isOpenConfirm}
                onClose={closeConfirm}
                onConfirm={hideProduct}
            />

        </Box>    
    )
}


export default function Customer() {

    const navigate = useNavigate()
    const [filter, setFilter] = useState<any>({})
    const [fedFilter, setFeedFilter] = useState<any>({})

    const { data: initData = {}, isLoading } = useGetSupportTickets(filter)
    const { data: ticketData = {} } = initData
    const tickets:any[] = ticketData?.data

    const { data: feedData = {}, isLoading: feedLoad } = useGetFeedbacks(fedFilter)
    const { data: feedbackData = {} } = feedData
    const feedbacks:any[] = ticketData?.data

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
                        (
                            <SupportTicketTable 
                                filter={filter}
                                setFilter={setFilter}
                                tickets={tickets ?? []}
                                isLoading={isLoading}
                                currentPage={ticketData?.current_page}
                                totalPages={ticketData?.total}
                            />
                        ),
                        (
                            <FeedbackTable 
                                filter={fedFilter}
                                setFilter={setFeedFilter}
                                feedbacks={feedbacks ?? []}
                                isLoading={feedLoad}
                                currentPage={feedbackData?.current_page}
                                totalPages={feedbackData?.total}
                            />
                        ),
                    ]}
                />
            </Box>
        </PageMainContainer>
    )
}
