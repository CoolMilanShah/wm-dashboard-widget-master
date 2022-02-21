import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { SelectComponent } from '../Layout/SelectDropDown';
import { fetchApiCall } from '../../utils/effects';

const dropdownDate = ['Monthly', 'Quarterly', 'HalfYearly', 'Yearly'];
const dropdownBranch = ['Mumbai', 'Pune', 'All'];

const genLineData = chartData => {
  return chartData.reduce(
    (acc, lineData) => {
      acc.labels.push(lineData.labelname);
      acc.datasets[0].data.push(lineData.dataval);
      acc.datasets[0].backgroundColor.push('blue');
      acc.datasets[0].label = '';
      acc.datasets[0].fill = false;
      return acc;
    },
    { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
  );
};

const chartOption = {
  responsive: true,
  legend: {
    display: false,
  },
  tooltips: {
    intersect: true,
    mode: 'nearest',
  },
  hover: {
    mode: 'index',
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: true,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
        },
      },
    ],
  },
};




export const LineChart = props => {
  const [selectedBranch, setSelBranch] = useState('All');
  const [selectedValue, setSelvalue] = useState('Monthly');
  const [chartData, setChartData] = useState([]);

  let dataType = props.lineType;

  const SelectHandleChange = e => {
    setSelvalue(e.value);
  };

  const onSelectBranch = e => {
    setSelBranch(e.value);
  };

  useEffect(() => {
    const getData = async selectedValue => {
      const response = await fetchApiCall('managedashboarddata', {
        selectedBranch,
        selectedValue,
        data_type: dataType,
      });
      setChartData(response);
    };
    getData(selectedValue);
  }, [dataType, selectedValue, selectedBranch]);

  return (
    <Card>
      <CardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{props.title}</span>
        <span>
          <SelectComponent
            value={{ value: selectedBranch, label: selectedBranch }}
            onSelect={onSelectBranch}
            list={dropdownBranch}
          />
        </span>
        <span>
          <SelectComponent
            value={{ value: selectedValue, label: selectedValue }}
            onSelect={SelectHandleChange}
            list={dropdownDate}
          />
        </span>
      </CardHeader>
      <CardBody>
        <Line data={genLineData(chartData)} options={chartOption} />
      </CardBody>
    </Card>
  );
};
