import React from "react";
import { Divider } from "./StyledComponent";

export const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { disabled } = props;
  switch (field.name) {
    default:
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />{" "}
          <input type="text" {...field} disabled={disabled} />
          <Divider />
        </label>
      );
  }
};
