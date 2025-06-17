import { Box, Flex, HStack, IconButton, Text, VStack, Icon as ChakraIcon } from "@chakra-ui/react"
import { ReactNode } from "react"
import { IconType } from "react-icons"
import { CardSection } from "../../../common/Card/CardSection"
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function DataInformation({
    title,
    value,
    dataValue,
    vsColor = "#027A48"
}:{value: any, title: string, dataValue?: any[], vs?: string, vsColor?:string}){

  // Dummy chart data for illustration
    const data = {
        labels: ['', '', '', ''],
        datasets: [
            {
                data: dataValue ?? [1, 30, 5, 45],
                borderColor: vsColor ?? "#027A48",
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { display: false },
            y: { display: false },
        },
        plugins: {
            legend: { display: false },
        },
    };

    return(
        <CardSection showHeader={false} containerProps={{ border: `1px solid ${"#E4E7EC"}` }}>

            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize={'15px'} fontWeight={500} color="#101828">{title}</Text>
                {/* <IconButton
                    icon={<FiMoreVertical />}
                    size="sm"
                    variant="ghost"
                    aria-label="Options"
                /> */}
            </Flex>

            <Text color={'#101828'} fontSize="3xl" fontWeight="bold">{value}</Text>

            <HStack mt={2} justify={'space-between'}>
                <HStack spacing={'-2'}>
                    <ChakraIcon as={vsColor !== "#027A48" ? FiArrowDown : FiArrowUp } color={vsColor ?? "#027A48"} />
                    <Text fontSize="sm" color={vsColor ?? "#027A48"} fontWeight="semibold">40%</Text>
                </HStack>
                <Text fontSize="sm" color="#475467">vs last month</Text>
            </HStack>

            <HStack
                w={'40%'} 
                h={'30px'} 
                mt={2}
            >
                <Line data={data} options={options} />
            </HStack>

        </CardSection>
    )
}