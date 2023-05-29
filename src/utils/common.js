import moment from 'moment';

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

export const convertProvinceIdToProvinceName = (provinceId, provinces) => {
  let provinceName = '';
  for (let i = 0; i < provinces.length; i++) {
    if (provinces[i].province_id === provinceId) {
      provinceName = formatProvinceName(provinces[i].province_name);
      break;
    }
  }
  return provinceName;
};
export const convertDistrictIdToDistrictName = (districtId, districts) => {
  let districtName = '';
  for (let i = 0; i < districts.length; i++) {
    if (districts[i].district_id === districtId) {
      districtName = formatDistrictName(districts[i].district_name);
      break;
    }
  }
  return districtName;
};
export const formatProvinceName = (value) => {
  if (value.includes('Thành phố')) {
    return value.slice(10);
  }

  return value.slice(5);
};
export const formatDistrictName = (value) => {
  if (value.includes('Thành phố')) {
    return value.slice(10);
  }

  if (value.includes('Huyện')) {
    return value.slice(6);
  }

  if (value.includes('Thị xã')) {
    return value.slice(7);
  }

  if (value.includes('Quận')) {
    return value.slice(5);
  }

  return value;
};

export const isTimeBeforeNow = (datetime) => {
  console.log(datetime, new Date());
  console.log(moment(datetime).isBefore(new Date()));
  return moment(datetime).isBefore(new Date());
};

export const avgStar = (feedbacks) => {
  if (feedbacks.length === 0) return 0;
  let sumStar = 0;
  const feedbackLength = feedbacks.length;
  for (let i = 0; i < feedbackLength; i++) {
    sumStar = sumStar + feedbacks[i].star;
  }
  return Math.round(sumStar / feedbackLength);
};

export const haversine_distance = (providerCoords, center) => {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = providerCoords?.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = center?.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (center?.lng - providerCoords?.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
      )
    );
  return (d * 1.609344).toFixed(1);
};

export const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent;
};
