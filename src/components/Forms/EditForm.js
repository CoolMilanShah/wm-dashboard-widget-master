import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

import { FilterComponent } from "../Layout/FilterComponent";
import { Divider } from "../Layout/StyledComponent";

export const EditFormComponent = props => {
  const [inputVal, setInputVal] = useState("");
  const [currentVal, setCurrentVal] = useState(
    props.initialState[props.labelValue]
  );

  const onInputChange = e => {
    setInputVal(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:8080/api/" + props.serviceName, {
      method: props.method,
      body: JSON.stringify(
        {
          [props.labelValue]: {
            currentValue: currentVal,
            updatedValue: inputVal
          }
        },
        [props.filterValue]
      ),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          alert("Form Submitedd successfully");
          setCurrentVal(inputVal);
          setInputVal("");
          props.onClickSubmit(inputVal);
        } else {
          alert("There was an error, please try again");
        }
      })
      .catch(() => {
        alert("There was an error, please try again");
      });
  };
  const onClose = e => {
    e.preventDefault();
    props.ontoggle();
  };

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
                <form onSubmit={onSubmit}>
                  <label htmlFor="NewValue">
                    {props.labelValue.toUpperCase()}:
                  </label>
                  <Divider />
                  <input
                    type="text"
                    name="NewValue"
                    value={currentVal}
                    disabled
                  />
                  <br />
                  <label htmlFor="UpdatedType">UpdatedType:</label>
                  <Divider />
                  <input
                    type="text"
                    name="UpdatedType"
                    placeholder="Enter Type"
                    value={inputVal}
                    onChange={onInputChange}
                  />
                  <Divider />
                  <div style={{ padding: "10px", textAlign: "center" }}>
                    <Button color="primary" value="Submit">
                      Submit
                    </Button>
                    <Divider />
                    <Button color="secondary" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};
