import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { SelectComponent } from '../Layout/SelectDropDown';
import { fetchApiCall, fetchApiList } from '../../utils/effects';

const genBarData = chartData => {
  return chartData.reduce(
    (acc, lineData) => {
      acc.labels.push(lineData.labelname);
      acc.datasets[0].data.push(lineData.dataval);
      acc.datasets[0].backgroundColor.push('#6a82fb');
      acc.datasets[0].label = '';
      acc.datasets[0].fill = false;
      return acc;
    },
    { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
  );
};
const dropdownDate = ['Monthly', 'Quarterly', 'HalfYearly', 'Yearly'];
const dropdownBranch = ['Mumbai', 'Pune', 'All'];

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
};

export const BarChart = props => {
  const [selectedValue, setSelvalue] = useState('Monthly');
  const [selectedBranch, setSelBranch] = useState('All');
  const [selectedVertical, setSelVertical] = useState('All');
  const [chartData, setChartData] = useState([]);
  const [verticalList, setVerticalList] = useState([]);

  let dataType = props.barType;

  const onSelectPeriod = e => {
    setSelvalue(e.value);
  };

  const onSelectBranch = e => {
    setSelBranch(e.value);
  };


  const onSelectVertical = e => {
    setSelVertical(e.value);
  };

  useEffect(() => {
    const getData = async selectedValue => {
      const response = await fetchApiCall('managedashboarddata', {
        selectedBranch,
        selectedValue,
        selectedVertical,
        data_type: dataType,
      });
      setChartData(response);
    };

    getData(selectedValue);
  }, [dataType, selectedBranch, selectedValue, selectedVertical]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchApiList('manageverticaldata', '');
      response.push('All');
      setVerticalList(response);
    };
    getData();
  }, []);

  return (
    <Card>
      <CardHeader
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          textAlign: 'end',
        }}>
        <span>{props.displayTitle}</span>
        <div>
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
              onSelect={onSelectPeriod}
              list={dropdownDate}
            />
          </span>
          {props.displayTitle === 'Gross Revenue' ? (
            <span>
              <SelectComponent
                value={{ value: selectedVertical, label: selectedVertical }}
                onSelect={onSelectVertical}
                list={verticalList}
              />
            </span>
          ) : null}
        </div>
      </CardHeader>
      <CardBody>
        <Bar data={genBarData(chartData)} options={chartOption} />
      </CardBody>
    </Card>
  );
};
