import React, { useState } from 'react';
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
import { Divider } from '../Layout/StyledComponent';

export const CustomDeleteComponent = props => {
  let values = {};
  const [submitFlag, setSubmitFlag] = useState(false);
  props.selectedRows.map(ele => {
    Object.keys(ele).map(rowele => {
      if (values[rowele]) values[rowele].push(ele[rowele]);
      else {
        values[rowele] = [];
        values[rowele].push(ele[rowele]);
      }
    });
  });
  const handleSubmit = () => {
    //fetch(`http://52.64.255.41/api/` + props.serviceName, {
    fetch(`http://localhost:9080/api/` + props.serviceName, {
      method: 'DELETE',
      body: JSON.stringify({
        ...values,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        setSubmitFlag(true);
        response.json().then(res => {
          if (res.rowCount !== 0) {
            props.onClickSubmit();
            props.ontoggle();
            alert('Delete Row operation successful');
          } else {
            alert('No Rows Affected. Please check the Filter');
            setSubmitFlag(false);
          }
        });
      } else {
        alert('There was an error, please try again');
        setSubmitFlag(false);
      }
    });
  };
  return (
    <Modal isOpen={props.open} size="lg">
      <ModalHeader toggle={props.ontoggle}>{props.titleVal}</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <div style={{ paddingBottom: '10px' }}>
                  Are you sure to delete {props.selectedRows.length} rows?
                </div>
                <div>
                  <Button
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={submitFlag}>
                    Delete
                  </Button>
                  <Divider />
                  <Button color="secondary" onClick={props.ontoggle}>
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};
