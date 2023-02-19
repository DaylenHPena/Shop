export function fetchRegionsCitiesData() {
  return new Promise((resolve, reject) => {
    try {
      var data = require("./US_States_and_Cities.json");
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchRegions(data) {
  return data ? Object.keys(data).sort() : [];
}

export function fetchCities(data, region) {
  return data ? data[region].sort() : [];
}
