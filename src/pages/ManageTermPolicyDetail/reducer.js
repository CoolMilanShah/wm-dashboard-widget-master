import * as Yup from 'yup';
import moment from 'moment';

export const initialState = {
  producttype: 'Select...',
  firstholder: 'Select...',
  secondholder: '',
  thirdholder: '',
  applicationno: '',
  certificateno: '',
  'period (months)': '',
  startdate: null,
  maturitydate: null,
  depositamount: '',
  interestrate: '',
  interestfrequency: 'Select...',
  maturityamount: '',
  nominee: '',
  remarks: '',
  createdatetime: null,
};

export const initialStateTable = {
  vendor: '',
  company: '',
  producttype: '',
  firstholder: '',
  secondholder: '',
  thirdholder: '',
  applicationno: '',
  certificateno: '',
  'period (months)': '',
  startdate: null,
  maturitydate: null,
  depositamount: '',
  interestrate: '',
  interestfrequency: '',
  maturityamount: '',
  nominee: '',
  remarks: '',
  createdatetime: null,
};
export const disabledelement = {
  vendor: true,
  company: true,
  firstholder: true,
};

export const schemaValidation = Yup.object().shape({
  producttype: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  startdate: Yup.date().required('Required'),
  firstholder: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  certificateno: Yup.string().required('Required'),
  interestfrequency: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  interestrate: Yup.number().required('Required'),
  maturityamount: Yup.number().required('Required'),
  depositamount: Yup.number().required('Required'),
  maturitydate: Yup.date().required('Required'),
  'period (months)': Yup.number().required('Required'),
});

export const filterList = {
  Vendors: {
    list: [],
    title: 'Select Vendor',
    childType: 'Company',
  },
  Company: {
    list: [],
    title: 'Select Company',
  },
};
const columnFilter = {
  vendor: 'agTextColumnFilter',
  company: 'agTextColumnFilter',
  producttype: 'agTextColumnFilter',
  firstholder: 'agTextColumnFilter',
  secondholder: 'agTextColumnFilter',
  thirdholder: 'agTextColumnFilter',
  applicationno: 'agTextColumnFilter',
  certificateno: 'agTextColumnFilter',
  'period (months)': 'agNumberColumnFilter',
  startdate: 'agDateColumnFilter',
  maturitydate: 'agDateColumnFilter',
  depositamount: 'agNumberColumnFilter',
  interestrate: 'agNumberColumnFilter',
  interestfrequency: 'agTextColumnFilter',
  maturityamount: 'agNumberColumnFilter',
  nominee: 'agTextColumnFilter',
  remarks: 'agTextColumnFilter',
  createdatetime: 'agDateColumnFilter',
};
const dateFilterComparator = (filterDate, cellValue) => {
  const dateAsString = cellValue;
  if (dateAsString == null) return -1;
  const dateParts = dateAsString.split('-');

  const date = Number(dateParts[2]);
  const month = Number(dateParts[1]) - 1;
  const year = Number(dateParts[0]);

  const cellDate = new Date(year, month, date);

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

const columnFilterComparator = {
  startdate: dateFilterComparator,
  maturitydate: dateFilterComparator,
};
const valueGetter = (params, ele) => {
  if (ele === 'createdatetime') {
    return moment(params.data[ele])
      .utcOffset('+05:30')
      .format('YYYY-MM-DD::HH:MM:SS');
  }
  return columnFilter[ele] === 'agNumberColumnFilter'
    ? Number(params.data[ele])
    : params.data[ele];
};

export const makeColumns = () => {
  return Object.keys(initialStateTable).map(ele => {
    return {
      field: ele,
      headerName: ele.toUpperCase(),
      filter: columnFilter[ele],
      filterParams: {
        comparator: columnFilterComparator[ele],
        inRangeInclusive: true,
      },
      sortable: true,
      resizable: true,
      valueGetter: params => valueGetter(params, ele),
    };
  });
};
