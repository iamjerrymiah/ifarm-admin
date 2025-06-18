import { Box } from "@chakra-ui/react";
import PageHeading from "../../common/PageHeader/PageHeading";
import Button from "../../common/Button/Button";
import MenuDropdown from "../../common/Menu/MenuDropdown";
import { GoChevronDown } from "react-icons/go";
import { Table } from "../../common/Table/Table";
import { useParams } from "react-router";
import OrderGrid from "./components/OrderGrid";

const dataFields = [
    { name: 'Date & Time', key: 'date', date: true}, 
    { name: 'Status Update', key: 'status', },       
    { name: 'Updated By', key: 'updateBy'},
]

export default function ViewOrder() {
    
    const { id } = useParams<{ id: string; }>();

    return (
        <Box w='100%'>
            <PageHeading title="Order Detail">
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
                    rightIcon={
                        <MenuDropdown 
                            withName="Actions"
                            buttonIcon={GoChevronDown}
                            buttonColor="white"
                            options={[
                                {name: "Preparing", onUse:()=>{}},
                                {name: "Dispatched", onUse:()=>{}},
                                {name: "Delivered", onUse:()=>{}},
                                {name: "Cancelled", onUse:()=>{}},
                            ]}
                        />
                    }
                />
            </PageHeading>

            <OrderGrid />

            <Table
                title="Order Timeline & Logs"
                tableFields={dataFields}
                tableData={[]}
                emptyText={'No data found'}
                loading={false}
                numbered
            />
        </Box>
    )
}

