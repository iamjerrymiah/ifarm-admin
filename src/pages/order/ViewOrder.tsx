import { Box } from "@chakra-ui/react";
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

const dataFields = [
    { name: 'Date & Time', key: 'date', date: true}, 
    { name: 'Status Update', key: 'status', },       
    { name: 'Updated By', key: 'updateBy'},
]

function ViewOrderMain({ id, order = {}, isLoading }:any) {

    const navigate = useNavigate()

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
            <PageHeading title="Order Detail">
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
                />
                <Button 
                    text='Print Invoice'
                    bgColor={'#101828'}
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
                tableData={[]}
                emptyText={'No data found'}
                loading={false}
                numbered
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

