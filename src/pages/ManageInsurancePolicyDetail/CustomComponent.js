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
    case 'startdate':
    case 'duedate':
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
    case 'dob':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            disabled
            placeholderText="Select invetsorname to autofill date"
          />
          <Divider />
        </label>
      );
    case 'plantype':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <CreatableComponent
            list={props.selectionlist[field.name]}
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
    case 'paymentfrequency':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
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
    case 'investorname':
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />
          <SelectComponent
            list={props.selectionlist[field.name]}
            value={{ label: field.value, value: field.value }}
            onSelect={value => {
              form.setFieldValue(field.name, value.value);
              form.setFieldValue(
                'dob',
                props.selectionlist['dob'][value.value],
              );
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
    case 'renew': {
      if (props.editflag && form.dirty) {
        return (
          <label>
            {field.name.toUpperCase()}: <Divider />{' '}
            <input
              type="checkbox"
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
      } else return <span />;
    }
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
