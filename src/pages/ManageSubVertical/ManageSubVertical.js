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
  const [subverticalList, setSubVerticalList] = useState([]);

  const [filterobject, setFilterObject] = useState(filterList);
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
    setFilterValue({ ...filtervalue, ...value });
  };

  useEffect(() => {
    const getData = async filterValue => {
      const response = await fetchApiCall('managesubverticaldata', filterValue);
      setSubVerticalList(response);
    };
    getData(filtervalue);
  }, [filtervalue]);

  useEffect(() => {
    const fetchData = async () => {
      return fetchFilterObject('', filtervalue, setFilterObject);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResetSelection = () => {
    setFilterValue(
      Object.keys(filterobject).reduce((acc, filter) => {
        acc[filter] = filterobject[filter].title;
        return acc;
      }, {}),
    );
  };

  const onClickSubmit = () => {
    onResetSelection();
  };
  const props = {
    component: CustomInputComponent,
    createtitle: 'Add Sub-Verticals',
    data: subverticalList,
    deletetitle: 'Delete Sub-Verticals',
    editComponent: CustomEditComponent,
    edittitle: 'Edit Sub-Verticals',
    fileName: 'SubVerticals',
    formik: true,
    filterComponent: true,
    filterobject,
    filtervalue,
    initialState,
    keyfield: 'sub-vertical',
    makeColumns,
    open: createModal,
    schemaValidation,
    serviceName: 'managesubverticaldata',
    title: 'Manage SubVerticals',
    updateType: true,
    ontoggle,
    onClickSubmit,
    onResetSelection,
    onSelectDropDown,
  };
  return <CustomRenderComponent {...props} />;
};

export default SubVerticalPage;
