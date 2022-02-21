import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { SelectComponent } from '../Layout/SelectDropDown';
import { fetchApiCall } from '../../utils/effects';

const dropdownDate = ['Monthly', 'Quarterly', 'HalfYearly', 'Yearly'];

const genPieData = pieData => {
  var colorDict = [
    'blue',
    'red',
    'green',
    'yellow',
    'beige',
    'orange',
    'pink',
    'purple',
  ];

  return pieData.reduce(
    (acc, pData, index) => {
      acc.labels.push(pData.labelname);
      acc.datasets[0].data.push(pData.dataval);
      acc.datasets[0].backgroundColor.push(colorDict[index]);
      acc.datasets[0].label = '';
      return acc;
    },
    { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
  );
};

const chartOption = {
  responsive: true,
  legend: {
    display: true,
  },
  title: {
    display: false,
    text: 'Chart.js Pie Chart',
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        let label = data.labels[tooltipItem.index] || '';

        if (label) {
          label += ': ';
        }
        label +=
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
        return label;
      },
    },
  },
};

export const PieChart = props => {
  const [selectedValue, setSelvalue] = useState('Monthly');
  const [pieData, setPieData] = useState([]);

  const SelectHandleChange = e => {
    setSelvalue(e.value);
  };

  useEffect(() => {
    const getData = async selectedValue => {
      const response = await fetchApiCall('managedashboarddata', {
        selectedValue,
        data_type: 'NetRevenuPieData',
      });
      setPieData(response);
    };

    getData(selectedValue);
  }, [selectedValue]);

  return (
    <Card>
      <CardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Gross Revenue by Verticals</span>
        <span>
          <SelectComponent
            value={{ value: selectedValue, label: selectedValue }}
            onSelect={SelectHandleChange}
            list={dropdownDate}
          />
        </span>
      </CardHeader>
      <CardBody>
        <Pie data={genPieData(pieData)} options={chartOption} />
      </CardBody>
    </Card>
  );
};
