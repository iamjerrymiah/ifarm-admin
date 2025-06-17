import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
        {
            label: 'Sales',
            data: [200, 300, 350, 400, 800, 900, 800, 1000, 1030, 1100, 1400, 1450],
            fill: true,
            backgroundColor: 'rgba(34,197,94,0.1)',
            borderColor: '#0B142B',
            tension: 0.4,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: { display: false },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const TransactionChart = () => {
    return (
        <Line data={data} options={options} />
    );
};

export default TransactionChart;