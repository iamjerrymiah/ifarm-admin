import { 
    Avatar, 
    Box, 
    Drawer, 
    DrawerCloseButton, 
    DrawerContent, 
    Flex, 
    HStack, 
    Icon, 
    Image, 
    Text, 
    Tooltip, 
    useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { FiPackage, FiHome, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdPayments, MdLogout } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { TbCheckbox, TbUsers } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { IconType } from "react-icons";

import logo from '../assets/icon/logo.png'
import { Input } from "../common/Form/Input";
import { BsSearch } from "react-icons/bs";
import { Container } from "../styling/layout";

interface sidebarLinksProps {
    label: string;
    link?: string;
    icon: IconType | React.ReactNode | any;
    children?: any[]
}

const sidebarLinks:sidebarLinksProps[] = [
    { icon: FiHome, label: 'Dashboard', link: '/main/dashboard' },
    { icon: FiPackage, label: 'Product Management', link: '/main/product-management' },
    { icon: TbCheckbox, label: 'Order Management', link: '/main/order-management' },
    { icon: MdPayments, label: 'Payments & Revenue', link: '/main/payments' },
    {
        icon: TbUsers,
        label: 'User Management',
        link: '/main/user-management',
        children: [
            {label: 'Customer Support & Feedback', link: '/main/customer-support',}, 
            {label: 'User Management', link: '/main/user-management',}
        ],
    },
];


const SidebarContent = ({ isCollapsed }: { isCollapsed: boolean }) => {

    const navigate = useNavigate()
    const [data, setData] = useState<any>({})
    const [dropdown, setDropdown] = useState(false)

    return (
    <VStack align="stretch" spacing={4} p={4} height="100%" justify="space-between">
        <Box>

            <Flex 
                align="center" 
                mb={isCollapsed ? 20 : 10}
                justify={isCollapsed ? 'center' : 'flex-start'}
            >
                <Image 
                    src={logo} 
                    alt="" 
                    objectFit={'contain'}
                    style={{ width: 80 }} 
                    cursor={'pointer'}
                    onClick={() => navigate('/main/dashboard')}
                />
            </Flex>

            {!isCollapsed && 
                <Input 
                    name="search"
                    value={data?.search}
                    placeholder="Search" 
                    mb={8}
                    leftElement={(<BsSearch />)}
                />
            }

            {sidebarLinks?.map((link:any, idx) => (
                <Box key={idx} my={1}>
                    <HStack justify={'space-between'} cursor="pointer">
                        <Flex
                            align="center"
                            p={2}
                            borderRadius="md"
                            _hover={{ color: "#03723D", fontWeight: 700, fontSize: '18px' }}
                            color={'#344054'}
                            onClick={!link?.children ? () => navigate(link?.link) : ()=> setDropdown(!dropdown) }
                        >
                            {isCollapsed ? <Tooltip label={link?.label}><Icon as={link.icon} fontSize="2xl" /></Tooltip> : <Icon as={link.icon} fontSize="2xl" />}
                            {!isCollapsed && (<Text fontSize={'14px'} ml={3}>{link.label}</Text>)}

                        </Flex>

                        {link?.children && !isCollapsed && (
                            <Box onClick={() => setDropdown(!dropdown)}>
                                {dropdown ? <FiChevronUp size={20}/> : <FiChevronDown size={20}/> }
                            </Box>
                        )}
                    </HStack>

                    {link?.children && !isCollapsed && dropdown && (
                        <VStack spacing={2} align="start" pl={8} pt={1}>
                        {link?.children?.map((child:any, i:any) => (
                            <Box 
                                w='100%' 
                                py={1} 
                                px={4} 
                                cursor={'pointer'}
                                borderRadius={'6px'}
                                _hover={{ bgColor: '#F9FAFB' }}
                                onClick={() => navigate(child?.link)}
                            >
                                <Text fontSize="11px" fontWeight={500} color={'#344054'} key={i}>
                                    {child?.label}
                                </Text>
                            </Box>
                        ))}
                        </VStack>
                    )}

                </Box>
            ))}

        </Box>

        <HStack justify={'space-between'}>
            <Flex align="center" mt="auto">
                <Avatar name="Olivia Rhye" size="md" />
                {!isCollapsed && (
                    <Box ml={2}>
                        <Text fontWeight={600} color='#101828'>Olivia Rhye</Text>
                        <Text fontSize="xs" color={'#475467'}>olivia@gmail.com</Text>
                    </Box>
                )}
            </Flex>
            {!isCollapsed && <Box><MdLogout size={30}/></Box>}
        </HStack>

    </VStack>
)};


function AuthLayoutMain () {

    const navigate = useNavigate()
    const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Flex minH="100vh">
                {isDesktop ? (
                    <Box
                        position="fixed"
                        top="0"
                        left="0"
                        h="100vh"
                        w={collapsed ? '80px' : ['0px', '0px', '0px', '300px']}
                        bg="white"
                        borderRight="1px solid #E4E7EC"
                        borderColor="gray.200"
                        transition="width 0.3s"
                        zIndex="1000"
                    >
                    <Box
                        as="button"
                        aria-label="Toggle collapse"
                        onClick={() => setCollapsed(!collapsed)}
                        position="absolute"
                        top={10}
                        right={collapsed ? '-14px' : '-16px'}
                        zIndex={10}
                        p={1}
                        borderRadius="full"
                        _hover={{ bg: 'gray.100' }}
                    >
                    {collapsed ? (
                        <FaChevronCircleRight size={20} color="#344054" />
                    ) : (
                        <FaChevronCircleLeft size={20} color="#344054" />
                    )}
                    
                    </Box>
                        <SidebarContent isCollapsed={collapsed} />
                    </Box>
                ) : (
                    <>
                        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                            <DrawerContent maxW={['300px','400px']} overflowY={'scroll'} className="scroll-custom">
                                <DrawerCloseButton fontSize='lg'/>
                                <SidebarContent isCollapsed={false} />
                            </DrawerContent>
                        </Drawer>
                    </>
                )}

                <Box 
                    flex="1" 
                    px={{ base: 4, md: 5, lg: 8 }} 
                    py={{ base: 4, md: 5, lg: 4 }}
                    ml={collapsed ? ['0px', '0px', '0px', '80px'] : ['0px', '0px', '0px', '300px']}
                    w="100%"
                    minH="100vh"
                    overflowX="hidden"
                >
                    {!isDesktop &&
                        <HStack justify={'space-between'} mb={8}>
                            <Image 
                                src={logo} 
                                alt="" 
                                objectFit={'contain'}
                                style={{ width: 80 }} 
                                cursor={'pointer'}
                                onClick={() => navigate('/main/dashboard')}
                            />
                            <Box cursor={'pointer'}>
                                {isOpen ? <ImCross onClick={onClose} /> : <IoMdMenu size={30} onClick={onOpen}/> }
                            </Box>
                        </HStack>
                    }

                    {/* Very important! main page component */}
                    <Container>
                        <Outlet /> 
                    </Container>
                    
                </Box>

            </Flex>
        </>
    )
}

//set all global authenication configuration here
export default function AuthLayout() {

    // useEffect(() => { if (!isAuthenticated) {navigate("/auth/login");} }, [isAuthenticated]);

    return (
        <Box w='100%'>
            {/* {isAuthenticated ? <AuthLayoutMain /> : <Navigate to="/auth/login" replace />} */}
            <AuthLayoutMain />
        </Box>
    )
}
