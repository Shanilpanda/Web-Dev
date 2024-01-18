const length = (value, convertDirection) => {
  return {
    meter: value,
    kilometer: convertDirection ? value * 1000 : value / 1000,
    centimeter: convertDirection ? value / 100 : value * 100,
    millimeter: convertDirection ? value / 1000 : value * 1000,
    micrometer: convertDirection ? value / 1000000 : value * 1000000,
    nanometer: convertDirection ? value / 1000000000 : value * 1000000000,
    mile: convertDirection ? value * 1609.34 : value / 1609.34,
    yard: convertDirection ? value * 0.9144 : value / 0.9144,
    foot: convertDirection ? value * 0.3048 : value / 0.3048,
    inch: convertDirection ? value * 0.0254 : value / 0.0254,
  };
};


const temp = (value, convertDirection) => {
  return {
    celsius: value,
    kelvin: convertDirection ? value - 273.15 : value + 273.15,
    fahrenheit: convertDirection ? (value - 32)/1.8 : value  * 1.8 + 32,
  };
};


const area = (value, convertDirection) => {
  return {
    "square meter": value,
    "square kilometer": convertDirection ? value * 1000000 : value / 1000000,
    "square centimeter": convertDirection ? value / 10000 : value * 10000,
    "square millimeter": convertDirection ? value / 100000 : value * 1000000,
    "square micrometer": convertDirection
      ? value / 1000000000000
      : value * 1000000000000,
    hectare: convertDirection ? value * 10000 : value / 10000,
    "square mile": convertDirection ? value * 2589988.1 : value / 2589988.1,
    "square yard": convertDirection ? value / 1.19599 : value * 1.19599,
    "square foot": convertDirection ? value / 10.7639104 : value * 10.7639104,
    "square inch": convertDirection ? value / 1550 : value * 1550,
    acre: convertDirection ? value * 4047 : value / 4047,
  };
};


const volume = (value, convertDirection) => {
  return {
    "cubic meter": value,
    "cubic kilometer": convertDirection
      ? value * 1000000000
      : value / 1000000000,
    "cubic centimeter": convertDirection ? value / 1000000 : value * 1000000,
    "cubic millimeter": convertDirection
      ? value / 1000000000
      : value * 1000000000,
    liter: convertDirection ? value / 1000 : value * 1000,
    milliliter: convertDirection ? value / 1000000 : value * 1000000,
    "US gallon": convertDirection ? value / 264.17 : value * 264.17,
    "US quart": convertDirection ? value / 1056.688 : value * 1056.688,
    "US pint": convertDirection ? value / 2113.3774149 : value * 2113.3774149,
    "US cup": convertDirection ? value / 4226.7548297 : value * 4226.7548297,
    "US fluid ounce": convertDirection ? value /  33814.022702 : value *  33814.022702,
  };
};


const weight = (value, convertDirection) => {
  return {
    kilogram: value,
    gram: convertDirection ? value / 1000 : value * 1000,
    milligram: convertDirection ? value / 1000000 : value * 1000000,
    ton: convertDirection ? value * 1000 : value / 1000,
    pound: convertDirection ? value / 2.2046244202 : value * 2.2046244202,
    ounce: convertDirection ? value / 35.273990723 : value * 35.273990723,
    carrat: convertDirection ? value / 5000 : value * 5000,
  };
};


const time = (value, convertDirection) => {
  return {
    second: value,
    millisecond: convertDirection ? value / 1000 : value * 1000,
    minute: convertDirection ? value * 60 : value / 60,
    hour: convertDirection ? value * 3600 : value / 3600,
    day: convertDirection ? value * 86400 : value / 86400,
    week: convertDirection ? value * 604800 : value / 604800,
    month: convertDirection ? value * 2628288 : value / 2628288,
    year: convertDirection ? value * 31556952 : value / 31556952,
  };
};

export { length, volume, time, area, temp, weight };