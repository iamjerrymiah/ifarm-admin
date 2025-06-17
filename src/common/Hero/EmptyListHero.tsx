import { Flex, Center, Text, Image } from '@chakra-ui/react'
import nodata from '../../assets/image/noData.png'

interface EmptyListHeroProps {
    text: string;
    w?: string;
    h?: string;
}

function EmptyListHero({ text, w, h }: EmptyListHeroProps) {
    return (
        <Flex bg='transparent' direction='column' py='50px' w='full'>
            <Center mb={3}>
                <Image
                    src={nodata}
                    width={w ?? 250}
                    height={h ?? 220}
                    alt='empty list'
                />
            </Center>
            <Text fontSize='md' fontWeight={500} color='#56505B' textAlign='center'>{text}</Text>
        </Flex>
    )
}

export default EmptyListHero