import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { BgColor, BorderColor } from "../../../anyList/colorToPie";

// Регистрация компонентов Chart.js, необходимых для круговой диаграммы
ChartJS.register(ArcElement, Tooltip);

const PieBarChart = ({ objPieBar }) => {
  const data = {
    labels: Object.keys(objPieBar),
    datasets: [
      {
        label: "Колличество отзывов",
        data: Object.values(objPieBar),
        backgroundColor: BgColor,
        borderColor: BorderColor,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        enabled: true, // Включение подсказок
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieBarChart;
