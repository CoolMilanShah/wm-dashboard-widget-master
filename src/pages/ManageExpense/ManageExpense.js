/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import {
  initialState,
  disabledelement,
  makeColumns,
  schemaValidation,
  filterList,
} from './reducer';
import { CustomInputComponent } from './CustomComponent';
import CustomRenderComponent from '../../components/Layout/CustomRenderComponent';
import {
  fetchApiCall,
  fetchFilterObject,
  fetchApiList,
} from '../../utils/effects';

const AumPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
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
      const response = await fetchApiCall('manageexpensedata', filterValue);

      setClientList(response.data);
      const category = response.category.map(element => {
        return Object.values(element)[0];
      });
      setExpenseCategory(category);
    };
    getData(filtervalue);
  }, [filtervalue, submitFlag]);

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
    setSubmitFlag(prevState => {
      return !prevState;
    });
  };
  const props = {
    component: CustomInputComponent,
    createtitle: 'Add Expenses',
    data: clientList,
    deletetitle: 'Delete Expenses',
    disabledelement,
    editComponent: CustomInputComponent,
    edittitle: 'Edit Expenses',
    expenseCategory,
    fileName: 'Expenses',
    filterComponent: true,
    filterEdit: true,
    filterobject,
    filtervalue,
    formik: true,
    initialState,
    keyField: 'expensecategory',
    makeColumns,
    open: createModal,
    schemaValidation,
    serviceName: 'manageexpensedata',
    title: 'Manage Expenses',
    ontoggle,
    onClickSubmit,
    onResetSelection,
    onSelectDropDown,
  };
  return <CustomRenderComponent {...props} />;
};

export default AumPage;
