import React from 'react';
import {
  Chart as ChartJS,
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const LineChart = ({ views = [] }) => {
  const labels = getLastYearMonths();
  // const labels = ['abc' , 'abc2' , 'abc3' , 'abc4'];

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
        data: views,
        // data: [1,2,3,4,7 , 0],
        borderColor: 'rgba(107,70,193,0.5)',
        backgroundColor: '#6b46c1',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export const DoughnutChart = ({ users = [] }) => {
// export const DoughnutChart = ({ data = [] }) => {
  const data = {
    labels: ['Subscribed', 'Not Subscribed'],
    datasets: [
      {
        label: 'Views',
        data: users,
        // data: [3,20],
        borderColor: ['rgb(62,12,171)', 'rgb(214,43,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

function getLastYearMonths() {
  const labels = [];

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

  let currentMonth = new Date().getMonth();
  // currentMonth = 6
  // const remain = 11 - currentMonth;
  

  for (let i = currentMonth; i < months.length; i--) {
    const element = months[i];
    labels.unshift(element);
    if (i === 0) break;
  }

  console.log(labels);

  for (let i = 11; i > currentMonth; i--) {
    console.log("i", i, "remain", undefined , "currentMonth" , currentMonth );
    if (i === currentMonth) break;  
    const element = months[i];
    labels.unshift(element);
  }

  console.log(labels);

  return labels;
}
