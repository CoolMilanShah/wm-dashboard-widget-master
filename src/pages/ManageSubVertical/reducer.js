import * as Yup from "yup";

export const initialState = {
  "sub-vertical": ""
};
export const schemaValidation = Yup.object().shape({
  "sub-vertical": Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

export const makeColumns = () => {
  return ["vertical", "sub-vertical"].map(ele => {
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
    title: "Select Vertical"
  }
};
