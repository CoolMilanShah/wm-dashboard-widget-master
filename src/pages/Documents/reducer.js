export const initialState = {
  clientname: '',
  pan: '',
  category: '',
  filename: '',
  createdatetime: null,
};

export const makeColumns = () => {
  return Object.keys(initialState).map(ele => {
    return {
      field: ele,
      headerName: ele.toUpperCase(),
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
      cellRenderer:
        ele === 'filename'
          ? params => {
              return `<a href=${params.data.s3url}>${params.data.filename}</a>`;
            }
          : null,
    };
  });
};
