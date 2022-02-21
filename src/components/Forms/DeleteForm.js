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

export const DeleteModalComponent = props => {
  const [selectValue, setSelectValue] = useState(
    props.filterComponent
      ? props.filterList.reduce((acc, filter) => {
          acc[filter.filterTypeLabel] = "";
          return acc;
        }, {})
      : null
  );

  const onSubmit = e => {
    e.preventDefault();
    props.onDeleteSubmit(selectValue);
    alert(props.alertTitle);
  };
  const onClose = e => {
    e.preventDefault();
    props.ontoggleDelete();
  };

  const onSelectDropDown = value => {
    setSelectValue({ ...selectValue, value });
  };

  return (
    <Modal isOpen={props.open} size="lg">
      <ModalHeader toggle={props.ontoggleDelete}>{props.title}</ModalHeader>
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
                    value={props.currentValue}
                    disabled
                  />
                  <div style={{ padding: "10px", textAlign: "center" }}>
                    <Button color="primary" value="Submit">
                      Delete
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
