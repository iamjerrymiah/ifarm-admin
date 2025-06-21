import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import MenuDropdown from "../../common/Menu/MenuDropdown";
import { GoChevronDown } from "react-icons/go";
import { Table } from "../../common/Table/Table";
import { useNavigate, useParams } from "react-router";
import OrderGrid from "./components/OrderGrid";
import PageMainContainer from "../../common/PageMain/PageMain";
import { useGetOrder, useUpdateOrderStatus } from "../../service/order/orderHook";
import { useConfirmAction } from "../../hooks/useActions";
import ConfirmModal from "../../common/Modal/ConfirmModal";
import Notify from "../../utils/notify";
import ModalCenter from "../../common/Modal/ModalCenter";
import FilterInput from "../../common/Form/FilterInput";
import { WithAvatar } from "../product/components/CustomerFeedback";
import { BsSearch } from "react-icons/bs";

const dataFields = [
    { name: 'Date & Time', key: 'date', date: true}, 
    { name: 'Status Update', key: 'status', },       
    { name: 'Updated By', key: 'updateBy'},
]

function ViewOrderMain({ id, order = {}, isLoading }:any) {

    const navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpenConfirm:isDispatch, openConfirm:openDispatch, closeConfirm:closeDispatch } = useConfirmAction()
    const { isOpenConfirm:isPreparing, openConfirm:openPreparing, closeConfirm:closePreparing } = useConfirmAction()
    const { isOpenConfirm:isDelivered, openConfirm:openDelivered, closeConfirm:closeDelivered } = useConfirmAction()
    const { isOpenConfirm:isCancelled, openConfirm:openCancelled, closeConfirm:closeCancelled } = useConfirmAction()

    const shouldCancel = () => { openCancelled({}) }
    const shouldDeliver = () => { openDelivered({}) }
    const shouldPrepare = () => { openPreparing({}) }
    const shouldDisptach = () => { openDispatch({}) }

    const { mutateAsync: updateStatusAction, isPending } = useUpdateOrderStatus()
    const handleStatus = async (status:string) => {
        try {
            const res: any = await updateStatusAction({ id: id, status: status })
            Notify.success("Success")
            return res
        } catch(e:any) {
            Notify.error(e?.message ?? "Failed")
            return e
        }
    }

    return (
        <Box w='100%'>
            <PageHeading title="Order Detail" isLoading={isLoading}>
                <Button 
                    text='Back'
                    iconType="back"
                    bgColor={'gray'}
                    onClick={() => navigate(-1)}
                />
                <Button 
                    text='Assign Dispatch Agent '
                    variant='outline'
                    color={'#0E2354'}
                    onClick={onOpen}
                />
                <Button 
                    isLoading={isPending}
                    disabled={isPending}
                    rightIcon={
                        <MenuDropdown 
                            withName="Actions"
                            buttonIcon={GoChevronDown}
                            buttonColor="white"
                            options={[
                                {name: "Preparing", onUse: shouldPrepare},
                                {name: "Dispatched", onUse: shouldDisptach},
                                {name: "Delivered", onUse: shouldDeliver},
                                {name: "Cancelled", onUse: shouldCancel},
                            ]}
                        />
                    }
                />
            </PageHeading>

            <OrderGrid data={order} />

            <Table
                title="Order Timeline & Logs"
                tableFields={dataFields}
                tableData={order?.timeline_logs ?? []}
                emptyText={'No data found'}
                loading={isLoading}
            />

            <ConfirmModal
                isOpen={isDispatch}
                onConfirm={() => handleStatus("Dispatch")}
                onClose={closeDispatch}
            />

            <ConfirmModal
                isOpen={isPreparing}
                onConfirm={() => handleStatus("Preparing")}
                onClose={closePreparing}
            />

            <ConfirmModal
                isOpen={isDelivered}
                onConfirm={() => handleStatus("Delivered")}
                onClose={closeDelivered}
            />

            <ConfirmModal
                isOpen={isCancelled}
                onConfirm={() => handleStatus("Cancelled")}
                onClose={closeCancelled}
            />

            <ModalCenter 
                isOpen={isOpen}
                onClose={onClose}
                body={
                    <Box>
                        <PageHeading 
                            titleSize="18px" 
                            title="Assign a Dispatch Agent" 
                            subHeading="Select one dispatch agent to assign to this role"
                        />
                        <FilterInput placeholder="Search for a dispatch agent" leftElement={<BsSearch />}/>
                        
                        <Stack mt={8} mb={4} spacing={4}>
                            <WithAvatar datum={'Dispatch Agent 3'} sub="Dispatch Agent" />
                            <WithAvatar datum={'Dispatch Agent 2'} sub="Dispatch Agent" />
                            <WithAvatar datum={'Dispatch Agent 1'} sub="Dispatch Agent" />
                        </Stack>
                    </Box>
                }
                footer={
                    <Button 
                        text="Assign"
                        size={'md'}
                        w='100%'
                    />
                }
            />

        </Box>
    )
}

export default function ViewOrder () {

    const { id } = useParams<{ id: string; }>();
    const { data: orderData = {}, isLoading } = useGetOrder(id)

    return (
        <PageMainContainer title="Order Management" description="Order Management">
            <ViewOrderMain 
                id={id}
                isLoading={isLoading}
                order={orderData?.data ?? {}}
            />
        </PageMainContainer>
    )
}

