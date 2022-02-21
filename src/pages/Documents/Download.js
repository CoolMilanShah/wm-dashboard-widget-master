import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Button } from 'reactstrap';
import Page from '../../components/Page';
import { SelectComponent } from '../../components/Layout/SelectDropDown';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Divider } from '../../components/Layout/StyledComponent';

import { fetchApiCall, fetchApiList } from '../../utils/effects';
import { TableComponent } from './TableComponent';
import { makeColumns } from './reducer';

const CustomComponent = ({ field, form, ...props }) => {
  switch (field.name) {
    case 'category':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
            isMulti={false}
            list={props.category}
            value={{ label: field.value, value: field.value }}
            onSelect={value => {
              value
                ? form.setFieldValue(field.name, value.value)
                : form.setFieldValue(field.name, '');
            }}
            isClearable={true}
          />
          <Divider />
        </label>
      );
    case 'clientname':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
            isMulti={false}
            list={props.selectionlist[field.name]}
            value={{ label: field.value, value: field.value }}
            onSelect={value => {
              form.resetForm();
              form.setFieldValue(field.name, value.value);
            }}
          />
          <Divider />
        </label>
      );
    case 'pan':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
            isMulti={false}
            list={
              props.selectionlist[field.name][form.values.clientname]
                ? props.selectionlist[field.name][form.values.clientname]
                : []
            }
            value={{ label: field.value, value: field.value }}
            onSelect={value => {
              form.setFieldValue(field.name, value.value);
            }}
          />
          <Divider />
        </label>
      );

    default:
  }
};

export const DocDownload = () => {
  const fieldMap = ['clientname', 'pan', 'category'];
  const [selectionlist, setSelectionList] = useState({
    clientname: [],
    pan: {},
  });
  const [selectedValue, setSelectedValue] = useState({
    clientname: '',
    pan: '',
    category: '',
  });
  const [category, setCategory] = useState([]);

  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetchApiCall('managemiscdata', { type: 'pan' });
      let clientList = [];
      let panMap = {};
      response.map(ele => {
        clientList.push(ele.name);
        if (!panMap[ele.name]) panMap[ele.name] = [];
        panMap[ele.name].push(ele.pan);
      }, []);

      setSelectionList(prevState => {
        return { ...prevState, clientname: clientList, pan: panMap };
      });
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const response = await fetchApiList('managemiscdata', {
        type: 'documentcategory',
      });

      setCategory(response);
    };
    getData();
  }, []);
  const getFileData = values => {
    setSelectedValue({ ...values });
    fetchApiCall('managedocument', { ...values }).then(response => {
      setData(response);
    });
  };
  return (
    <Page
      title={'Download Documents'}
      breadcrumbs={[{ name: 'Download Documents', active: true }]}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Formik
          initialValues={{
            clientname: 'Select...',
            pan: 'Select...',
            category: 'Select...',
          }}
          validationSchema={Yup.object().shape({
            clientname: Yup.string().required(),
            pan: Yup.string().required(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            getFileData(values);
            setSubmitting(false);
          }}>
          {({ errors, dirty }) => (
            <Form>
              {fieldMap.map(element => {
                return (
                  <div
                    key={element}
                    style={{
                      display: 'inline-block',
                    }}>
                    <ErrorMessage
                      name={element}
                      render={msg => (
                        <div
                          style={{
                            fontSize: '0.5em',
                            color: 'red',
                            width: '200px',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                          }}>
                          {msg}
                        </div>
                      )}
                    />
                    <Field
                      name={element}
                      component={CustomComponent}
                      selectionlist={selectionlist}
                      category={category}
                    />
                  </div>
                );
              })}
              <Divider />
              <Divider />
              <Button
                color="primary"
                type="submit"
                disabled={
                  Object.keys(errors).length > 0 || !dirty ? true : false
                }>
                Submit
              </Button>
            </Form>
          )}
        </Formik>

        <TableComponent
          deletetitle={'Delete Files'}
          data={data}
          fileName={selectedValue.clientname}
          serviceName={'managedocument'}
          makeColumns={makeColumns}
          onClickSubmit={() => {
            getFileData(selectedValue);
          }}
        />
      </div>
    </Page>
  );
};

export default DocDownload;
