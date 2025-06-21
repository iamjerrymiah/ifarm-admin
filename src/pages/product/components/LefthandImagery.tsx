import { Box, Flex, Image, Stack } from '@chakra-ui/react'

export default function LefthandImagery({
    mainImage,
    thumbnails = [],
    selectedIndex,
    setSelectedIndex
}:{mainImage:any; thumbnails:any[]; selectedIndex:number; setSelectedIndex:any}) {


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
                            objectFit="contain" 
                            cursor={'pointer'}
                            borderRadius={'12px'}
                            onClick={() => setSelectedIndex(index)}
                            border={selectedIndex === index ? "1px solid gray" : "none"}
                        />
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
