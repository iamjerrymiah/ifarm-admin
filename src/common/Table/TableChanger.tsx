import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function idChange (datum:any) {
    return(<Text fontSize={'12px'} fontWeight={600} color={'#091E42'}>{datum}</Text>)
}

export function withImg (datum:any, img:any) {
    return (
        <Flex align="center" mt="auto">
            <Avatar src={img} name={datum} size="sm" />
                <Box ml={2}>
                    <Text fontWeight={500} color='#101828'>{datum}</Text>
                </Box>
        </Flex>
    )
}