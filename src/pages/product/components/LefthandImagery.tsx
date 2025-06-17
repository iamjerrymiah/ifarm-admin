import { Box, Flex, Image, Stack } from '@chakra-ui/react'

export default function LefthandImagery({
    mainImage,
    thumbnails = []
}:{mainImage:any; thumbnails:any[]}) {
    return(
        <Flex gap={1} direction={['row']}>
            <Stack 
                direction={['column']} 
                overflowY={['scroll']} 
                className="scroll-custom"
                w={['60px','100px','100px','100px']}
                h={['300px', '400px']}
            >
                {thumbnails?.map((thumb, index) => (
                    <Box key={index} borderRadius="md" >
                        <Image 
                            src={thumb} 
                            alt="" 
                            w={['100px','80px']}
                            h={['50px','100px']} 
                            objectFit="contain" />
                    </Box>
                ))}
            </Stack>

            <Box w="100%" >
                <Image 
                    src={mainImage} 
                    alt="Product" 
                    objectFit="cover" 
                    w={'100%'} 
                    borderRadius="25px"
                    h={['300px','400px']} 
                />
            </Box>

        </Flex>
    )
}
