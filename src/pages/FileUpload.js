import React from 'react';
import * as Yup from 'yup';
import { Button } from 'reactstrap';
import Page from '../components/Page';
import { SelectComponent } from '../components/Layout/SelectDropDown';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Divider } from '../components/Layout/StyledComponent';
import { FORMCONSTANT } from '../utils/constants';

let inputref = React.createRef();

const CustomComponent = ({ field, form, ...props }) => {
  switch (field.name) {
    case 'category':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
            isMulti={false}
            list={FORMCONSTANT['fileuploadcategory']}
            value={{ label: field.value, value: field.value }}
            onSelect={value => {
              form.setFieldValue(field.name, value.value);
            }}
          />
          <Divider />
        </label>
      );
    case 'filename':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />{' '}
          <input
            type="file"
            onChange={event => {
              form.setFieldValue(field.name, event.currentTarget.files[0]);
            }}
          />
          <Divider />
        </label>
      );
    default:
  }
};

export const FileUpload = () => {
  const fieldMap = ['category', 'filename'];

  return (
    <Page
      title={'Upload File'}
      breadcrumbs={[{ name: 'Upload File', active: true }]}>
      <div
        style={{
          alignSelf: 'center',
          height: '100%',
        }}>
        <Formik
          initialValues={{ category: '', filename: '' }}
          validationSchema={Yup.object().shape({
            filename: Yup.mixed().required(),
            category: Yup.string().required(),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            let data = new FormData();
            data.append('file', values.filename);
            data.append('filename', values.filename.name);
            data.append('category', values.category);
            setSubmitting(true);
            //fetch(`http://52.64.255.41/file/fileupload`, {
            fetch(`http://localhost:9080/file/fileupload`, {
              method: 'POST',
              body: data,
            })
              .then(response => {
                if (response.status >= 200 && response.status < 300) {
                  alert('Form Submitted successfully');
                  resetForm();
                  inputref.current.value = '';
                } else {
                  alert('There was an error, please try again');
                }

                setSubmitting(false);
              })
              .catch(() => {
                alert('There was an error, please try again');
                setSubmitting(false);
              });
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
                    <Field name={element} component={CustomComponent} />
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
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Page>
  );
};

export default FileUpload;
