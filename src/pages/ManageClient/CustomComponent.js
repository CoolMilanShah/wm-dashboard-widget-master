import React from 'react';
import DatePicker from 'react-datepicker';
import { Divider } from '../../components/Layout/StyledComponent';
import { FORMCONSTANT } from '../../utils/constants';
import {
  SelectComponent,
  CreatableComponent,
} from '../../components/Layout/SelectDropDown';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  switch (field.name) {
    case 'dob':
    case 'anniversarydate':
    case 'acquisitiondate':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            disabled={
              props.editflag
                ? props.disabledelement[field.name]
                : props.disabled
            }
            dateFormat="yyyy-MM-dd"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Click to select a date"
            onChange={(value, e) => {
              e.preventDefault();
              form.setFieldValue(
                field.name,
                moment(value).format('YYYY-MM-DD'),
              );
              form.setFieldValue('createdatetime', moment().toISOString());
            }}
            onBlur={value => form.setTouched({ [field.name]: true })}
          />
          <Divider />
        </label>
      );
    case 'gender':
    case 'residentialstatus':
    case 'kyc':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
            isMulti={false}
            list={FORMCONSTANT[field.name]}
            value={{ label: field.value, value: field.value }}
            onSelect={value => {
              form.setFieldValue(field.name, value.value);
            }}
            isDisabled={
              props.editflag
                ? props.disabledelement[field.name]
                : props.disabled
            }
          />
          <Divider />
        </label>
      );
    case 'servicesavailed': {
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
            isMulti={true}
            list={props.filterobject['Sub-Verticals'].list}
            value={field.value}
            onSelect={value => {
              form.setFieldValue(field.name, value);
            }}
            isDisabled={
              props.editflag
                ? props.disabledelement[field.name]
                : props.disabled
            }
          />
          <Divider />
        </label>
      );
    }
    case 'family':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <CreatableComponent
            list={props.filterobject['Family'].list}
            value={{ label: field.value, value: field.value }}
            onSelect={value => {
              value
                ? form.setFieldValue(field.name, value.value)
                : form.setFieldValue(field.name, '');
            }}
            isDisabled={
              props.editflag
                ? props.disabledelement[field.name]
                : props.disabled
            }
          />
          <Divider />
        </label>
      );
    case 'id':
      return (
        <>
          <input
            type="text"
            {...field}
            disabled={
              props.editflag
                ? props.disabledelement[field.name]
                : props.disabled
            }
            hidden
          />
          <Divider />
        </>
      );
    case 'createdatetime':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <input
            type="text"
            value={moment().toISOString()}
            onChange={(value, e) => {
              e.preventDefault();

              form.setFieldValue('createdatetime', moment().toISOString());
            }}
            disabled
          />
          <Divider />
        </label>
      );
    default:
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />{' '}
          <input
            type="text"
            {...field}
            disabled={
              props.editflag
                ? props.disabledelement[field.name]
                : props.disabled
            }
          />
          <Divider />
        </label>
      );
  }
};
