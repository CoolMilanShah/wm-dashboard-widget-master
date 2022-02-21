import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const customStyles = {
  control: provided => ({
    ...provided,
    width: 150,
  }),
  container: provided => ({
    ...provided,
    display: 'inline-block',
    textAlign: 'left',
  }),
};

export const SelectComponent = props => {
  return (
    <Select
      isMulti={props.isMulti}
      styles={customStyles}
      value={props.value}
      onChange={props.onSelect}
      options={props.list.map(listval => {
        return { value: listval, label: listval };
      })}
      isDisabled={props.isDisabled}
      isClearable={props.isClearable}></Select>
  );
};

export const CreatableComponent = props => {
  return (
    <CreatableSelect
      isClearable
      styles={customStyles}
      value={props.value}
      onChange={props.onSelect}
      options={props.list.map(listval => {
        return { value: listval, label: listval };
      })}
      isDisabled={props.isDisabled}
    />
  );
};
