import * as Yup from 'yup';
import moment from 'moment';
export const initialState1 = {
  expensedate: null,
  expensecategory: 'Select...',
  amount: '',
  remarks: '',
  createdatetime: null,
  branch: '',
};
export const initialState = {
  expensedate: null,
  expensecategory: 'Select...',
  //branch: 'Select...',
  amount: '',
  remarks: '',
  createdatetime: null,
};

export const schemaValidation = Yup.object().shape({
  expensecategory: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  expensedate: Yup.date().required('Required'),
  amount: Yup.number()
    .integer('Enter Valid amount')
    .required('Required'),
});
export const disabledelement = { expensecategory: true, expensedate: true, branch: true };

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
  expensecategory: { filter: 'agTextColumnFilter' },
  expensedate: {
    filter: 'agDateColumnFilter',
    filterComparator: dateFilterComparator,
    sortComparator: dateSortComparator,
  },
  amount: {
    filter: 'agNumberColumnFilter',
  },
  remarks: { filter: 'agTextColumnFilter' },
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
