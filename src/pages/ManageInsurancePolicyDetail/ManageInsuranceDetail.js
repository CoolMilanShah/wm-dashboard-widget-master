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
import {
  fetchApiCall,
  fetchFilterObject,
  fetchApiList,
} from '../../utils/effects';

const InsuranceDetailPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [filterobject, setFilterObject] = useState(filterList);
  const [selectionlist, setSelectionList] = useState({
    investorname: [],
    dob: {},
    plantype: [],
  });
  const [filterLabel, setFilterLabel] = useState('Verticals');

  const [filtervalue, setFilterValue] = useState({
    Verticals: 'Insurance',
    'Sub-Verticals': 'Select SubVertical',
    Vendors: 'Select Vendor',
    Company: 'Select Company',
    Branch: 'Select Branch',//ET-1100
  });
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
      const response = await fetchApiCall('manageinsurancedetail', filterValue);
      setTransactionList(response);
    };

    getData(filtervalue);
  }, [filtervalue]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchApiCall('managemiscdata', { type: 'client' });
      let clientList = [];
      let dobmap = {};
      response.map(ele => {
        clientList.push(ele.name);
        dobmap[ele.name] = ele.dob;
      });

      setSelectionList(prevState => {
        return { ...prevState, investorname: clientList, dob: dobmap };
      });
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async filtervalue => {
      const planList = await fetchApiList('managemiscdata', {
        subvertical: filtervalue['Sub-Verticals'],
        type: 'plantype',
      });
      setSelectionList(prevState => {
        return { ...prevState, plantype: planList };
      });
    };

    getData(filtervalue);
  }, [filtervalue]);

  useEffect(() => {
    const fetchData = async () => {
      if (filterLabel !== 'Company')
        return fetchFilterObject(filterLabel, filtervalue, setFilterObject);
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
    createtitle: 'Add Insurance Details',
    data: transactionList,
    deletetitle: 'Delete Insurance Details',
    disabledelement,
    editComponent: CustomInputComponent,
    edittitle: 'Edit Insurance Details',
    fileName: 'InsuranceDetails',
    filterComponent: true,
    filterEdit: true,
    formik: true,
    filterobject,
    filtervalue,
    initialState,
    makeColumns,
    open: createModal,
    schemaValidation,
    serviceName: 'manageinsurancedetail',
    selectionlist,
    title: 'Manage Insurance Details',
    ontoggle,
    onClickSubmit,
    onResetSelection,
    onSelectDropDown,
  };

  return <CustomRenderComponent {...props} />;
};

export default InsuranceDetailPage;
