import { 
    Box, 
    Checkbox, 
    Flex, 
    Heading, 
    Image, 
    Stack, 
    Text, 
    useBreakpointValue 
} from '@chakra-ui/react'
import PageMainContainer from '../../common/PageMain/PageMain';
import { Container } from '../../styling/layout';

import logo from '../../assets/icon/logo.png'
import loginImg from '../../assets/image/login.png'
import { TextColor } from '../../constants/colors';
import { useNavigate } from 'react-router';
import { Input } from '../../common/Form/Input';
import { useState } from 'react';
import Button from '../../common/Button/Button';

function LoginMain () {

    const navigate = useNavigate()
    const showImage = useBreakpointValue({ base: false, md: false, lg: true });

    const [data, setData] = useState<any>({})
    const [errors, setErrors] = useState<any>({})

    return (
        <Flex h="100vh" direction={{ base: 'column', md: 'row' }}>

            <Flex
                flex="1"
                p={{ base: 6, md: 12 }}
                direction="column"
                justify="center"
                align="center"
                bg="white"
            >
                <Box position={'absolute'} left={5} top={5} >
                    <Image 
                        src={logo} 
                        alt="" 
                        mb={6} 
                    />
                </Box>

                <Flex maxW={["sm", 'md', "md", "sm"]} w="full" direction={'column'}>
                    <Heading 
                        mb={2} 
                        color={TextColor.heading} 
                        fontWeight={600} 
                        fontSize={'32px'}
                    >
                        Log in
                    </Heading>
                    <Text 
                        mb={10} 
                        fontSize={'16px'}
                        color={TextColor.text}
                    >
                        Welcome back! Please enter your details. 
                    </Text>

                    <Stack spacing={4}>
                        <Input 
                            upperLabel='Email'
                            name='email'
                            type='email'
                            value={data?.email}
                            errors={errors}
                            // onChange={}
                            required
                            placeholder="Enter your email" 
                        />
                        <Input 
                            upperLabel='Password'
                            name='password'
                            type='password'
                            value={data?.password}
                            errors={errors}
                            // onChange={}
                            required
                        />

                        {/* <CheckBox name='isRemember' label='Remember for 30 days'/> */}

                        <Checkbox colorScheme="green">
                            <Text fontSize={'12px'} color={TextColor.text}>Remember for 30 days</Text>
                        </Checkbox>

                        <Button 
                            mt={6}
                            text='Sign in'
                            size={'md'}
                            onClick={() => navigate('/main/dashboard')}
                        />
                    </Stack>
                </Flex>

                <Box position={'absolute'} bottom={5} left={5}>
                    <Text mt="auto" fontSize="14px" color="#475467" pt={6}> © inimitable 2025</Text>
                </Box>
            </Flex>


            {showImage && (
                <Box flex="1" position="relative" overflow="hidden">
                    <Image
                        src={loginImg}
                        alt=""
                        objectFit="cover"
                        w="100%"
                        h="100%"
                    />
                </Box>
            )}

        </Flex>
    )
}

export default function Login() {
    return (
        <PageMainContainer title='Login'>
            <Container>
                <LoginMain />
            </Container>
        </PageMainContainer>
    )
}
