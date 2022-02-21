import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Divider } from '../Layout/StyledComponent';
import { FilterComponent } from '../Layout/FilterComponent';

export const CreateFormik = props => {
  let fieldMap = props.initialState;
  let submitButton = 'Submit';
  let submitFlag = true;
  if (props.deleteflag) {
    submitButton = 'Delete';
  }
  if (props.editflag) {
    submitButton = 'Save';
  }
  const filtervalue = props.filtervalue || [];
  if (props.filterComponent) {
    Object.keys(filtervalue).map(filter => {
      if (!filtervalue[filter].search('Select')) {
        submitFlag = false;
      }
    });
  }

  return (
    <Modal isOpen={props.open} size="lg">
      <ModalHeader toggle={props.ontoggle}>{props.titleVal}</ModalHeader>
      <ModalBody>
        {props.filterComponent ? (
          <Row>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <FilterComponent {...props} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                {props.initialState ? (
                  <Formik
                    initialValues={props.initialState}
                    validationSchema={props.schemaValidation}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      values = {
                        ...values,
                        createdatetime: moment().toISOString(),
                      };
                      setSubmitting(true);
                      //fetch(`http://52.64.255.41/api/` + props.serviceName, {
                      fetch(`http://localhost:9080/api/` + props.serviceName, {
                        method: props.method,
                        body: JSON.stringify({
                          ...values,
                          ...filtervalue,
                        }),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })
                        .then(response => {
                          if (response.status >= 200 && response.status < 300) {
                            response.json().then(res => {
                              if (res.rowCount !== 0) {
                                props.onClickSubmit(values);
                                switch (props.method) {
                                  case 'POST':
                                    alert('Insert Row operation successful');
                                    break;
                                  case 'PUT': {
                                    alert('Update Row operation successful');
                                    props.ontoggle();
                                    break;
                                  }
                                  default:
                                }
                                resetForm();
                              } else
                                alert(
                                  'No Rows Affected. Please check the Filter',
                                );
                            });
                          } else {
                            response
                              .json()
                              .then(res =>
                                alert(
                                  `There was an error, please try again, ${res.reason}`,
                                ),
                              );
                          }

                          setSubmitting(false);
                        })
                        .catch(() => {
                          alert('There was an error, please try again');
                          setSubmitting(false);
                        });
                    }}>
                    {({ isSubmitting, handleReset, dirty, errors }) => (
                      <Form>
                        {Object.keys(fieldMap).map(element => {
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
                                component={props.component}
                                editflag={props.editflag}
                                deleteflag={props.deleteflag}
                                disabled={props.disabled}
                                disabledelement={props.disabledelement}
                                filterobject={props.filterobject}
                                filtervalue={filtervalue}
                                column={props.column}
                                initialstate={props.initialState}
                                keyfield={props.keyfield}
                                expensecategory={props.expenseCategory}
                                vendorlist={props.vendorlist}
                                selectionlist={props.selectionlist}
                              />
                            </div>
                          );
                        })}
                        <br />
                        {!props.hidebutton ? (
                          <div>
                            <Button
                              color="primary"
                              type="submit"
                              disabled={
                                Object.keys(errors).length > 0 ||
                                  !submitFlag ||
                                  (!props.deleteflag && !dirty)
                                  ? true
                                  : false
                              }>
                              {submitButton}
                            </Button>
                            <Divider />
                            <Button
                              color="secondary"
                              onClick={handleReset}
                              disabled={!dirty || isSubmitting}>
                              Reset
                            </Button>{' '}
                          </div>
                        ) : null}
                      </Form>
                    )}
                  </Formik>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};
