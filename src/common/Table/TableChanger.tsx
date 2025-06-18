import { Avatar, Box, Flex } from "@chakra-ui/react";

export function idChange (datum:any) {
    return(<Box fontSize={'12px'} fontWeight={600} color={'#091E42'}>{datum}</Box>)
}

export function withImg (datum:any, img:any) {
    return (
        <Flex align="center" mt="auto">
            <Avatar src={img} name={datum} size="sm" />
                <Box ml={2}>
                    <Box fontWeight={500} color='#101828'>{datum}</Box>
                </Box>
        </Flex>
    )
}