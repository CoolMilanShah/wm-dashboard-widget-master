import React from "react";
import { Button } from "reactstrap";
import { Divider } from "./StyledComponent";
import { SelectComponent } from "./SelectDropDown";

export const FilterComponent = props => {
  const { filterobject, filtervalue } = props;
  const onSelect = (filterLabel, selectedOption) => {
    if (props.onSelectDropDown) {
      props.onSelectDropDown({
        [filterLabel]: selectedOption.value
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {Object.keys(filterobject).map(filter => {
          return (
            <div
              key={filterobject[filter].title}
              style={{ display: "inline-block" }}
            >
              <label>{filter}:</label>
              <Divider />
              <SelectComponent
                list={filterobject[filter].list}
                title={filterobject[filter].title}
                value={{
                  label: filtervalue[filter],
                  value: filtervalue[filter]
                }}
                onSelect={selectedOption => onSelect(filter, selectedOption)}
                {...props}
              />
              <Divider />
            </div>
          );
        })}
      </div>
      <div>
        <Button onClick={props.onResetSelection}>Reset</Button>
      </div>
    </div>
  );
};
