import * as Yup from "yup";

export const initialState = {
  vendor: ""
};
export const schemaValidation = Yup.object().shape({
  vendor: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

export const makeColumns = () => {
  return ["vertical", "sub-vertical", "vendor"].map(ele => {
    return {
      field: ele,
      headerName: ele.toUpperCase(),
      filter: true,
      sortable: true,
      resizable: true
    };
  });
};

export const filterList = {
  Verticals: {
    list: [],
    title: "Select Vertical",
    childType: "Sub-Verticals"
  },
  "Sub-Verticals": {
    list: [],
    title: "Select SubVertical"
  }
};
