import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
    return (
        <Box w='100%'> 
            <Outlet />
        </Box>
    )
}
