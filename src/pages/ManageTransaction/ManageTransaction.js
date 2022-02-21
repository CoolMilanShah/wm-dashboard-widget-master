/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import {
  initialState,
  filterList,
  makeColumns,
  schemaValidation,
  disabledelement,
} from './reducer';
import { CustomInputComponent } from './CustomComponent';
import CustomRenderComponent from '../../components/Layout/CustomRenderComponent';
import { fetchApiCall, fetchFilterObject } from '../../utils/effects';
import { fetchApiCall1, fetchApiList } from '../../utils/effects';

const TransactionPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [transactionList, setTransactionList] = useState([]);

  const [filterobject, setFilterObject] = useState(filterList);
  const [filterLabel, setFilterLabel] = useState('');
  //const [filterLabel, setFilterLabel] = useState('Branch');

  const [filtervalue, setFilterValue] = useState(
    Object.keys(filterobject).reduce((acc, filter) => {
      acc[filter] = filterobject[filter].title;
      return acc;
    }, {}),
  );
  const ontoggle = () => {
    setCreateModal(!createModal);
  };

  const onSelectDropDown = value => {
    const label = Object.keys(value)[0];

    setFilterLabel(label);

    setFilterValue(prevState => {
      let child = filterobject[label].childType || '';
      let filterval = { ...prevState };

      while (child) {
        filterval[child] = filterobject[child].title;
        child = filterobject[child].childType || '';

      }
      return { ...filterval, ...value };
    });
  };

  useEffect(() => {
    const getData = async filterValue => {
      const response = await fetchApiCall('managetransactiondata', filterValue);
      setTransactionList(response);
    };

    getData(filtervalue);
  }, [filtervalue]);


  useEffect(() => {
    const fetchData = async () => {
      //if (filterLabel !== 'Vendors')
      if (filterLabel !== 'Branch') {
        if (filterLabel == 'Vendors') {
          return fetchFilterObject('Branch', filtervalue, setFilterObject);
        }
        else {
          return fetchFilterObject(filterLabel, filtervalue, setFilterObject);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtervalue, filterLabel]);


  const onResetSelection = () => {
    setFilterValue(
      Object.keys(filterobject).reduce((acc, filter) => {
        acc[filter] = filterobject[filter].title;
        return acc;
      }, {}),
    );
  };

  const onClickSubmit = () => {
    setFilterValue({ ...filtervalue });
  };
  const props = {
    component: CustomInputComponent,
    createtitle: 'Add Transactions',
    data: transactionList,
    deletetitle: 'Delete Transactions',
    disabledelement,
    editComponent: CustomInputComponent,
    edittitle: 'Edit Transactions',
    fileName: 'Transactions',
    filterComponent: true,
    filterEdit: true,
    formik: true,
    filterobject,
    filtervalue,
    initialState,
    makeColumns,
    open: createModal,
    schemaValidation,
    serviceName: 'managetransactiondata',
    title: 'Manage Transactions',
    ontoggle,
    onClickSubmit,
    onResetSelection,
    onSelectDropDown,
  };

  return <CustomRenderComponent {...props} />;
};

export default TransactionPage;
