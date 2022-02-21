import React, { useState } from "react";
import { CreateFormik } from "../Forms/CreateFormik";
import { CustomDeleteComponent } from "./CustomDeleteComponent";
export const ButtonComponent = props => {
  const [showDialog, setShowDialog] = useState({
    Edit: props.editFlag,
    Delete: !props.editFlag
  });

  const initialstate = props.updateType
    ? { ...props.rowData, ["new " + props.keyfield]: "" }
    : { ...props.rowData };

  if (initialstate.servicesavailed) {
    let value = [];
    const arrServices = initialstate.servicesavailed.split(",");
    value = arrServices.map(ele => {
      if (ele !== "") return { label: ele.trim(), value: ele.trim() };
    });
    initialstate.servicesavailed = value;
  }
  const onButtonClick = e => {
    setShowDialog({
      ...showDialog,
      [e.target.value]: !showDialog[e.target.value]
    });
  };

  return (
    <div>
      {props.editFlag ? (
        <CreateFormik
          component={props.editComponent}
          disabledelement={props.disabledelement}
          editflag={true}
          expenseCategory={props.expenseCategory}
          initialState={initialstate}
          keyfield={props.keyfield}
          method="PUT"
          open={showDialog["Edit"]}
          serviceName={props.serviceName}
          titleVal={props.edittitle}
          ontoggle={() => {
            onButtonClick({ target: { value: "Edit" } });
          }}
          filterComponent={false}
          filterobject={props.filterobject}
          filtervalue={props.filtervalue}
          selectionlist={props.selectionlist}
          vendorlist={props.vendorlist}
          onClickSubmit={props.onClickSubmit}
          onResetSelection={props.onResetSelection}
          onSelectDropDown={props.onSelectDropDown}
        />
      ) : (
        <CustomDeleteComponent
          method="DELETE"
          open={showDialog["Delete"]}
          serviceName={props.serviceName}
          selectedRows={props.selectedRows}
          titleVal={props.deletetitle}
          ontoggle={() => {
            onButtonClick({ target: { value: "Delete" } });
          }}
          onClickSubmit={props.onClickSubmit}
          onResetSelection={props.onResetSelection}
          onSelectDropDown={props.onSelectDropDown}
        />
      )}
    </div>
  );
};
