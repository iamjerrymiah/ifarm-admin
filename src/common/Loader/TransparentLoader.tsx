import { Box, Spinner } from "@chakra-ui/react";
import { ElementColor } from "../../constants/colors";


export default function TransparentLoader() {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            // bg="rgba(255, 255, 255, 0.5)"
            bgColor={'rgba(0,0,0,0.5)'}
            backdropFilter={{ blur: '6px' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={9999}
        >
            <Spinner size="xl" color={ElementColor.primary} thickness="5px" />
        </Box>
    )
}
