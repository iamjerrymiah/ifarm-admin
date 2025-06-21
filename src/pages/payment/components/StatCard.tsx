import { Box, HStack, Skeleton, Stat, StatHelpText, StatLabel, StatNumber, Tag } from '@chakra-ui/react';
import { formatDateDifference } from '../../../utils/utils';

export default function StatCard({ 
    label, 
    value, 
    growth,
    bgColor, 
    line,
    isLoading,
    borderColor,
    endDate,
    startDate,
}: { 
    label:string; 
    value:string; 
    line?:string; 
    growth?:string; 
    bgColor?:string; 
    borderColor?:string; 
    isLoading?: boolean;
    endDate?: any;
    startDate?: any;
}) {

    const duration = formatDateDifference(startDate, endDate);

    return (
        <Box 
            bg="white" 
            px={6}
            pt={6} 
            pb={2}
            borderRadius="15px" 
            boxShadow="sm"
            border={`1px solid ${borderColor ?? '#D0D5DD'}`}
            bgColor={bgColor ?? 'white'}
        >
                <Stat>
                    <StatLabel mb={2} color={'#475467'}>{label}</StatLabel>
                    {isLoading ? 
                        <Box w='full' borderRadius='md'>
                            <Skeleton borderRadius='md' h='10px' mb={2} />
                            <Skeleton borderRadius='md' h='10px' mb={2}/>
                            <Skeleton borderRadius='md' h='10px' mb={2}/>
                        </Box> :
                        <StatNumber color={'#101828'}>{value}</StatNumber>
                    }

                    <HStack 
                        justify={'space-between'} 
                        py={4} 
                        mt={5} 
                        borderTop={`0.5px solid ${line ?? '#D0D5DD'}`}
                    >

                        <Box fontSize={'13px'} overflowX={'scroll'} className='scroll-custom'>{duration}</Box>

                        {growth && (
                            <Tag px={2} color={'#D0D5DD'} borderRadius={'3xl'}>
                                <StatHelpText color="#03723D" fontWeight="semibold">{growth}</StatHelpText>
                            </Tag>
                        )}
                    </HStack>
                </Stat>
         </Box>
    )
}

{/* <Select size="sm" w="auto" color={'#475467'} border={'0px solid'}>
    <option>This month</option>
    <option>This Year</option>
    <option>This Week</option>
</Select> */}