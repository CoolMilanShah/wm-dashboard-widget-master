import * as Yup from 'yup';
import moment from 'moment';
export const initialState1 = {
  branch: '',
  date: null,
  vendor: 'Select...',
  aum: '',
  sip: '',
  createdatetime: null,
};

export const initialState = {
  date: null,
  vendor: 'Select...',
  aum: '',
  sip: '',
  createdatetime: null,
};
export const disabledelement = { vendor: true, date: true, branch: true };

export const schemaValidation = Yup.object().shape({
  date: Yup.date().required('Required'),
  vendor: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  aum: Yup.number().required('Required'),
  sip: Yup.number().required('Required'),
});

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
  branch: { filter: 'agTextColumnFilter' },
  vendor: { filter: 'agTextColumnFilter' },
  date: {
    filter: 'agDateColumnFilter',
    filterComparator: dateFilterComparator,
    sortComparator: dateSortComparator,
  },
  aum: {
    filter: 'agNumberColumnFilter',
  },
  sip: {
    filter: 'agNumberColumnFilter',
  },
  createdatetime: 'agDateColumnFilter',
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

export const filterList = {
  /*
  Vendors: {
    list: [],
  },
  */
  Branch: {
    list: [],
    title: 'Select Branch',
  },
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
