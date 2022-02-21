import React from "react";
import { Divider } from "./StyledComponent";

export const CustomEditComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  switch (field.name) {
    default:
      return (
        <label>
          {field.name.toUpperCase()}: <Divider />{" "}
          <input
            type="text"
            disabled={field.name.startsWith("new") ? false : true}
            {...field}
          />
          <Divider />
        </label>
      );
  }
};
