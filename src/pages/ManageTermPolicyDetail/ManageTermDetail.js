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

const TermDetailPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [filterobject, setFilterObject] = useState(filterList);
  const [filterLabel, setFilterLabel] = useState('Sub-Verticals');
  const [selectionlist, setSelectionList] = useState({
    firstholder: [],
    producttype: [],
  });

  const [filtervalue, setFilterValue] = useState({
    Verticals: 'Term Deposits',
    Vendors: 'Select Vendor',
    Company: 'Select Company',
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
      const response = await fetchApiCall(
        'managetermdepositdetail',
        filterValue,
      );

      setTransactionList(response);
    };

    getData(filtervalue);
  }, [filtervalue]);

  useEffect(() => {
    const getData = async () => {
      const clientList = await fetchApiList('managemiscdata', {
        type: 'client',
      });
      const productList = await fetchApiList('managemiscdata', {
        type: 'producttype',
      });

      setSelectionList({ firstholder: clientList, producttype: productList });
    };

    getData();
  }, []);

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
    createtitle: 'Add Term Deposits',
    data: transactionList,
    deletetitle: 'Delete Term Deposits',
    disabledelement,
    editComponent: CustomInputComponent,
    edittitle: 'Edit Term Deposits',
    fileName: 'TermDeposits',
    filterComponent: true,
    filterEdit: true,
    formik: true,
    filterobject,
    filtervalue,
    initialState,
    makeColumns,
    open: createModal,
    schemaValidation,
    selectionlist,
    serviceName: 'managetermdepositdetail',
    title: 'Manage Term Deposits',
    ontoggle,
    onClickSubmit,
    onResetSelection,
    onSelectDropDown,
  };

  return <CustomRenderComponent {...props} />;
};

export default TermDetailPage;
