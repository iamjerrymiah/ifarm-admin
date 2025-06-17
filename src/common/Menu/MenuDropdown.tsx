import React, { MouseEventHandler } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Portal, Text, HStack, Flex, Box, BoxProps } from '@chakra-ui/react'
import { FaEllipsisV } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { ElementColor } from '../../constants/colors';

export interface MenuOptionProps {
    name: string;
    onUse: Function;
    icon?: string | IconType;
    color?: string;
    size?: string;
}

interface MenuDropdownProps {
    options: MenuOptionProps[];
    rowData?: any,
    heading?: string,
    buttonIcon?: IconType,
    buttonColor?: string,
    animateBtn?: boolean;
    buttonIconSize?: number;
    withName?: string;
    nameColor?: string;
    nameProps?: BoxProps;
    withNameJustify?: string;
    component?: React.ReactNode;
    hasChildren?: boolean;
    compProps?: BoxProps;
    headerColor?: string;
    bgColor?: string;
    noAnmination?: boolean;
    onClick?: any;
    notificationCount?: number | any;
    lessThanTen?: boolean;
}

function MenuDropdown({
    hasChildren,
    component,
    compProps,
    bgColor,
    rowData,
    options = [],
    heading,
    buttonIcon: ButtonIcon = FaEllipsisV,
    buttonIconSize = 16,
    buttonColor,
    animateBtn,
    withName,
    withNameJustify,
    headerColor,
    nameColor,
    nameProps,
    noAnmination,
    lessThanTen,
    notificationCount,
    onClick,
    ...props
}: MenuDropdownProps){
    const hasFunction = options?.length > 0 ? typeof options[0] == 'object' : false

    const stopPropagation: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
        e?.stopPropagation();
        onClick && onClick();
    }

    const clickAction = (e: any, doAction: Function) => {
        stopPropagation(e);
        doAction(rowData);
    }

    return (
        <Menu autoSelect={false} placement='bottom' {...props}>
            {({ isOpen }) => (
                <React.Fragment>
                    <Flex w='full' justify='end' onClick={stopPropagation} bg='transparent'>
                        <MenuButton justifyContent='center' onClick={stopPropagation} _hover={{ animation: !noAnmination ? 'shake .8s ease-in-out' : ''}}>
                            <HStack justify={'center'} w='100%'>
                            {withName && <Box color={nameColor ?? ''} {...nameProps}>{withName}</Box>}
                                <Box position="relative">
                                    <Box _hover={{ animation: !noAnmination ? 'shake .8s ease-in-out' : '' }}>
                                        <ButtonIcon
                                            size={buttonIconSize}
                                            color={buttonColor || '#344054'}
                                            style={{ transform: (animateBtn && isOpen) ? 'rotateZ(180deg)' : 'rotateZ(0deg)', transition: '.1s ease-in' }}
                                        />
                                    </Box>
                                </Box>
                            </HStack>
                        </MenuButton>
                    </Flex>
                    {/* <Portal> */}
                        <MenuList bg={bgColor ?? 'white'}  boxShadow={`0px 0px 10px 5px ${'#EFEFEF'}`} zIndex={3} mt={3} mr={1}>
                            {heading && <Text textAlign='center' fontSize='16px' mx={5} my={2} fontWeight={700} color={headerColor ?? 'white'}>{heading}</Text>}
                            {hasChildren ? <Box className='scroll-custom' overflowY='scroll' py={4} px={4} {...compProps}>{component}</Box> :
                                options?.map((option, index) => (
                                    <MenuItem
                                        bg='transparent'
                                        key={index}
                                        py={'10px'}
                                        px={4}
                                        _hover={{bg: ElementColor.primary, color: 'white'}}
                                        color={'#344054'}
                                        onClick={(e) => { hasFunction ? clickAction(e, option.onUse) : stopPropagation(e) }}
                                        icon={option?.icon ? <option.icon color={option?.color} size={option?.size ?? 16} /> : undefined}
                                    >
                                        <HStack spacing={3} >
                                            <Text fontSize='13px' fontWeight='500' color={option?.color}>{option.name}</Text>
                                        </HStack>
                                    </MenuItem>
                                )) }
                        </MenuList>
                    {/* </Portal> */}
                </React.Fragment>
            )}
        </Menu>
    )
}

export default MenuDropdown
