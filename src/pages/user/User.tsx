import { Box, Flex, HStack } from '@chakra-ui/react'
import PageHeading from '../../common/PageHeader/PageHeading'
import Button from '../../common/Button/Button'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Table } from '../../common/Table/Table'
import PageMainContainer from '../../common/PageMain/PageMain'
import { useNavigate } from 'react-router'
import { useGetUsers } from '../../service/user/userHook'
import Pagination from '../../common/Pagination/Pagination'
import FilterTab from '../../common/Tabs/FilterTab'
import FilterInput from '../../common/Form/FilterInput'

const dataFields = [
    { name: 'Name', key: 'name', img: 'image_url', withImg: true },    
    { name: 'User ID', key: 'id', idChange: true},
    { name: "Username", key: "username", case: true },    
    { name: 'Email', key: 'email', lower: true},
    { name: "Phone", key: 'phone' },
    { name: "Role", key: 'role', case: true },
    { name: 'Creation Date', key: 'created_at', date: true }, 
    { name: 'Status', key: 'status'},
]

function UserTable ({
    users = [],
    filter,
    setFilter,
    isLoading,
    currentPage,
    totalPages,
}:any) {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    const changePage = ({ selected = 0 }) => {
        setFilter({ ...filter, page: selected + 1 });
    }

    const onFilter = () => {
        setFilter({ ...filter, search_query: search });
    }

    const resetFilter = () => { setFilter({}) }

    const editUser = (datum:any) => { navigate(`/main/user-management/edit/${datum?.id}`) }

    return (
        <Box w='100%'>
            <Box overflowX="auto">
                <Flex direction={{ base: "row", md: "row" }} gap={4} mb={4}>
                    <Flex flex="1" gap={2}>
                        <FilterInput 
                            placeholder="Search users by name, username, email, phone or any related keywords" 
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
                tableFields={dataFields}
                tableData={users}
                emptyText={'No data found'}
                loading={isLoading}
                numbered
                options={[                  
                    {
                        name: 'Edit',
                        onUse: (datum: any) => { editUser(datum) },
                    },
                    // {
                    //     name: 'Delete',
                    //     color: 'red.500',
                    //     onUse: (datum: any) => { },
                    // },
                ]}
            />

            <Pagination
                onPageChange={changePage}
                currentPage={currentPage}
                pageCount={totalPages}
            />

        </Box>
    )
}

export default function User() {

    const navigate = useNavigate()
    const [filter, setFilter] = useState<any>({})

    const { data: initData = {}, isLoading } = useGetUsers(filter)
    const { data: users = [] } = initData
    // const users:any[] = userData?.data

    const addUser = () => { navigate(`/main/user-management/add`) }

    const headings = ["All User", "Customer", "Administrator"]

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

                <HStack
                    px={0}
                    pb={0}
                    mb={2}
                    overflowX="auto"
                    className="scroll-custom"
                    borderBottom="1px solid #EAECF0"
                >
                    {headings.map((head, index) => {
                        const isActive = (head === "All User" && !filter?.role) || filter?.role === head;
                        return (
                            <FilterTab 
                                key={index}
                                head={head}
                                isActive={isActive}
                                firstValue="All User"
                                setFilter={setFilter}
                                filterWith={{ role: head }}
                            />
                        );
                    })}

                </HStack>

                <UserTable 
                    users={users}
                    filter={filter} 
                    setFilter={setFilter}
                    isLoading={isLoading}
                    currentPage={initData?.current_page ?? 1}
                    totalPages={initData?.total ?? 6}
                />

            </Box>
        </PageMainContainer>
    )
}
