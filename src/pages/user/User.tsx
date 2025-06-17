import { Box, Flex, HStack } from '@chakra-ui/react'
import Tabs from '../../common/Tabs/Tabs'
import PageHeading from '../../common/PageHeader/PageHeading'
import Button from '../../common/Button/Button'
import { useState } from 'react'
import { Input } from '../../common/Form/Input'
import { BsSearch } from 'react-icons/bs'
import { Table } from '../../common/Table/Table'
import PageMainContainer from '../../common/PageMain/PageMain'
import { useNavigate } from 'react-router'

const dataFields = [
    { name: 'Name', key: 'name', img: 'img', withImg: true },    
    { name: 'User ID', key: 'id', idChange: true},    
    { name: 'User Type', key: 'type', case: true},
    { name: 'Registration Date', key: 'date', date: true }, 
    { name: 'Status', key: 'status'},
]

function UserTable ({filter}:any) {

    const navigate = useNavigate()
    const editUser = (datum:any) => { navigate(`/main/user-management/edit/${'jfjjozdkkfr53'}`) }

    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <Input 
                            name="search"
                            value={filter?.search}
                            placeholder="Search users by name, role, ID or any related keywords" 
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
                tableFields={dataFields}
                tableData={[]}
                emptyText={'No data found'}
                loading={false}
                numbered
                options={[                  
                    {
                        name: 'Edit',
                        onUse: (datum: any) => { editUser(datum) },
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

export default function User() {

    const navigate = useNavigate()
    const [filter, setFilter] = useState<any>({})
    const addUser = () => { navigate(`/main/user-management/add`) }

    return (
        <PageMainContainer title="User Management" description="User Management">
            <Box w='100%'>
                <PageHeading title='User Management'>
                    <HStack>
                        <Button 
                            text='Export'
                            iconType='export'
                            variant='outline'
                            color={'#0E2354'}
                        />
                        <Button 
                            text='Add User'
                            iconType='add'
                            onClick={addUser}
                        />
                    </HStack>
                </PageHeading>

                <Tabs 
                    headings={["All User", "Customer", "Administrator"]}
                    panels={[
                        <UserTable filter={filter} />,
                        <></>,
                        <></>,
                    ]}
                />
            </Box>
        </PageMainContainer>
    )
}
