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

export const CreateModalComponent = props => {
  const [inputVal, setInputVal] = useState();
  const [selectValue, setSelectValue] = useState(
    props.filterComponent
      ? props.filterList.reduce((acc, filter) => {
          acc[filter.filterTypeLabel] =
            props.selectFilterValue[filter.filterTypeLabel];
          return acc;
        }, {})
      : null
  );
  const onInputChange = e => {
    setInputVal(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.onCreateSubmit(inputVal, selectValue);
    setInputVal("");
    alert(props.alertTitle, inputVal);
  };
  const onClose = e => {
    e.preventDefault();
    props.ontoggleCreate();
  };

  const onSelectDropDown = value => {
    setSelectValue({ ...selectValue, value });
  };

  return (
    <Modal isOpen={props.open} size="lg">
      <ModalHeader toggle={props.ontoggleCreate}>{props.title}</ModalHeader>
      <ModalBody>
        {props.filterComponent
          ? props.filterList.map(filter => {
              return (
                <FilterComponent
                  list={filter.list}
                  title={filter.title}
                  filterTypeLabel={filter.filterTypeLabel}
                  selectDropDownValue={onSelectDropDown}
                />
              );
            })
          : null}
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <form onSubmit={onSubmit}>
                  <label htmlFor="NewValue">{props.labelValue}:</label>
                  <Divider />
                  <input
                    type="text"
                    name="NewValue"
                    placeholder="Enter Type"
                    value={inputVal}
                    onChange={onInputChange}
                  />
                  <div style={{ padding: "10px", textAlign: "center" }}>
                    <Button color="primary" value="Submit">
                      Add
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
