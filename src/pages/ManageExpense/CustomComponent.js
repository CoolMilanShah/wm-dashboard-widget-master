import React from 'react';
import DatePicker from 'react-datepicker';
import { Divider } from '../../components/Layout/StyledComponent';
import { CreatableComponent } from '../../components/Layout/SelectDropDown';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  switch (field.name) {
    case 'expensedate':
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
            readOnly={
              props.editflag
                ? props.disabledelement[field.name]
                : props.disabled
            }
            dateFormat="MM-yyyy"
            showYearDropdown
            dropdownMode="select"
            showMonthYearPicker
            placeholderText="Click to select a date"
            onChange={(value, e) => {
              e.preventDefault();
              form.setFieldValue(
                field.name,
                moment(value).format('YYYY-MM-DD'),
              );
              form.setFieldValue('createdatetime', moment().toISOString());
            }}
          />
          <Divider />
        </label>
      );
    case 'expensecategory':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <CreatableComponent
            list={props.expensecategory}
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
            {...props}
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
