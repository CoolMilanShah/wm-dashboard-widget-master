import * as Yup from 'yup';
import moment from 'moment-timezone';

export const initialState = {
  name: '',
  dob: null,
  family: 'Select...',
  gender: 'Select...',
  nationality: '',
  residentialstatus: 'Select...',
  anniversarydate: null,
  kyc: 'Select...',
  riskcategory: '',
  acquisitiondate: null,
  country: '',
  state: '',
  city: '',
  pincode: '',
  mobile: '',
  email: '',
  pan: '',
  address: '',
  aadhar: '',
  servicesavailed: [],
  createdatetime: null,
};
export const schemaValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  family: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  gender: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  residentialstatus: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  kyc: Yup.string()
    .required('Required')
    .notOneOf(['Select...']),
  country: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  state: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  city: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  pincode: Yup.number()
    .positive('Invalid Pincode')
    .required('Required'),
  mobile: Yup.number()
    .integer('Enter Valid Mobile number')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  pan: Yup.string()
    .min(8, 'Invalid PAN')
    .max(12, 'Invalid PAN')
    .required('Required'),
  address: Yup.string()
    .min(8, 'Too Short Address')
    .max(100, 'Too long Address')
    .required('Required'),
  aadhar: Yup.string()
    .min(8, 'Invalid Aadhar')
    .max(12, 'Invalid Aadhar')
    .required('Required'),
  servicesavailed: Yup.array().required('Required'),
});

export const disabledelement = {
  pan: true,
  name: true,
};

export const filterList = {
  'Sub-Verticals': {
    list: [],
    title: 'Select SubVertical',
  },
  Family: {
    list: [],
    title: 'Select Family',
  },
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

const columnFilter = {
  name: 'agTextColumnFilter',
  dob: 'agDateColumnFilter',
  family: 'agTextColumnFilter',
  gender: 'agTextColumnFilter',
  nationality: 'agTextColumnFilter',
  residentialstatus: 'agTextColumnFilter',
  anniversarydate: 'agDateColumnFilter',
  kyc: 'agTextColumnFilter',
  riskcategory: 'agTextColumnFilter',
  acquisitiondate: 'agDateColumnFilter',
  country: 'agTextColumnFilter',
  state: 'agTextColumnFilter',
  city: 'agTextColumnFilter',
  pincode: 'agNumberColumnFilter',
  mobile: 'agNumberColumnFilter',
  email: 'agTextColumnFilter',
  pan: 'agTextColumnFilter',
  address: 'agTextColumnFilter',
  aadhar: 'agTextColumnFilter',
  servicesavailed: 'agTextColumnFilter',
  createdatetime: 'agDateColumnFilter',
};
const columnFilterComparator = {
  dob: dateFilterComparator,
  anniversarydate: dateFilterComparator,
  acquisitiondate: dateFilterComparator,
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
  return Object.keys(initialState).map(ele => {
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
