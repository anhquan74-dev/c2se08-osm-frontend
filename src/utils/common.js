export const capitalizeString = (str) => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getShortLocation = (location) => {
  if (location.length === 0) {
    return '';
  }
  let res = '';
  for (let i = 0; i < location.length; i++) {
    if (location[i].is_primary === 1) {
      res = location[i];
      break;
    }
  }
  return `${res?.district_name}, ${res?.province_name}`;
};

export const formatBirthDay = (date) => {
  const t = date.slice(0, 10).split('-');

  return `${t[2]}-${t[1]}-${t[0]}`;
};

export const convertProvinceName = (value) => {
  if (value.includes('Thành phố')) {
    return value.slice(10);
  }

  return value.slice(5);
};
