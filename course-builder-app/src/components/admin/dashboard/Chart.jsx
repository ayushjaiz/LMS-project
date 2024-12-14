import React from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);
export const LineChart = ({viewsArray = []}) => {
  const labels = getLastYearMonth();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Views',
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: viewsArray,
        borderColor: 'rgba(107,70,192,0.5)',
        backgroundColor: '#6b46c1',
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export const DoughnutChat = ({ usersData= [] }) => {
  const labels = ['Subscribed', 'Not Subscribed'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: usersData,
        borderColor: ['rgb(62,12,171)', 'rgb(214,42,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,42,129,0.3)'],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

function getLastYearMonth() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentMonth = new Date().getMonth();
  const monthsFromCurrentToEnd = months.slice(currentMonth + 1);
  const monthsFromStartToCurrent = months.slice(0, currentMonth + 1);

  const remainingMonths = monthsFromCurrentToEnd.concat(monthsFromStartToCurrent);

  return remainingMonths;
}



