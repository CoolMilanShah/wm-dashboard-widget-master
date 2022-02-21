import * as Yup from 'yup';
import moment from 'moment';
export const initialState1 = {
  vertical: '',
  'sub-vertical': '',
  vendor: '',
  branch: '',
  transactiondate: null,
  commission: 0,
  tds: 0,
  netcommission: 0,
  remarks: '',
  createdatetime: null,

};

export const initialState = {
  transactiondate: '',
  commission: '',
  tds: '',
  netcommission: '',
  remarks: '',
  createdatetime: null,
};
export const disabledelement = {
  transactiondate: true,
  'sub-vertical': true,
  vertical: true,
  vendor: true,
  Branch: true,
};

export const schemaValidation = Yup.object().shape({
  transactiondate: Yup.date().required('Required'),
  commission: Yup.number().required('Required'),
  tds: Yup.number().required('Required'),
});

export const filterList = {
  Verticals: {
    list: [],
    title: 'Select Vertical',
    childType: 'Sub-Verticals',
  },
  'Sub-Verticals': {
    list: [],
    title: 'Select SubVertical',
    childType: 'Vendors',
  },
  Vendors: {
    list: [],
    title: 'Select Vendor',
    childType: 'Branch',
  },
  Branch: {
    list: [],
    title: 'Select Branch',
  }

};

const dateFilterComparator = (filterDate, cellValue) => {
  const dateAsString = cellValue;
  if (dateAsString == null) return -1;
  const cellDate = new Date('01-' + cellValue);

  if (filterDate.getTime() === cellDate.getTime()) {
    return 0;
  }
  if (cellDate < filterDate) {
    return -1;
  }
  if (cellDate > filterDate) {
    return 1;
  }
};

const dateSortComparator = (date1, date2) => {
  if (moment('01-' + date1) > moment('01-' + date2)) return 1;
  else if (moment('01-' + date1) < moment('01-' + date2)) return -1;
  else return 0;
};
const columnFilter = {
  vertical: { filter: 'agTextColumnFilter' },
  'sub-vertical': { filter: 'agTextColumnFilter' },
  vendor: { filter: 'agTextColumnFilter' },
  transactiondate: {
    filter: 'agDateColumnFilter',
    filterComparator: dateFilterComparator,
    sortComparator: dateSortComparator,
  },
  commission: {
    filter: 'agNumberColumnFilter',
  },
  tds: {
    filter: 'agNumberColumnFilter',
  },
  netcommission: {
    filter: 'agNumberColumnFilter',
  },
  remarks: { filter: 'agTextColumnFilter' },
  createdatetime: {
    filter: 'agDateColumnFilter',
  },
  branch: { filter: 'agTextColumnFilter' },
};
const valueGetter = (params, ele) => {
  if (ele === 'createdatetime') {
    return moment(params.data[ele])
      .utcOffset('+05:30')
      .format('YYYY-MM-DD::HH:MM:SS');
  }
  return columnFilter[ele]['filter'] === 'agNumberColumnFilter'
    ? Number(params.data[ele])
    : params.data[ele];
};

export const makeColumns = () => {
  return Object.keys(initialState1).map(ele => {
    return {
      field: ele,
      headerName: ele.toUpperCase(),
      filter: columnFilter[ele]['filter'],
      sortable: true,
      resizable: true,
      filterParams: {
        comparator: columnFilter[ele]['filterComparator'],
        inRangeInclusive: true,
      },
      comparator: columnFilter[ele]['sortComparator'],
      valueGetter: params => valueGetter(params, ele),
    };
  });
};
