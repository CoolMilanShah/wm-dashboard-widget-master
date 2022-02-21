/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import Page from '../../components/Page';
import { FilterComponent } from '../../components/Layout/FilterComponent';
import { TableComponent } from '../../components/Layout/TableComponent';
import { CreateFormik } from '../Forms/CreateFormik';

const RenderComponent = props => {
  return (
    <Page
      title={props.title}
      create={true}
      breadcrumbs={[{ name: props.title, active: true }]}
      onClick={props.ontoggle}>
      <CreateFormik
        method="POST"
        titleVal={props.createtitle}
        filterComponent={props.filterComponent}
        {...props}
      />

      {props.filterobject ? (
        <Card className="mb-3">
          <CardBody>
            <FilterComponent
              filterobject={props.filterobject}
              filtervalue={props.filtervalue}
              onSelectDropDown={props.onSelectDropDown}
              onResetSelection={props.onResetSelection}
            />
          </CardBody>
        </Card>
      ) : null}

      <TableComponent
        component={props.component}
        deletetitle={props.deletetitle}
        data={props.data}
        disabledelement={props.disabledelement}
        edittitle={props.edittitle}
        editComponent={props.editComponent}
        editform={props.editform}
        expenseCategory={props.expenseCategory}
        fileName={props.fileName}
        filterComponent={props.filterComponent}
        filterEdit={props.filterEdit}
        filterobject={props.filterobject}
        filtervalue={props.filtervalue}
        keyfield={props.keyfield}
        schemaValidation={props.schemaValidation}
        selectRow={props.selectRow}
        selectionlist={props.selectionlist}
        serviceName={props.serviceName}
        title={props.title}
        updateType={props.updateType}
        vendorlist={props.vendorlist}
        onClickSubmit={props.onClickSubmit}
        makeColumns={props.makeColumns}
        onResetSelection={props.onResetSelection}
        onSelectDropDown={props.onSelectDropDown}
      />
    </Page>
  );
};

export default RenderComponent;
