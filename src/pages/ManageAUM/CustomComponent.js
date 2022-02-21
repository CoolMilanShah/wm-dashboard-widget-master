import React from 'react';
import DatePicker from 'react-datepicker';
import { Divider } from '../../components/Layout/StyledComponent';
import { SelectComponent } from '../../components/Layout/SelectDropDown';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  switch (field.name) {
    case 'date':
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
            placeholderText="Click to select a date"
            showMonthYearPicker
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

    case 'vendor':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
            isMulti={false}
            list={props.vendorlist}
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
