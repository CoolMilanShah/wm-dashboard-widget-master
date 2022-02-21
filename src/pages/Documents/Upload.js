import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { Button } from 'reactstrap';
import Page from '../../components/Page';
import {
  SelectComponent,
  CreatableComponent,
} from '../../components/Layout/SelectDropDown';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Divider } from '../../components/Layout/StyledComponent';

import { fetchApiCall, fetchApiList } from '../../utils/effects';

const FileComponent = ({ fileObject, onClickDelete, onSubmit, submitFlag }) => {
  if (fileObject.length <= 0) return null;
  return (
    <>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            {Object.keys(fileObject[0]).map(key =>
              key !== 'file' && key !== 'createdatetime' ? (
                <th style={{ width: '25%' }} key={key}>
                  {key}
                </th>
              ) : null,
            )}
            <th>{ }</th>
          </tr>
        </thead>
        <tbody>
          {fileObject.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.name}</td>
                <td>{element.pan}</td>
                <td>{element.category}</td>
                <td>{element.filename}</td>
                <td>
                  <button
                    value={index}
                    onClick={onClickDelete}
                    className="clearfile">
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ height: '20px' }}></div>

      <Button
        color="primary"
        type="submit"
        onClick={onSubmit}
        disabled={submitFlag}>
        Submit
      </Button>
    </>
  );
};
let inputref = React.createRef();

const CustomComponent = ({ field, form, ...props }) => {
  switch (field.name) {
    case 'category':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <CreatableComponent
            isMulti={false}
            list={props.category}
            value={{ label: field.value, value: field.value }}
            onSelect={value => {
              value
                ? form.setFieldValue(field.name, value.value)
                : form.setFieldValue(field.name, '');
              form.setFieldValue('createdatetime', moment().toISOString());
            }}
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
              inputref.current.value = '';
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
    case 'filename': {
      return (
        <label>
          <Divider />{' '}
          <input
            type="file"
            ref={inputref}
            onChange={event => {
              form.setFieldValue(field.name, event.currentTarget.files[0]);
            }}
          />
          <Divider />
        </label>
      );
    }
    case 'createdatetime':
      return <span />;
    default:
  }
};

export const DocUpload = () => {
  const fieldMap = [
    'clientname',
    'pan',
    'category',
    'filename',
    'createdatetime',
  ];
  const [selectionlist, setSelectionList] = useState({
    clientname: [],
    pan: {},
  });
  const [category, setCategory] = useState([]);
  const [fileObject, setFileObject] = useState([]);
  const [submitFlag, setSubmitFlag] = useState(false);

  const onClickDelete = event => {
    const value = event.target.value;
    setFileObject(prevState => {
      const arrList = prevState;
      arrList.splice(value, 1);
      return [...arrList];
    });
  };
  useEffect(() => {
    const getData = async () => {
      const response = await fetchApiList('managemiscdata', {
        type: 'documentcategory',
      });

      setCategory(response);
    };
    getData();
  }, [submitFlag]);

  const onClickSubmit = () => {
    setSubmitFlag(true);
    let data = new FormData();
    fileObject.map(file => {
      data.append('file', file.file);
      data.append('filename', file.filename);
      data.append('category', file.category);
      data.append('clientname', file.name);
      data.append('pan', file.pan);
      data.append('createdatetime', file.createdatetime);
    });

    //fetch(`http://52.64.255.41/doc/docupload`, {
    fetch(`http://localhost:9080/doc/docupload`, {
      method: 'POST',
      body: data,
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          alert('Form Submitted successfully');
          setFileObject([]);
          setSubmitFlag(false);
        } else {
          response
            .json()
            .then(res =>
              alert(`There was an error, please try again, ${res.reason}`),
            );
          setSubmitFlag(false);
        }
      })
      .catch(err => {
        alert(`There was an error, please try again, ${err}`);
        setSubmitFlag(false);
      });
  };

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

  return (
    <Page
      title={'Upload Documents'}
      breadcrumbs={[{ name: 'Upload Documents', active: true }]}>
      <div
        style={{
          alignSelf: 'center',
          height: '100%',
        }}>
        <Formik
          initialValues={{
            clientname: 'Select...',
            pan: 'Select...',
            category: 'Select...',
            filename: undefined,
          }}
          validationSchema={Yup.object().shape({
            filename: Yup.mixed().required(),
            clientname: Yup.string().required(),
            pan: Yup.string()
              .required()
              .notOneOf(['Select...']),
            category: Yup.string().required(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            inputref.current.value = '';
            setFileObject(prev => {
              return [
                ...prev,
                {
                  name: values.clientname,
                  pan: values.pan,
                  category: values.category,
                  filename: values.filename.name,
                  file: values.filename,
                  createdatetime: values.createdatetime,
                },
              ];
            });
            setSubmitting(true);
          }}>
          {({ errors, dirty }) => (
            <Form>
              {fieldMap.map(element => {
                return (
                  <div
                    key={element}
                    style={{
                      display: 'inline-block',
                      height: '100%',
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
              <br />
              <div>
                <Button
                  color="primary"
                  type="submit"
                  disabled={
                    Object.keys(errors).length > 0 || !dirty ? true : false
                  }>
                  Add
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div style={{ height: '100px' }}></div>
        <FileComponent
          fileObject={fileObject}
          onClickDelete={onClickDelete}
          onSubmit={onClickSubmit}
          submitFlag={submitFlag}
        />
      </div>
    </Page>
  );
};

export default DocUpload;
