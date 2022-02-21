/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import {
  disabledelement,
  initialState,
  makeColumns,
  schemaValidation,
  filterList,
} from './reducer';
import { CustomInputComponent } from './CustomComponent';
import CustomRenderComponent from '../../components/Layout/CustomRenderComponent';
//import { fetchApiCall } from '../../utils/effects';
import {
  fetchApiCall,
  fetchFilterObject,
  fetchApiList,
} from '../../utils/effects';

const AumPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [aumList, setAumList] = useState([]);
  const [vendorlist, setvendorlist] = useState([]);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [filterobject, setFilterObject] = useState(filterList);
  const [filterLabel, setFilterLabel] = useState('');
  const [filtervalue, setFilterValue] = useState({
    Branch: 'Select Branch',
  });
  const ontoggle = () => {
    setCreateModal(!createModal);
  };

  const onSelectDropDown = value => {
    setFilterValue({ ...filtervalue, ...value });
  };

  useEffect(() => {
    const getData = async filterValue => {
      const response = await fetchApiCall('manageaumdata', filterValue);
      setAumList(response);
    };
    getData(filtervalue);
  }, [filtervalue, submitFlag]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchApiCall('managevendordata', {
        Verticals: 'Mutual Funds',
        'Sub-Verticals': 'Mutual Funds',
      });
      const list = data.map(element => {
        return element.vendor;
      });
      setvendorlist(list);
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (filterLabel !== 'Branch')
        return fetchFilterObject('Branch', filtervalue, setFilterObject);
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
    setSubmitFlag(!submitFlag);
  };

  const props = {
    component: CustomInputComponent,
    createtitle: 'Add AUM',
    data: aumList,
    deletetitle: 'Delete AUM',
    disabledelement,
    editComponent: CustomInputComponent,
    edittitle: 'Edit AUM',
    fileName: 'AUM',
    filterComponent: true,
    filterEdit: true,
    filterobject,
    filtervalue,
    formik: true,
    initialState,
    makeColumns,
    open: createModal,
    schemaValidation,
    serviceName: 'manageaumdata',
    vendorlist,
    title: 'Manage AUM',
    ontoggle,
    onClickSubmit,
    onResetSelection,
    onSelectDropDown,
  };
  return <CustomRenderComponent {...props} />;
};

export default AumPage;
