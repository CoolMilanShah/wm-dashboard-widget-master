/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { initialState, makeColumns, schemaValidation } from './reducer';
import { CustomInputComponent } from '../../components/Layout/CustomFormComponent';
import { CustomEditComponent } from '../../components/Layout/CustomEditComponent';
import CustomRenderComponent from '../../components/Layout/CustomRenderComponent';
import { fetchApiCall } from '../../utils/effects';

const VerticalPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [verticalList, setVerticalList] = useState([]);

  const ontoggle = () => {
    setCreateModal(!createModal);
  };

  const onClickSubmit = () => {
    setSubmitFlag(!submitFlag);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApiCall('manageverticaldata');
      setVerticalList(response);
    };
    fetchData();
  }, [submitFlag]);
  const props = {
    component: CustomInputComponent,
    createtitle: 'Add Verticals',
    data: verticalList,
    deletetitle: 'Delete Verticals',
    editComponent: CustomEditComponent,
    edittitle: 'Edit Verticals',
    fileName: 'Verticals',
    formik: true,
    filterobject: null,
    filtervalue: null,
    initialState,
    keyfield: 'vertical',
    makeColumns,
    open: createModal,
    schemaValidation,
    serviceName: 'manageverticaldata',
    title: 'Manage Verticals',
    updateType: true,
    ontoggle,
    onClickSubmit,
  };

  return <CustomRenderComponent {...props} />;
};

export default VerticalPage;
