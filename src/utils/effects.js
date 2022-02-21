export const fetchApiCall = async (serviceName, filter) => {
  const filterValue = encodeURIComponent(JSON.stringify(filter));
  const response = await fetch(
    //'http://52.64.255.41/api/' + serviceName + '?filterValue=' + filterValue,
    'http://localhost:9080/api/' + serviceName + '?filterValue=' + filterValue,
  );
  const data = await response.json();
  return data;
};

export const fetchApiList = async (serviceName, filter) => {
  const filterValue = encodeURIComponent(JSON.stringify(filter));
  const response = await fetch(
    //'http://52.64.255.41/api/' + serviceName + '?filterValue=' + filterValue,
    'http://localhost:9080/api/' + serviceName + '?filterValue=' + filterValue,
  );
  const data = await response.json();

  const list = data.map(element => {
    return Object.values(element)[0];
  });
  return list;
};

export const fetchFilterObject = async (
  filterLabel,
  filtervalue,
  setFilterObject,
) => {
  let label = '';
  let data = [];
  let list = [];
  let key = '';
  console.log(filterLabel);
  switch (filterLabel) {

    case 'Verticals':
      label = 'Sub-Verticals';
      data = await fetchApiCall('managesubverticaldata', filtervalue);
      key = 'sub-vertical';
      break;
    case 'Sub-Verticals':
      label = 'Vendors';
      data = await fetchApiCall('managevendordata', filtervalue);
      key = 'vendor';
      break;
    case 'Vendors':
      label = 'Company';
      data = await fetchApiCall('managecompanydata', filtervalue);
      key = 'company';
      break;
    case 'Branch':
      label = 'Branch';
      data = await fetchApiCall('managebranchdata');
      key = 'branch';
      break;
    default:
      label = 'Verticals';
      data = await fetchApiCall('manageverticaldata', filtervalue);
      key = 'vertical';

  }

  list = data.map(element => {
    return element[key];
  });

  setFilterObject(prevState => {
    const filterList = { ...prevState };
    filterList[label] = {
      ...filterList[label],
      list: list,
    };
    let child = filterList[label].childType;
    while (child) {
      filterList[child] = {
        ...filterList[child],
        list: [],
      };
      child = filterList[child].child || null;
    }

    return filterList;
  });
};
