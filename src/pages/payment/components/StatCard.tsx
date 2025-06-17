import { Box, HStack, Select, Stat, StatHelpText, StatLabel, StatNumber, Tag } from '@chakra-ui/react';

export default function StatCard({ 
    label, 
    value, 
    growth,
    bgColor, 
    line,
    borderColor
}: { label:string; value:string; line?:string; growth?:string; bgColor?:string; borderColor?:string }) {
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
                <StatNumber color={'#101828'}>{value}</StatNumber>

                <HStack 
                    justify={'space-between'} 
                    py={4} 
                    mt={5} 
                    borderTop={`0.5px solid ${line ?? '#D0D5DD'}`}
                >
                    <Select size="sm" w="auto" color={'#475467'} border={'0px solid'}>
                        <option>This month</option>
                        <option>This Year</option>
                        <option>This Week</option>
                    </Select>

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
