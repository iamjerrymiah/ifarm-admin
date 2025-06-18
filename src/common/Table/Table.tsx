import React, { MouseEventHandler, ReactNode } from 'react'
import { 
    TableContainer, 
    Table as ChakraTable, 
    TableProps as ChakraTableProps, 
    Tbody, 
    Td, 
    Th, 
    Thead, 
    Tr, 
    HStack, 
    Tag, 
    BoxProps, 
    Text,
    Flex,
    Box,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { useTableRowFormat } from '../../hooks/useTable';
import TableSk from '../Skeleton/TableSk';
import { statuses } from '../../constants/constants';
import { allLower, capCase } from '../../utils/utils';
import EmptyListHero from '../Hero/EmptyListHero';
import MenuDropdown from '../Menu/MenuDropdown';

import { GoDotFill } from "react-icons/go";
import { TextColor } from '../../constants/colors';



interface TableProps extends ChakraTableProps {
    tableFields: { name: string; key?: string; key1?: string; key2?: string; }[];
    tableData: any[];
    loading?: boolean;
    emptyText: string;
    options?: { name: string | ReactNode; onUse: Function; icon?: IconType | string; color?: string; }[] | any[];
    otherOptions?: { name: string | ReactNode; onUse: Function; icon?: IconType | string; color?: string; }[];
    numbered?: boolean;
    onClickHeading?: Function;
    onClickRow?: MouseEventHandler<HTMLTableRowElement>;
    headerBg?: string;
    headerColor?: string;
    children?: React.ReactNode;
    currentPage?: number;
    perPage?: number;
    title?: string;
    containerProps?: BoxProps;
    noKey?: any;
    payroll?: boolean;
    agent?: boolean;
}

export function Table({
    tableFields = [],
    tableData = [],
    loading,
    emptyText,
    options = [],
    otherOptions = [],
    numbered,
    onClickHeading,
    onClickRow,
    headerBg,
    headerColor,
    children,
    currentPage = 1,
    perPage = 20,
    title,
    payroll,
    agent,
    containerProps,
    noKey,
    ...props
}: TableProps) {
    const { format } = useTableRowFormat()

    return (loading ? (
        <TableSk/>
    ) : (
        <TableContainer w='full' padding={2} bgColor={'white'} overflowX='scroll' overflowY='auto' className='scroll-custom' {...props} {...containerProps}>
            {title && <Text fontSize={'16px'} color={'#101828'} fontWeight={500} mb={2}>{title}</Text>}
                
            <ChakraTable variant='simple' >
                <Thead bgColor={headerBg ?? '#EFEFEF'} color={'#42526D'}>
                    <Tr>
                        {numbered && 
                            <Th>
                                <Text color={'#42526D'} fontWeight={500}>S/N</Text>
                                {/* <input type="checkbox" /> */}
                            </Th>
                        }
                        {tableFields.map((heading, index) => heading.name === '' ? <Th key={index}></Th> :
                            <Th
                                key={index}
                                textTransform='none'
                                paddingLeft={index === 0 ? 3 : ''}
                                color={'#42526D'}
                            >
                                <HStack align='center' minW='max-content'>
                                    <Text color={headerColor ?? "#42526D"} fontSize={'12px'} fontWeight={600}>
                                        {heading.name ?? heading}
                                    </Text>
                                </HStack>
                            </Th>
                        )}
                        {options?.length > 0 && <Th> </Th>}
                    </Tr>
                </Thead>
                
                {tableData.length > 0 &&
                    <Tbody >
                        {tableData.map((rowData, index) =>
                            <TableRow
                                key={index}
                                index={index}
                                rowData={rowData}
                                formatted={format(tableFields, rowData)}
                                options={options}
                                onClick={onClickRow}
                                numbered={numbered}
                                currentPage={currentPage}
                                perPage={perPage}
                            />
                        )}
                    </Tbody>
                }
            </ChakraTable>

            {tableData.length === 0 && <EmptyListHero text={emptyText} /> }
        </TableContainer>
    ))
}


interface TableRowProps {
    index: number;
    rowData: any;
    formatted: any[];
    onClick?: MouseEventHandler<HTMLTableRowElement>;
    options: { name: string; onUse: Function; icon: IconType | string }[] | any[];
    numbered?: boolean;
    currentPage?: number;
    perPage?: number;
}

export function TableRow({
    index,
    rowData,
    formatted = [],
    onClick,
    options = [],
    numbered = false,
    currentPage = 1,
    perPage = 20,
} : TableRowProps) {

    const stopPropagation: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    return (
        <Tr
            onClick={e => { onClick ? onClick(rowData) : stopPropagation(e); }}
            // bgColor={index % 2 === 0 ? ElementColor.lighterShadow : ''}
            cursor={onClick ? 'pointer' : ''}
            _hover={{ bgColor: onClick ? '#667085' : undefined }}
        >
            {numbered &&
                <Td py={2}>
                    <Text color={TextColor.label}>{index + 1 + (currentPage * perPage) - perPage}</Text>
                    {/* <input type="checkbox" /> */}
                </Td>
            }
            {formatted.map((datum, ind) => (
                <Td key={ind} paddingLeft={ind === 0 ? 3 : ''} py={2}>
                    {statuses.positive.includes(allLower(datum)) ? (
                        <Tag colorScheme='whatsapp' size='sm' color={'#027A48'}>
                            <Flex gap={1}> <GoDotFill /><Text>{capCase(datum)}</Text> </Flex>
                        </Tag>
                    ) : statuses.pending.includes(allLower(datum)) ? (
                        <Tag colorScheme='blackAlpha' size='sm'>
                            <Flex gap={1}> <GoDotFill /> <Text>{capCase(datum)}</Text> </Flex>
                        </Tag>
                    ) : statuses.negative.includes(allLower(datum)) ? (
                        <Tag colorScheme='red' size='sm' color={'#F15046'}>
                            <Flex gap={1}> <GoDotFill /><Text>{capCase(datum)}</Text> </Flex>
                        </Tag>
                    ) : statuses.other.includes(allLower(datum)) ? (
                        <Tag colorScheme='purple' size='sm'>
                            <Flex gap={1}> <GoDotFill /><Text>{capCase(datum)}</Text> </Flex>
                        </Tag>
                    ) : (
                        <HStack w='max-content'>
                            <Box fontSize={'13px'} fontWeight={500} color={'#42526D'}>{datum}</Box>
                        </HStack>
                    )}
                </Td>
            ))}


            {options.length > 0 ?
                <Td py={2}> <MenuDropdown options={options} rowData={rowData} /> </Td> : null
            }
        </Tr>

    )
}
