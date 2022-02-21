import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ButtonComponent } from '../../components/Layout/ButtonComponent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useWindowDimensions from '../../utils/windowDimension';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const initialMouseState = {
  mouseX: null,
  mouseY: null,
};

const initialFlagState = {
  Edit: false,
  Delete: false,
  CSV: false,
  Email: false,
};

const overlayLoadingTemplate =
  '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';

const overlayNoRowsTemplate =
  '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">No Rows To Show</span>';

const MenuComponent = ({ mouseState, setMouseState, setFlag }) => {
  const handleClose = event => {
    setFlag(prevState => {
      return { ...prevState, [event]: true };
    });
    setMouseState(initialMouseState);
  };
  return (
    <Menu
      keepMounted
      open={mouseState.mouseY !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        mouseState.mouseY !== null && mouseState.mouseX !== null
          ? { top: mouseState.mouseY, left: mouseState.mouseX }
          : undefined
      }>
      <MenuItem onClick={() => handleClose('Delete')}>Delete</MenuItem>
      <MenuItem onClick={() => handleClose('CSV')}>ExportCSV</MenuItem>
    </Menu>
  );
};
export const TableComponent = props => {
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [mouseState, setMouseState] = useState(initialMouseState);
  const [showMenu, setShowMenu] = useState(false);
  const [menuFlag, setFlag] = useState(initialFlagState);
  const [params, setApi] = useState(null);

  const columnDefs = props.makeColumns(props.data[0]);
  const { width } = useWindowDimensions();
  const onContextMenu = params => {
    params.preventDefault();
    setShowMenu(false);
    setMouseState(initialMouseState);
  };
  const onCellContextMenu = params => {
    params.event.preventDefault();
    params.node.setSelected(true);
    setRowData(params.node.data);
    setSelectedRows(params.api.getSelectedRows());
    setFlag(initialFlagState);
    setShowMenu(true);
    setMouseState({
      mouseX: params.event.clientX - 2,
      mouseY: params.event.clientY - 4,
    });
  };

  const onGridReady = params => {
    if (width > 800) {
      params.api.sizeColumnsToFit();
    }

    setApi(params);
  };
  function isFirstColumn(params) {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }
  if (menuFlag.CSV) {
    params.api.exportDataAsCsv({ fileName: props.fileName });
    setFlag(initialFlagState);
  }

  const defaultColDef = {
    resizable: true,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  return (
    <div
      className="ag-theme-balham"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onContextMenu={onContextMenu}>
      {showMenu ? (
        <MenuComponent
          mouseState={mouseState}
          setMouseState={setMouseState}
          setFlag={setFlag}
        />
      ) : null}
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={props.data}
        rowSelection="multiple"
        overlayLoadingTemplate={overlayLoadingTemplate}
        overlayNoRowsTemplate={overlayNoRowsTemplate}
        onCellContextMenu={onCellContextMenu}
        onGridReady={onGridReady}></AgGridReact>
      {menuFlag.Delete ? (
        <ButtonComponent
          selectedRows={selectedRows}
          editFlag={menuFlag.Edit}
          columnDefs={columnDefs}
          {...props}
        />
      ) : null}
    </div>
  );
};
