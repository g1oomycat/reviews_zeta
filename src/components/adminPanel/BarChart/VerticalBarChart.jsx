import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const VerticalBarChart = ({ objVerticalBar }) => {
  const data = {
    labels: Object.keys(objVerticalBar),
    datasets: [
      {
        label: "Колличество отзывов",
        data: Object.values(objVerticalBar),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    tooltip: {
      enabled: true, // Включение подсказок
    },
  };

  return <Bar data={data} options={options} />;
};
