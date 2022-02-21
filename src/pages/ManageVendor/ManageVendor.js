/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';

import {
  initialState,
  makeColumns,
  schemaValidation,
  filterList,
} from './reducer';
import CustomRenderComponent from '../../components/Layout/CustomRenderComponent';
import { CustomInputComponent } from '../../components/Layout/CustomFormComponent';
import { CustomEditComponent } from '../../components/Layout/CustomEditComponent';
import { fetchApiCall, fetchFilterObject } from '../../utils/effects';

const SubVerticalPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [vendorlist, setvendorlist] = useState([]);
  const [filterobject, setFilterObject] = useState(filterList);
  const [filterLabel, setFilterLabel] = useState('');

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
      const response = await fetchApiCall('managevendordata', filtervalue);
      setvendorlist(response);
    };
    getData(filtervalue);
  }, [filtervalue]);

  useEffect(() => {
    const fetchData = async () => {
      if (filterLabel !== 'Sub-Verticals')
        return fetchFilterObject(filterLabel, filtervalue, setFilterObject);
    };
    fetchData();
  }, [filtervalue, filterLabel]);

  const onResetSelection = () => {
    setFilterLabel('ResetFlag');
    setFilterValue(
      Object.keys(filterobject).reduce((acc, filter) => {
        acc[filter] = filterobject[filter].title;
        return acc;
      }, {}),
    );
    setFilterObject(filterList);
  };

  const onClickSubmit = () => {
    onResetSelection();
  };
  const props = {
    component: CustomInputComponent,
    createtitle: 'Add Vendors',
    data: vendorlist,
    deletetitle: 'Delete Vendors',
    editComponent: CustomEditComponent,
    edittitle: 'Edit Vendors',
    fileName: 'Vendors',
    formik: true,
    filterComponent: true,
    filterobject,
    filtervalue,
    initialState,
    keyfield: 'vendor',
    makeColumns,
    open: createModal,
    schemaValidation,
    serviceName: 'managevendordata',
    title: 'Manage Vendors',
    updateType: true,
    ontoggle,
    onClickSubmit,
    onResetSelection,
    onSelectDropDown,
  };
  return <CustomRenderComponent {...props} />;
};

export default SubVerticalPage;
