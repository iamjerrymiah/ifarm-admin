import { Box, Skeleton } from '@chakra-ui/react'

function TableSk() {
    return (
        <Box bgColor={'white'} w='full' borderRadius='md' py={3}>
            <Skeleton borderRadius='md' h='50px' mb={2} />
            <Skeleton borderRadius='md' h='50px' mb={2}/>
            <Skeleton borderRadius='md' h='50px' mb={2}/>
        </Box>
    )
}

export default TableSk