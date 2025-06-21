import { Box } from "@chakra-ui/react"
import { ElementColor } from "../../constants/colors"

export default function FilterTab({
    head,
    minW,
    isActive,
    firstValue,
    filterWith = {},
    setFilter,
}: { head: string; minW?: any; firstValue: string; isActive: boolean; filterWith:any, setFilter: any }) {
    return (
        <Box
            fontSize="13px"
            textAlign={'center'}
            fontWeight={isActive ? 600 : 500}
            color={isActive ? ElementColor.primary : "#667085"}
            borderBottom={isActive ? `3px solid ${ElementColor.primary}` : "none"}
            cursor="pointer"
            minW={minW ?? ["50%", "100px"]}
            pb={2}
            onClick={() => { if (head === firstValue) { setFilter({}) } else { setFilter(filterWith ?? { status: head }) } }}
        >
            {head}
        </Box>
    )
}
