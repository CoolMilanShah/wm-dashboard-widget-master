import React, { useState, useEffect } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { SelectComponent } from '../Layout/SelectDropDown';
import { fetchApiCall, fetchApiList } from '../../utils/effects';
import ChartjsPluginStacked100 from 'chartjs-plugin-stacked100';

Chart.register(ChartjsPluginStacked100);

const availableColors = [
  'blue',
  'pink',
  'red',
  'green',
  'purple',
  'orange',
  'yellow',
  'teal',
  'cyan',
  'white',
  'gray',
  'gray-dark',
  'light',
  'dark',
];
const dataAll = [];


const genBarData = (chartData, verticalList) => {
  let barData = chartData.reduce(
    (acc, data, index) => {
      // eslint-disable-next-line array-callback-return

      data.map(lineData => {
        if (index === 0) {
          acc.labels.push(lineData.labelname);
          acc.datasets[index].label = 'All';
          dataAll.push(lineData.dataval);
          return 1;
        }
        if (!acc.datasets[index]) {
          acc.datasets[index] = {
            data: Array(acc.labels.length).fill(0),
            backgroundColor: [],
          };
        }
        const indexArr = acc.labels.indexOf(lineData.labelname);
        if (indexArr !== -1)
          acc.datasets[index].data[indexArr] =
            (lineData.dataval * 100) / dataAll[indexArr];
        acc.datasets[index].fill = false;
        acc.datasets[index].backgroundColor.push(availableColors[index - 1]);
        acc.datasets[index].label = verticalList[index - 1];
        acc.datasets[index].stack = 'stack1';
        acc.datasets[index].categoryPercentage = 1;
      });
      return acc;
    },
    { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
  );

  if (barData.datasets) {
    barData.datasets.splice(0, 1);
  }

  return barData;
};
const dropdownDate = ['Monthly', 'Quarterly', 'HalfYearly', 'Yearly'];

const dropdownBranch = ['Mumbai', 'Pune', 'All'];

const chartOption = {
  responsive: true,
  legend: {
    display: true,
  },
  plugins: {
    stacked100: { enable: true },
  },
};

export const StackedBarChart = props => {
  const [selectedBranch, setSelBranch] = useState('All');
  const [selectedValue, setSelvalue] = useState('Monthly');
  const [chartData, setChartData] = useState([]);
  const [verticalList, setVerticalList] = useState([]);

  let dataType = props.barType;

  const onSelectPeriod = e => {
    setSelvalue(e.value);
  };

  const onSelectBranch = e => {
    setSelBranch(e.value);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await fetchApiList('manageverticaldata', '');
      setVerticalList(response);
    };
    getData();
  }, []);

  useEffect(() => {
    if (verticalList.length !== 0) {
      const getData = async selectedValue => {
        const response = verticalList.map(vertical => {
          return fetchApiCall('managedashboarddata', {
            selectedBranch,
            selectedValue,
            selectedVertical: vertical,
            data_type: dataType,

          });
        });
        response.unshift(
          fetchApiCall('managedashboarddata', {
            selectedBranch,
            selectedValue,
            selectedVertical: 'All',
            data_type: dataType,
          }),
        );
        const data = await Promise.all(response);
        setChartData(data);
      };

      getData(selectedValue);
    }
  }, [dataType, selectedBranch, selectedValue, verticalList]);

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
        </div>
      </CardHeader>
      <CardBody>
        <Bar data={genBarData(chartData, verticalList)} options={chartOption} />
      </CardBody>
    </Card>
  );
};
