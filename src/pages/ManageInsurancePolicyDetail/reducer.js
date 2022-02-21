import * as Yup from 'yup';
import moment from 'moment';

export const initialState = {
  plantype: 'Select...',
  policyname: '',
  investorname: 'Select...',
  dob: '',
  nominee: '',
  applicationno: '',
  policyno: '',
  startdate: null,
  suminsured: '',
  premiumamount: '',
  paymentfrequency: 'Select...',
  annualpremium: '',
  duedate: null,
  term: '',
  remarks: '',
  createdatetime: null,
};

export const initialStateTable = {
  'sub-vertical': '',
  vendor: '',
  company: '',
  plantype: '',
  policyname: '',
  investorname: '',
  dob: '',
  nominee: '',
  applicationno: '',
  policyno: '',
  startdate: '',
  suminsured: '',
  premiumamount: '',
  paymentfrequency: '',
  annualpremium: '',
  duedate: '',
  term: '',
  remarks: '',
  createdatetime: null,
};

export const schemaValidation = Yup.object().shape({
  plantype: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  startdate: Yup.date().required('Required'),
  policyname: Yup.string().required('Required'),
  investorname: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  policyno: Yup.string().required('Required'),
  paymentfrequency: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  suminsured: Yup.number().required('Required'),
  premiumamount: Yup.number().required('Required'),
  annualpremium: Yup.number().required('Required'),
  duedate: Yup.date().required('Required'),
  term: Yup.string().required('Required'),
});

export const disabledelement = {
  'sub-vertical': true,
  vendor: true,
  company: true,
  investorname: true,
};

export const filterList = {
  'Sub-Verticals': {
    list: [],
    title: 'Select SubVertical',
    childType: 'Vendors',
  },
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
  'sub-vertical': 'agTextColumnFilter',
  vendor: 'agTextColumnFilter',
  company: 'agTextColumnFilter',
  plantype: 'agTextColumnFilter',
  policyname: 'agTextColumnFilter',
  investorname: 'agTextColumnFilter',
  dob: 'agDateColumnFilter',
  applicationno: 'agTextColumnFilter',
  policyno: 'agTextColumnFilter',
  startdate: 'agDateColumnFilter',
  suminsured: 'agNumberColumnFilter',
  premiumamount: 'agNumberColumnFilter',
  paymentfrequency: 'agTextColumnFilter',
  annualpremium: 'agNumberColumnFilter',
  duedate: 'agDateColumnFilter',
  remarks: 'agTextColumnFilter',
  nominee: 'agTextColumnFilter',
  createdatetime: 'agDateColumnFilter',
  term: 'agTextColumnFilter',
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
  dob: dateFilterComparator,
  startdate: dateFilterComparator,
  duedate: dateFilterComparator,
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
