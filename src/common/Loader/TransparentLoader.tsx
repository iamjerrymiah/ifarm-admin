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
            bg="transparent"
            backdropFilter="blur(4px)" // subtle blur
            backgroundColor="rgba(255, 255, 255, 0.2)" // slight overlay
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={9999}
        >
            <Spinner size="xl" color={ElementColor.primary} thickness="5px" />
        </Box>
    );
}
