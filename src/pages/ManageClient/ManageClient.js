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
import { fetchApiCall, fetchApiList } from '../../utils/effects';

const ClientPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [clientList, setClientList] = useState([]);
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
      const response = await fetchApiCall('manageclientdata', filterValue);
      setClientList(response);
    };
    getData(filtervalue);
  }, [filtervalue]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchApiCall('managesubverticaldata', '');
      const list = data.map(element => {
        return element['sub-vertical'];
      });
      setFilterObject(prevState => {
        const filter = { ...prevState };
        filter['Sub-Verticals'] = {
          ...filter['Sub-Verticals'],
          list: list,
        };

        return filter;
      });
      const familyList = await fetchApiList('managemiscdata', {
        type: 'family',
      });

      setFilterObject(prevState => {
        const filter = { ...prevState };
        filter['Family'] = {
          ...filter['Family'],
          list: familyList,
        };

        return filter;
      });
    };
    getData();
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
    setFilterValue({ ...filtervalue });
  };
  const props = {
    component: CustomInputComponent,
    createtitle: 'Add Clients',
    data: clientList,
    deletetitle: 'Delete Clients',
    disabledelement,
    editComponent: CustomInputComponent,
    edittitle: 'Edit Clients',
    fileName: 'Clients',
    formik: true,
    filterComponent: false,
    filterobject,
    filtervalue,
    initialState,
    keyField: 'name',
    makeColumns,
    open: createModal,
    schemaValidation,
    serviceName: 'manageclientdata',
    title: 'Manage Clients',
    ontoggle,
    onClickSubmit,
    onResetSelection,
    onSelectDropDown,
  };
  return <CustomRenderComponent {...props} />;
};

export default ClientPage;
